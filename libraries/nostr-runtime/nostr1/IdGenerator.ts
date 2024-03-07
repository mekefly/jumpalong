import { createId } from "@/utils/utils";
import { injectable } from "inversify";

@injectable()
export class IdGenerator {
  createId() {
    return createId();
  }
}
