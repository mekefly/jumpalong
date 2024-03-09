export type RelayConfiguration = {
  read: Set<string>
  write: Set<string>
  config: ReadAndWriteConfigurationMap
}

export type ReadAndWriteConfigurationMap = Record<
  string,
  ReadAndWriteConfiguration
>
export type ReadAndWriteConfiguration = { read: boolean; write: boolean }
