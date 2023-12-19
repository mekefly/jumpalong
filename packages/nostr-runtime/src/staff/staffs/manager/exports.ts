import type { StaffConfigType } from '../../staff';
import {default as AddEventStaff} from './AddEventStaff';
import {default as AddFilterStaff} from './AddFilterStaff';
import {default as AddUrlStaff} from './AddUrlStaff';
import {default as FilterListStaff} from './FilterListStaff';
import {default as ManagerStaff} from './ManagerStaff';
import {default as PublishedEventListStaff} from './PublishedEventListStaff';
import {default as UrlListStaff} from './UrlListStaff';
type AddEventStaffConfigType = StaffConfigType<typeof AddEventStaff>
type AddFilterStaffConfigType = StaffConfigType<typeof AddFilterStaff>
type AddUrlStaffConfigType = StaffConfigType<typeof AddUrlStaff>
type FilterListStaffConfigType = StaffConfigType<typeof FilterListStaff>
type ManagerStaffConfigType = StaffConfigType<typeof ManagerStaff>
type PublishedEventListStaffConfigType = StaffConfigType<typeof PublishedEventListStaff>
type UrlListStaffConfigType = StaffConfigType<typeof UrlListStaff>
export {AddEventStaff, AddFilterStaff, AddUrlStaff, FilterListStaff, ManagerStaff, PublishedEventListStaff, UrlListStaff}
export type {AddEventStaffConfigType, AddFilterStaffConfigType, AddUrlStaffConfigType, FilterListStaffConfigType, ManagerStaffConfigType, PublishedEventListStaffConfigType, UrlListStaffConfigType}