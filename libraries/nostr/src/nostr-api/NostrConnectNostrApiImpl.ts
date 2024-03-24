import DoNotRepeatStaff from '../event/DoNotRepeatStaff'
import LoginStaff from '../login/LoginStaff'
import LoginUtilsStaff from '../login/LoginUtilsStaff'
import AddFilterStaff from '../manager/AddFilterStaff'
import AddPublishStaff from '../manager/AddPublishStaff'
import RelayConfiguratorSynchronizerAddUrlsStaff from '../synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff'
import { EventLine, createStaff } from '@jumpalong/core'
import { Prikey, Pubkey, generatePrivateKey } from '@jumpalong/nostr-shared'
import {
  LocalStorageMap,
  cached,
  createGetValue,
  createId,
} from '@jumpalong/shared'
import { Event, EventTemplate } from 'nostr-tools'
import { CommonNostrApiImpl } from './CommonNostrApiImpl'
import { PriKeyNostrApiImpl } from './PriKeyNostrApiImpl'

const kind = 24133
export class NostrConnectNostrApiImpl extends CommonNostrApiImpl {
  clientPubkey
  clientNostrApi
  remoteUserPubkey
  getLine
  urls: Set<string>
  static fromBunker(line: EventLine<{}>, bunker: string) {
    const bunkerUrl = new URL(bunker)
    return new NostrConnectNostrApiImpl(
      line,
      Pubkey.fromHex(bunkerUrl.pathname.slice(2)),
      new Set(bunkerUrl.searchParams.getAll('relay'))
    )
  }
  constructor(
    line: EventLine<{}>,
    remoteUserPubkey: Pubkey,
    urls: Set<string>
  ) {
    super()
    this.urls = urls

    logger.debug('NostrConnectNostrApiImpl', this)
    this.remoteUserPubkey = remoteUserPubkey

    //得到客户端key
    let clientPrikey = getLocalPrikey('client')
    this.clientPubkey = clientPrikey.getPubkey()
    this.clientNostrApi = new PriKeyNostrApiImpl(clientPrikey)

    this.getLine = createGetValue(() =>
      line.createChild().add(
        AddFilterStaff,
        RelayConfiguratorSynchronizerAddUrlsStaff,
        LoginStaff,
        AddPublishStaff,
        createStaff(mod => {
          return mod.defineEmit<`request:${string}`, any>()
        })
      )
    )

    //提供api
    const self = this
    this.nostrApiProvide.resolve({
      async encrypt(...rest) {
        return await self.request({
          method: 'nip04_encrypt',
          params: [rest[0].toHex(), rest[1]],
        })
      },
      async decrypt(...rest) {
        return await self.request({
          method: 'nip04_decrypt',
          params: [rest[0].toHex(), rest[1]],
        })
      },
      async getPublicKey() {
        return Pubkey.fromHex(
          await self.request({ method: 'get_public_key', params: [] })
        )
      },
      async getRelays() {
        return await self.request({ method: 'get_relays', params: [] })
      },
      async signEvent(event) {
        return await self.request({ method: 'sign_event', params: [event] })
      },
    })
    this.listen()
  }
  async connect() {
    return await this.request({
      method: 'connect',
      params: [this.remoteUserPubkey.toHex()],
    })
  }
  async disconnect() {
    return await this.request({ method: 'disconnect', params: [] })
  }
  listen() {
    //监听回应
    let l = this.getLine()
      .createChild()
      .addFilter({
        kinds: [kind],
        ['#p']: [this.clientPubkey.toHex()],
      })
      .onEvent((subId, e) => {
        const name = async () => {
          try {
            const resultOpt = JSON.parse(
              await this.clientNostrApi.decrypt(
                Pubkey.fromHex(e.pubkey),
                e.content
              )
            )
            const id = resultOpt.id as string

            this.getLine().emit(`request:${id}`, resultOpt)
          } catch (error) {
            logger.error(error)
          }
        }
        name()
      })
    l.addUrls(this.urls)
    return l
  }
  async request<METHOD extends Method>(
    opts: CreateOptionType<METHOD>
  ): Promise<GetResultType<METHOD>> {
    return new Promise(async (resolve, reject) => {
      const id = createId()

      const content = JSON.stringify({
        id,
        method: opts.method,
        params: opts.params,
      })
      const encryptContent = await this.clientNostrApi.encrypt(
        //要请求的公钥
        this.remoteUserPubkey,
        //请求体
        content
      )

      const event = await this.clientNostrApi.signEvent({
        kind: kind,
        //当前客户端公钥
        created_at: this.getLine().nowCreateAt(),
        pubkey: this.clientPubkey.toHex(),
        content: encryptContent,
        tags: [['p', this.remoteUserPubkey.toHex()]],
      })

      //监听收到回应
      this.getLine().once(`request:${id}`, opt => {
        if (!opt) return
        if (opt.error) {
          reject(opt.error)
        } else {
          resolve(opt.result)
        }
      })
      //发送请求
      this.getLine().publishes(this.urls, event)
    })
  }
}

