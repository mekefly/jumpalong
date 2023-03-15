export class IdGenerator {
  createId() {
    return Math.random().toString().slice(2);
  }
}
