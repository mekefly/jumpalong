import { Filter } from "nostr-tools";
import { createStaff } from "../../staff";
import { IdGeneratorStaff } from "..";

export default createStaff(IdGeneratorStaff, (mod) => {
  let line = mod.out();
  // if (filters.length === 0) return;
  // urls?.forEach(async (url) => {
  //   try {
  //     this.req(url, filters);
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // });
  return mod.assignFeat({
    reqs(urls: Set<string>, filters: Filter[]) {
      if (filters.length === 0) return;
      urls?.forEach(async (url) => {
        try {
          this.req(url, filters);
        } catch (error) {
          logger.error(error);
        }
      });
    },
    req(url: string, filters: Filter[]) {
      const subId = line.createId();

      this.onReceiveEvent(subId);

      this.setSubidMap(subId, url);

      this.relayEmiter.emitRequest("req", {
        subId,
        url,
        filters,
      });
    },
  });
});
