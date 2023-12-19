export type ReadAndWriteConfigurationMap = Record<
  string,
  ReadAndWriteConfiguration
>
export type ReadAndWriteConfiguration = { read: boolean; write: boolean }
