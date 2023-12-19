import { Filter } from 'nostr-tools'
import { FiltersStaff, createStaff } from '../..'

export default createStaff(FiltersStaff, line => {
  return (
    line
      // 定义事件
      .defineEmit<'add-filters', [filters: Filter[]]>()
      .assignFeat({
        addFilter(filter: Filter) {
          this.addFilters([filter])
          return this
        },
        addFilters(filters: Filter[]) {
          let newFilterAdded = [] as any[]
          //去重
          for (const filter of filters) {
            let key = String(filter)
            if (this.filters.has(key)) {
              continue
            }
            this.filters.set(key, filter)
            newFilterAdded.push(filter)

            return this
          }

          if (newFilterAdded.length > 0) {
            // addFilters事件
            this.emitWithOption('add-filters', [newFilterAdded])
          }
          return this
        },
        getFilters() {
          return this.filters
        }
      })
  )
})

// export  function filterStaffFactory() {
//   return createStaff(
//     <FEAT extends EventListFeat>(line: EventBeltline<FEAT>) => {
//       const filters: Filter[] = [];
//       const xx = line
//         // 定义事件
//         .defineEmit<"add-filters", [filters: Filter[]]>().feat;
//       return (
//         line
//           // 定义事件
//           .defineEmit<"add-filters", [filters: Filter[]]>()
//           // 添加特性
//           .assignFeat({
//             filters: filters,
//             addFilter(filter: Filter) {
//               this.addFilters([filter]);
//               return this;
//             },
//             addFilters(filters: Filter[]) {
//               this.filters.push(...filters);

//               //请求所有urls和增加的过滤器
//               this.beltline.reqs(this.beltline.getRelayUrls(), filters);

//               // addFilters事件
//               this.beltline.emit("add-filters", filters);

//               return this;
//             },
//             getFilters() {
//               return this.filters;
//             },
//           })

//           // 初始化过滤器
//           .addStaff(createFilterStaff(filters), {
//             unshift: true,
//           })

//           //监听添加url时自动发送请求
//           .on("add-relay-urls", (incrementUrl) => {
//             line.reqs(incrementUrl, filters);
//           })
//       );
//     }
//   );
// }
