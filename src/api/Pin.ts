import { TYPES } from "@/nostr/nostr";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import { useCache } from "@/utils/cache";
import { callLogger } from "@/utils/decorator";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { GeneralEventEventBeltline } from "./GeneralEventEventBeltline";
import { CreateTextEventBeltlineOption } from "./shortTextEventBeltline";

@injectable()
export class CreatePinEventLine {
  static logger = logger;
  constructor(
    @inject(new LazyServiceIdentifer(() => TYPES.GeneralEventEventBeltline))
    private generalEventEventBeltline: GeneralEventEventBeltline
  ) {}

  @callLogger()
  createPinEventLine(
    opts: { pubkey: string } & Partial<CreateTextEventBeltlineOption>
  ) {
    return useCache(
      `createTipEventLine:${opts.pubkey}`,
      () => {
        const line = this.generalEventEventBeltline
          .createGeneralEventEventBeltline({
            filters: [{ kinds: [10001], authors: [opts.pubkey] }],
            ...opts,
          })
          .addStaff(createLatestEventStaff());

        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
}
