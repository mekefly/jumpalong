import { type Event } from "nostr-tools";
import { ref, watchEffect } from "vue";
import { type CallBackT } from "../utils/types";
import { userGetEvent } from "../utils/use";
import { interceptTheLastSixDigits } from "../utils/utils";
import { createEvent, publishEvent } from "./event";
import { sub } from "./relays";
import { userKey } from "./user";

export function getChannels(options: {
  relayUrls?: Set<string>;
  even: CallBackT<Event>;
}) {
  const { relayUrls, even } = options;
  sub(
    [
      {
        ids: [
          "b4d6926dd0428f0bd36012f0721a70b4c38140d141bfa5efc2167b551a0d9ff2",
        ],
        kinds: [42],
        // authors: [key.value.publicKey],
        "#e": [
          "b4d6926dd0428f0bd36012f0721a70b4c38140d141bfa5efc2167b551a0d9ff2",
        ],
      },
    ],
    {
      relayUrls,
      even,
    }
  );
}

export function getChannelMetadata(id: string, relayUrls: Set<string>) {
  const channelMetadata = ref({
    id,
    name: interceptTheLastSixDigits(id),
    about: "",
    picture: "",
    recommendRelay: "",
    createdAt: 0,
    updateAt: 0,
  });

  sub([{ ids: [id], kinds: [40] }], {
    relayUrls,
    even(event) {
      channelMetadata.value.createdAt = event.created_at;
      if (event.created_at <= channelMetadata.value.updateAt) return;

      Object.assign(channelMetadata.value, parseMetadata(event));
    },
  });
  sub([{ "#e": [id], kinds: [41] }], {
    relayUrls,
    even(event) {
      if (event.created_at <= channelMetadata.value.updateAt) return;
      console.log("parseMetadata", parseMetadata(event), event);
      Object.assign(channelMetadata.value, parseMetadata(event));

      channelMetadata.value.recommendRelay = getRecommendRelay(event);
    },
  });
  return channelMetadata;
}
function parseMetadata(event: Event) {
  let data: any = {};
  try {
    data = JSON.parse(event.content);
  } catch (error) {}
  return data;
}

function getRecommendRelay(event: Event) {
  let recommendRelay = "";
  event.tags.forEach((v) => {
    const tag = v[0];
    if (tag === "e") {
      recommendRelay = tag[2];
    }
  });
  return recommendRelay;
}

export function getChannelMessage(
  id: string,
  urls: Set<string>
) {
  return userGetEvent({
    relayUrls: urls,
    filters: [
      {
        kinds: [40, 41, 42],
        "#e": [id],
      },
    ],
  });
}
export function joinChannel(id: string, pubkey?: string) {
  publishEvent(
    createEvent({
      kind: 7,
      content: "+",
      tags: [["e", id], ...(pubkey ? [["p", pubkey]] : [])],
    }),
    {
      ok() {
        console.log("添加群聊成功");
      },
    }
  );
}
export function leaveChannel(id: string, pubkey?: string) {
  publishEvent(
    createEvent({
      kind: 7,
      content: "-",
      tags: [["e", id], ...(pubkey ? [["p", pubkey]] : [])],
    })
  );
}
export function getChannelEvent(urls?: Set<string>) {
  return userGetEvent({
    relayUrls: urls,
    filters: [
      {
        authors: [userKey.value.publicKey],
        kinds: [7],
      },
    ],
  });
}
