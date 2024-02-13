import {
  WritableReadableList,
  deserializeTagRToReadWriteList,
} from '../../../event/tag'
import { createStaff } from '../..'
import LatestEventStaff from '../eventStaff/LatestEventStaff'

export default createStaff(LatestEventStaff, ({ mod, line }) => {
  return mod
    .defineEmit<
      'has-read-write-list',
      [writableReadableList: WritableReadableList]
    >()
    .assignFeat({
      writableReadableList: null as null | WritableReadableList,
    })
    .inLine(line => {
      line.onHasLatestEvent(e => {
        line.emit(
          'has-read-write-list',
          (line.writableReadableList = deserializeTagRToReadWriteList(e.tags))
        )
      })
    })
})
