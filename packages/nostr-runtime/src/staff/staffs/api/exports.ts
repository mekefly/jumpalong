import type { StaffConfigType } from '../../staff';
import {default as EventApiStaff} from './EventApiStaff';
import {default as UserApiStaff} from './UserApiStaff';
type EventApiStaffConfigType = StaffConfigType<typeof EventApiStaff>
type UserApiStaffConfigType = StaffConfigType<typeof UserApiStaff>
export {EventApiStaff, UserApiStaff}
export type {EventApiStaffConfigType, UserApiStaffConfigType}