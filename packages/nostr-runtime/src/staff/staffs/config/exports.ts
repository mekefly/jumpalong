import type { StaffConfigType } from '../../staff';
import {default as ConfigStaff} from './ConfigStaff';
type ConfigStaffConfigType = StaffConfigType<typeof ConfigStaff>
export {ConfigStaff}
export type {ConfigStaffConfigType}