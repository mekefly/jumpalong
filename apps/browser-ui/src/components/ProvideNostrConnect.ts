import { ProvideRemoteSigner } from '../nostr-runtime'
import { createInjection } from '../utils/useUtils'
import { useEventLine } from './ProvideEventLine'

export const [provideSigner, injectSigner, assertSigner] = createInjection(
  { name: 'connect-signer' },
  () => {
    const line = useEventLine()
    return {
      remoteSigner: new ProvideRemoteSigner(line),
    }
  }
)
