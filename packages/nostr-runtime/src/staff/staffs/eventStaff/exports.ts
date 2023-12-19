import type { StaffConfigType } from '../../staff';
import {default as EventListStaff} from './EventListStaff';
import {default as EventStaff} from './EventStaff';
import {default as InsertObjectListStaff} from './InsertObjectListStaff';
import {default as ReverseSearchInsertOnObjectList} from './ReverseSearchInsertOnObjectList';
type EventListStaffConfigType = StaffConfigType<typeof EventListStaff>
type EventStaffConfigType = StaffConfigType<typeof EventStaff>
type InsertObjectListStaffConfigType = StaffConfigType<typeof InsertObjectListStaff>
export * from './filter'
export {EventListStaff, EventStaff, InsertObjectListStaff}
export type {EventListStaffConfigType, EventStaffConfigType, InsertObjectListStaffConfigType}