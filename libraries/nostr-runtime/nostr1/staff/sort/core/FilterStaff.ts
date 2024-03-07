import { EventBeltline } from "@/nostr/eventBeltline";
import { Filter } from "nostr-tools";
import { createFilterStaff } from "../../createFilterStaff";
import { createStaff } from "../../Staff1";

export default function filterStaffFactory() {
  return createStaff(
    <FEAT extends {}, EVENTMAP extends {} = {}>(line: EventBeltline<FEAT>) => {
      const filters: Filter[] = [];
      return (
        line
          // 定义事件
          .defineEmit<"add-filters", [filters: Filter[]]>()
          // 添加特性
          .assignFeat({
            filters: filters,
            addFilter(filter: Filter) {
              this.addFilters([filter]);
              return this;
            },
            addFilters(filters: Filter[]) {
              this.filters.push(...filters);

              //请求所有urls和增加的过滤器
              this.beltline.reqs(this.beltline.getRelayUrls(), filters);

              // addFilters事件
              this.beltline.emit("add-filters", filters);
              return this;
            },
            getFilters() {
              return this.filters;
            },
          })

          // 初始化过滤器
          .addStaff(createFilterStaff(filters), { unshift: true })

          //监听添加url时自动发送请求
          .on("add-relay-urls", (incrementUrl) => {
            line.reqs(incrementUrl, filters);
          })
      );
    }
  );
}
