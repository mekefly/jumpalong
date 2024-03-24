import ReactionStaff from '../api/ReactionStaff'
import type { EventLine } from '@jumpalong/core'

export default class ReactiveClass {
  constructor(l: EventLine<{}>) {
    return l.add(ReactionStaff).reactive(this) as any
  }
}
