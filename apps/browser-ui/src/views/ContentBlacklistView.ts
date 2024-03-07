import { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'
import DoubleClickToModifyInputVue from '../components/DoubleClickToModifyInput.vue'
import { withDefault } from '../utils/utils'

type Rule = {
  key: number
  title: string
  ignoreContent: string
}

const blackData = useLocalStorage<Rule[]>('black-data', [])

/**
 * 配置手动过滤名单
 * @returns
 */
// export function createBlackStaff() {
//   return createStaff({
//     push(event) {
//       if (
//         blackData.value.some((rule) => {
//           if (!rule.ignoreContent) {
//             return false;
//           }
//           return event.content.includes(rule.ignoreContent);
//         })
//       ) {
//         return StaffState.BREAK;
//       }
//     },
//   });
// }

let maxKey = computed(() =>
  blackData.value.reduce(
    (priv, current) => (current.key > priv ? current.key : priv),
    0
  )
)
export function useBlackData() {
  function addRule(option?: Partial<Rule>) {
    blackData.value.push(
      withDefault(option, {
        key: Number(maxKey.value) + 1,
        title: '',
        ignoreContent: '',
      }) as any
    )
  }
  return { blackData, addRule }
}
export function useBlacklistState() {
  const { blackData: data, addRule } = useBlackData()
  const createColumns = (): DataTableColumns<Rule> => {
    return [
      {
        type: 'selection',
        options: [
          {
            label: '反选',
            key: 'ReverseSelection',
            onSelect: pageData => {
              checkedRowKeys.value = pageData
                .filter(rule => !checkedRowKeys.value.includes(rule.key))
                .map(rule => rule.key)
            },
          },
          {
            label: '删除选中项',
            key: 'delete',
            onSelect: pageData => {
              checkedRowKeys.value.forEach(key => {
                const index = data.value.findIndex(rule => rule.key === key)
                if (index === -1) return
                data.value.splice(index, 1)
              })
            },
          },
        ],
      },
      ...['key', 'title', 'ignoreContent'].map(k => {
        const kk = k as keyof Rule
        const t: TableColumn<Rule> = {
          title: k,
          key: k,
          render(row, index) {
            return h(DoubleClickToModifyInputVue as any, {
              value: String(row[kk]),
              onClick() {
                if (index === data.value.length - 1) {
                  addRule()
                }
              },
              onUpdateValue(v: any) {
                ;(data.value[index] as any)[kk] = v
              },
            })
          },
        }
        return t
      }),
    ]
  }

  const checkedRowKeys = ref<DataTableRowKey[]>([])
  const columns = createColumns()

  if (data.value.length === 0) {
    addRule()
  }
  return { checkedRowKeys, columns }
}
