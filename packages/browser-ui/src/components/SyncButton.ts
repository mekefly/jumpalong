import { RelayConfiguratorSynchronizerStaff } from '@jumpalong/nostr-runtime'
import { useThemeVars } from 'naive-ui'
import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { useEventLine } from './ProvideEventLine'
import type { RelayConfiguratorSynchronizer } from 'packages/nostr-runtime/src/Synchronizer/RelayConfiguratorSynchronizer'

type State = Operate | 'default'
type Operate = 'push' | 'pull'
function handelSync(
  url: string,
  relayConfigurator: RelayConfiguratorSynchronizer,
  {
    message,
    dialog,
  }: {
    message: MessageApiInjection
    dialog: DialogApiInjection
  }
) {
  return new Promise<Operate>((res, rej) => {
    relayConfigurator.syncOne(url, {
      onEvent(e, url) {
        dialog.success({
          title: t('success'),
          content: t('handel_sync_on_event_message', { url }),
          positiveText: t('yes'),
        })
        res('pull')
      },
      onPush() {
        message.success(t('handel_sync_on_push_message', { url }))
        res('push')
      },
    })
    message.info(t('handel_sync_info', { url }))
  })
}
export function useSyncState(url: Ref<string>) {
  let line = useEventLine(RelayConfiguratorSynchronizerStaff)
  let relayConfigurator = line.relayConfigurator
  const dialog = useDialog()
  const message = useMessage()
  const isLoading = ref()
  const status = ref('default' as State)
  const themeVar = useThemeVars()
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
      status.value = await handelSync(unref(url), relayConfigurator, {
        message,
        dialog,
      })
      isLoading.value = false
    },
  }
}
