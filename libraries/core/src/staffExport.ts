import type { StaffConfigType } from './staff';
import {default as CreateChildEmitStaff} from './staffs/CreateChildEmitStaff';
import {default as CreateChildHookStaff} from './staffs/CreateChildHookStaff';
import {default as CreateHookEmitStaff} from './staffs/CreateHookEmitStaff';
import {default as CreateHookStaff} from './staffs/CreateHookStaff';
import {default as PauseStaff} from './staffs/PauseStaff';
type CreateChildEmitStaffConfigType = StaffConfigType<typeof CreateChildEmitStaff>
type CreateChildHookStaffConfigType = StaffConfigType<typeof CreateChildHookStaff>
type CreateHookEmitStaffConfigType = StaffConfigType<typeof CreateHookEmitStaff>
type CreateHookStaffConfigType = StaffConfigType<typeof CreateHookStaff>
type PauseStaffConfigType = StaffConfigType<typeof PauseStaff>
export {CreateChildEmitStaff, CreateChildHookStaff, CreateHookEmitStaff, CreateHookStaff, PauseStaff}
export type {CreateChildEmitStaffConfigType, CreateChildHookStaffConfigType, CreateHookEmitStaffConfigType, CreateHookStaffConfigType, PauseStaffConfigType}