export function getLocalPrikey(key: string) {
  let prikey = localStorage.getItem(`__prikey__${key}`)
  if (!prikey) {
    prikey = generatePrivateKey()
    localStorage.setItem(`__prikey__${key}`, prikey)
  }
  return Prikey.fromHex(prikey)
}
export function getTempPrikey() {
  const prikey = localStorage.getItem('__temp_prikey') ?? generatePrivateKey()
  localStorage.setItem('__temp_prikey', prikey)
  return Prikey.fromHex(prikey)
}
export class ProvideRemoteSigner {
  getLine
  remoteSignerNostrApi
  remoteSignerPubkey
  perm = new LocalStorageMap<
    Partial<
      Record<keyof RequestMap, [allow: boolean, periodOfValidity?: number]>
    >
  >('provide-remote-signer')
  secrets = new Set<string>()
  connectList = []
  constructor(line: EventLine<{}>) {
    this.getLine = createGetValue(() =>
      line
        .createChild()
        .add(
          AddFilterStaff,
          RelayConfiguratorSynchronizerAddUrlsStaff,
          LoginStaff,
          LoginUtilsStaff
        )
    )
    let prikey = getLocalPrikey('provide_remote_signer')
    this.remoteSignerPubkey = prikey.getPubkey()
    this.remoteSignerNostrApi = new PriKeyNostrApiImpl(prikey)
  }
  public provideConnect = cached(() => {
    let l = this.getLine()
      .createChild()
      .add(DoNotRepeatStaff)
      .add(
        createStaff(mod =>
          mod.defineEmit<'ask', [opt: AskOption]>().assignFeat({
            onAsk(listener: (opt: AskOption) => void) {
              this.on('ask', listener)
            },
            emitAsk(opt: AskOption) {
              this.emit('ask', opt)
            },
          })
        )
      )
      .onEvent((subId, e) => {
        //只监听10秒内的请求
        if (Date.now() / 1000 - e.created_at > 10) return

        this.toPush(e, l)
      })

    this.getLine()
      .getPubkeyOrNull()
      .then(pubkey => {
        if (!pubkey) {
          return
        }
        l.addFilter({
          ['#p']: [pubkey.toHex()],
          kinds: [kind],
          since: l.nowCreateAt(), //只监听从现在开始的请求
        })
      })
    l.initedAddRead()

    return l
  })
  private async toPush(
    event: Event,
    line: ReturnType<typeof this.provideConnect>
  ) {
    try {
      console.log('toPush', event.content, event.pubkey)

      //解密内容
      const content = await this.getLine().nostrApi.decrypt(
        Pubkey.fromHex(event.pubkey),
        event.content
      )
      console.log('provideConnect:content', content)

      //解析请求内容
      const requestOpt: Exclude<RequestOption, 'result'> = JSON.parse(content)
      console.log('provideConnect:requestOpt', requestOpt)

      const id: string = (requestOpt as any).id

      if (
        //权限列表没有它
        !this.perm.has(event.pubkey) &&
        //方法不等于连接请求
        !(requestOpt.method === 'connect')
      ) {
        //忽略这些请求
        return
      }

      const askApi = {
        allow: (duration?: number) =>
          this.allow(event, id, requestOpt, line, duration),
        refuse: (duration?: number) =>
          this.refuse(event, id, requestOpt, line, duration),
        event: event,
        requestOpt: requestOpt as any,
      }
      const ask = () => line.emitAsk(askApi)
      this.autoAsk(askApi, ask)
    } catch (error) {
      logger.error(error)
    }
  }
  autoAsk(askApi: AskOption, ask: () => void) {
    const allow = () => askApi.allow()
    const refuse = () => askApi.refuse()

    let p = this.hasParm(askApi.event.pubkey, askApi.requestOpt.method)

    if (p === undefined) {
      ask()
    } else if (p === true) {
      allow()
    } else if (p === false) {
      refuse()
    }
  }

