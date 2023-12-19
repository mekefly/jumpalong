import type { StaffConfigType } from '../../staff';
import {default as DefineSubEventStaff} from './DefineSubEventStaff';
import {default as EoseAutoUnSubStaff} from './EoseAutoUnSubStaff';
import {default as SubIdListStaff} from './SubIdListStaff';
import {default as TimeoutAutoUnSubStaff} from './TimeoutAutoUnSubStaff';
type DefineSubEventStaffConfigType = StaffConfigType<typeof DefineSubEventStaff>
type EoseAutoUnSubStaffConfigType = StaffConfigType<typeof EoseAutoUnSubStaff>
type SubIdListStaffConfigType = StaffConfigType<typeof SubIdListStaff>
type TimeoutAutoUnSubStaffConfigType = StaffConfigType<typeof TimeoutAutoUnSubStaff>
export {DefineSubEventStaff, EoseAutoUnSubStaff, SubIdListStaff, TimeoutAutoUnSubStaff}
export type {DefineSubEventStaffConfigType, EoseAutoUnSubStaffConfigType, SubIdListStaffConfigType, TimeoutAutoUnSubStaffConfigType}