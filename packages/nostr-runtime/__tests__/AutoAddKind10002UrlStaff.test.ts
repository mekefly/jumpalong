import { AutoAddKind10002UrlStaff } from "../src/staff/staffs/staffExport"
import { createTestEventTemplate } from "./utils"

describe('AutoAddKind10002UrlStaff', () => {
  test('AutoAddKind10002UrlStaff', () => {
    createTestEventTemplate().add(AutoAddKind10002UrlStaff)
  
  })
})