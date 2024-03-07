export default createStaff(line => {
  type P = [subId: string, url: string]
  return line.defineEmit<'eose', P>()
})
