import type { StaffConfigType } from '../../staff';
import {default as AddFiltersStaff} from './AddFiltersStaff';
import {default as FiltersStaff} from './FiltersStaff';
import {default as FilterStopStaff} from './FilterStopStaff';
type AddFiltersStaffConfigType = StaffConfigType<typeof AddFiltersStaff>
type FiltersStaffConfigType = StaffConfigType<typeof FiltersStaff>
type FilterStopStaffConfigType = StaffConfigType<typeof FilterStopStaff>
export {AddFiltersStaff, FiltersStaff, FilterStopStaff}
export type {AddFiltersStaffConfigType, FiltersStaffConfigType, FilterStopStaffConfigType}