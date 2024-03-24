import { RelayConfiguratorSynchronizer, Synchronizer } from '../nostr-runtime'
import { useThemeVars } from 'naive-ui'
import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { useEventLine } from './ProvideEventLine'
import { useOnOK } from '../utils/use'

type State = Operate | 'default'
type Operate = 'push' | 'pull'
function handelSync(
  url: string,
  onOK: any,
  relayConfigurator: InstanceType<
    typeof Synchronizer.RelayConfiguratorSynchronizer
  >,
  {
    message,
    dialog,
  }: {
    message: MessageApiInjection
    dialog: DialogApiInjection
  }
) {
  return new Promise<Operate>((res, rej) => {
    relayConfigurator.replaceableSynchronizer.synchronizer.syncOne(url, {
      onEvent(e, url) {
        dialog.success({
          title: t('success'),
          content: t('handel_sync_on_event_message', { url }),
          positiveText: t('yes'),
        })
        res('pull')
      },
      onPush() {
        message.warning(t('handel_sync_on_push_message', { url }))
        res('push')
      },
      onOK,
    })
    message.info(t('handel_sync_info', { url }))
  })
}
export function useSyncState(url: Ref<string>) {
  let line = useEventLine(RelayConfiguratorSynchronizer.Staff)
  let relayConfigurator = line.relayConfigurator
  const dialog = useDialog()
  const message = useMessage()
  const isLoading = ref()
  const status = ref('default' as State)
  const themeVar = useThemeVars()
  const onOK = useOnOK()
  const color = computed(() => {
    switch (status.value) {
      case 'pull':
        return themeVar.value.successColor
      case 'push':
        return themeVar.value.primaryColor
      default:
        return themeVar.value.textColor1
    }
  })
  return {
    isLoading,
    status,
    color,
    handelSync: async () => {
      isLoading.value = true
      status.value = await handelSync(unref(url), onOK, relayConfigurator, {
        message,
        dialog,
      })
      isLoading.value = false
    },
  }
}
