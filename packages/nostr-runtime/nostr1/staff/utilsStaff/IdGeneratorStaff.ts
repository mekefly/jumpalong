import { IdGenerator } from "@/nostr/IdGenerator";
import { createStaff } from "../Staff";

export default createStaff((line) =>
  line.defineFeat("idGenerator", new IdGenerator())
);