  remember(
    pubkey: string,
    method: keyof RequestMap,
    state: boolean,
    duration?: number
  ) {
    let perm = this.perm.get(pubkey)
    if (!perm) {
      perm = {}
      this.perm.set(method, perm)
    }

    let p = [state] as any
    duration && p.push(Date.now() + duration)
    perm[method] = p

    this.perm.set(pubkey, perm)
  }
  private async refuse(
    event: Event,
    id: string,
    requestOpt: RequestOption,
    line: ReturnType<typeof this.provideConnect>,
    duration?: number
  ) {
    const { method } = requestOpt

    duration && this.remember(event.pubkey, method, false, duration)

    //拒绝请求的结果
    const responseResult = {
      id,
      error: 'refuse:The user has rejected your authorization request',
    }
    const stringifyResponseResult = JSON.stringify(responseResult)
    //内容
    const content = await this.remoteSignerNostrApi.encrypt(
      Pubkey.fromHex(event.pubkey),
      stringifyResponseResult
    )

    //发送
    await line.relayConfigurator.onInited()
    line.publishes(
      await line.relayConfigurator.getWriteList(),
      await this.remoteSignerNostrApi.signEvent({
        kind,
        content,
        pubkey: this.remoteSignerPubkey.toHex(),
        created_at: line.nowCreateAt(),
        tags: [['p', event.pubkey]],
      })
    )
  }
  private async allow(
    event: Event,
    id: string,
    requestOpt: RequestOption,
    line: ReturnType<typeof this.provideConnect>,
    duration?: number
  ) {
    const { method } = requestOpt

    console.log('duration', duration)

    duration && this.remember(event.pubkey, method, true, duration)

    //请求的id
    let responseResult
    try {
      const result = await this.onRequest({
        senderPubkey: event.pubkey,
        ...requestOpt,
      })

      responseResult = { id, result }
    } catch (e) {
      responseResult = { id, error: e }
    }

    //内容
    const content = await this.remoteSignerNostrApi.encrypt(
      Pubkey.fromHex(event.pubkey),
      JSON.stringify(responseResult)
    )

    await line.relayConfigurator.onInited()

    //发送
    line.publishes(
      line.relayConfigurator.getWriteList(),
      await this.remoteSignerNostrApi.signEvent({
        kind: kind,
        content,
        pubkey: this.remoteSignerPubkey.toHex(),
        created_at: line.nowCreateAt(),
        tags: [['p', event.pubkey]],
      })
    )
  }

