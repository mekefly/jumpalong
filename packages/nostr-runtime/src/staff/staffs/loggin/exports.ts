import type { StaffConfigType } from '../../staff';
import {default as NostrApiStaff} from './NostrApiStaff';
type NostrApiStaffConfigType = StaffConfigType<typeof NostrApiStaff>
export {NostrApiStaff}
export type {NostrApiStaffConfigType}