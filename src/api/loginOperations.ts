import contactConfiguration from "./Contact";
import { testAndVerifyNewUser } from "./login";

export const loginOperations: Array<() => void> = [];

loginOperations.push(() => {
  //对新用户执行的操作
  if (testAndVerifyNewUser()) {
    contactConfiguration.follow(
      "e0b1ecd7a7fc5f76ac5cf860b38d647db00c8067dabe29565e3ac827297cdda8",
      "wss://nos.lol", //作者
      "你好"
    );
    contactConfiguration.joinChannel(
      "25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb", //nostr群
      "wss://nos.lol"
    );
  }
});