  private async onRequest<METHOD extends Method>(
    opt: OnRequestOptions<METHOD>
  ): Promise<GetResultType<Method>> {
    const { method } = opt
    if (method === 'describe') {
      return [
        'describe',
        'get_public_key',
        'sign_event',
        'connect',
        'disconnect',
        'delegate',
        'get_relays',
        'nip04_encrypt',
        'nip04_decrypt',
      ]
    } else if (method === 'get_public_key') {
      return (await this.getLine().nostrApi.getPublicKey()).toHex()
    } else if (method === 'sign_event') {
      const _opt: OnRequestOptions<'sign_event'> = opt as any
      return await this.getLine().nostrApi.signEvent(..._opt.params)
    } else if (method === 'connect') {
      this.connectList.push()
      return 'ack'
    } else if (method === 'disconnect') {
      return
    } else if (method === 'get_relays') {
      await this.getLine().relayConfigurator.onInited()
      return await this.getLine().relayConfigurator.getConfiguration().config
    } else if (method === 'nip04_encrypt') {
      const _opt: OnRequestOptions<'nip04_encrypt'> = opt as any
      let [peerPubkey, text] = _opt.params
      return await this.getLine().nostrApi.encrypt(
        Pubkey.fromHex(peerPubkey),
        text
      )
    } else if (method === 'nip04_decrypt') {
      const _opt: OnRequestOptions<'nip04_decrypt'> = opt as any
      let [peerPubkey, text] = _opt.params
      return await this.getLine().nostrApi.decrypt(
        Pubkey.fromHex(peerPubkey),
        text
      )
    } else {
      throw new Error('Unsupported method')
    }
  }
  async createBunker(secret?: string) {
    secret && this.secrets.add(secret)
    let pubkey = await this.getLine().getPubkeyOrNull()
    let writeList = [...this.getLine().relayConfigurator.getWriteList()]
    return `bunker://${pubkey}?${[
      ...writeList.map(relay => `relay=${relay}`),
      ...(secret ? [`&secret=${secret}`] : []),
    ].join('&')}`
  }
  getActiveList() {
    return this.connectList
  }
  getAllowList() {
    return [...this.perm.getKeys()].filter(key => this.hasParm(key, 'connect'))
  }
  hasParm(key: string, method: keyof RequestMap) {
    let perm = this.perm.get(key)
    console.log('perm', perm, method)

    if (perm === undefined || perm === null) {
      return undefined
    }
    let permInfo = perm[method]

    if (permInfo === undefined || permInfo === null) {
      return undefined
    }

    const [isAllow, periodOfValidity] = permInfo
    if (periodOfValidity && periodOfValidity <= Date.now()) {
      return undefined
    }

    if (isAllow === true) {
      return true
    } else if (isAllow === false) {
      return false
    }
  }
  disConnect(key: string) {
    this.perm.remote(key)
  }
}

export type Method = keyof RequestMap
export type AskOption = {
  event: Event
  allow: (duration?: number | undefined) => Promise<void>
  refuse: (duration?: number | undefined) => Promise<void>
  requestOpt: Exclude<RequestOption, 'result'> & { id: string }
}

type RequestMap = {
  describe: {
    params: []
    result: Array<RequestOption['method']>
  }
  get_public_key: { params: []; result: string }
  sign_event: { params: [EventTemplate]; result: Event }
  connect: { params: [pubkey: string]; result: void }
  disconnect: { params: []; result: void }
  delegate: {
    params: [{ kind: number; since: number; until: number }]
    result: { from: string; to: string; cond: string; sig: string }
  }
  get_relays: {
    params: []
    result: { [url: string]: { read: boolean; write: boolean } }
  }
  nip04_encrypt: {
    params: [pubkey: string, Plaintext]
    result: Ciphertext
  }
  nip04_decrypt: {
    params: [pubkey: string, Ciphertext]
    result: Plaintext
  }
}
type OnRequestOptions<METHOD extends Method> = CreateOptionType<METHOD> & {
  senderPubkey: string
}
type RequestOption = //查看当前客户端具有那些权限
  {
    [key in keyof RequestMap]: {
      method: key
    } & RequestMap[key]
  }[keyof RequestMap] & {}
export type CreateOptionType<METHOD extends Method> = {
  method: METHOD
  params: GetParamsType<METHOD>
}
type GetParamsType<METHOD extends Method> = RequestMap[METHOD]['params']

type Plaintext = string
type Ciphertext = string
export type GetResultType<METHOD extends Method> = RequestMap[METHOD]['result']
