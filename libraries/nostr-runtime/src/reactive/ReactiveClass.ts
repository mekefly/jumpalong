import { EventLine } from '@jumpalong/nostr-runtime'
import ReactiveStaff from '../staff/staffs/reactive/ReactiveStaff'

export default class ReactiveClass {
  constructor(l: EventLine<{}>) {
    console.log(l,this);
    
    return l.add(ReactiveStaff).reactive(this) as any
  }
}
