import { LogLevel } from "../LogLevel";

export default {
  include: ["**/*"],
  exclude: ["src/nostr/Relay.ts", "**/eventBeltline.ts"],
  level: LogLevel.Silly,
};
