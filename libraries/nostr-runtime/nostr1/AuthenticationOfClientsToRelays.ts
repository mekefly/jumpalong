import { inject, injectable } from "inversify";
import { createEvent } from "./event";
import { TYPES } from "./nostr";
import { RelayEmiter } from "./relayEmiter";

/**
 * NIP-42
 * Authentication of clients to relays
 * 客户端到中继身份验证
 */
@injectable()
export class AuthenticationOfClientsToRelays {
  constructor(
    @inject(TYPES.RelayEmiter)
    private relayEmiter: RelayEmiter
  ) {
    this.listen();
  }

  listen() {
    this.relayEmiter.onAuth((o) => {
      this.sendAuth(o);
    });
  }
  async sendAuth(o: { url: string; challenge: string }) {
    try {
      const event = await createEvent(
        {
          kind: 22242,
          tags: [
            ["relay", o.url],
            ["challenge", o.challenge],
          ],
        },
        { intercept: false }
      );
      this.relayEmiter.emitReqAuth(o.url, event);
    } catch (error) {}
  }
}
