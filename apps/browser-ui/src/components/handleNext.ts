import {
  pubkey,
  emit,
  line,
  hook,
  dialog,
  connect,
} from './NostrConnectForm.vue'

export async function handleNext() {
  if (!pubkey.value) return
  emit('beforeNext')

  const nostrApi = new NostrConnectNostrApiImpl(line, pubkey.value)

  //设置api
  // setNostrApiMode(NostrApiMode.NostrContent);
  // injectNostrApi({ nostrApi: nostrApi });
  //全部同步
  // setTimeout(() => {
  //   relayConfigurator.sync();
  // });
  //设置完成时调用
  hook?.setHook(async () => {
    if (!pubkey.value) return
    dialog.info({
      title: t('note'),
      content: t('nostr_connect_tip'),
      positiveText: t('yes'),
      onPositiveClick: () => {},
    })

    await connect(pubkey.value, nostrApi)
  })

  emit('next')
}
