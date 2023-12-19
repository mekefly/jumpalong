import {
  DefinePublishEventStaff,
  DefineSubEventStaff,
  createStaff,
} from '../..'
import AddFilterStaff from './AddFilterStaff'
import AddUrlStaff from './AddUrlStaff'
import FilterListStaff from './FilterListStaff'
import UrlListStaff from './UrlListStaff'
import addEventStaff from './AddEventStaff'

export default createStaff(
  UrlListStaff,
  FilterListStaff,
  AddFilterStaff,
  AddUrlStaff,
  DefineSubEventStaff,
  DefinePublishEventStaff,
  addEventStaff,
  ({ mod, line }) => {
    line
      .on('add-filters', filters => {
        line.subs(line.urlList, filters)
      })
      .on('add-urls', urls => {
        line.subs(urls, line.filterList)
        for (const event of line.publishedEventList) {
          line.publishes(urls, event)
        }
      })
      .on('add-event', event => {
        line.publishes(line.urlList, event)
      })

    return mod
  }
)
