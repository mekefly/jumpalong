import type { StaffConfigType } from '../../staff';
import {default as AddStaff} from './AddStaff';
type AddStaffConfigType = StaffConfigType<typeof AddStaff>
export {AddStaff}
export type {AddStaffConfigType}