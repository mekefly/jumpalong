import { useLocalStorage } from "@vueuse/core";
import { createTagP } from "../utils/natorTag";
import { useNewestEvent } from "../utils/use";
import { nowSecondTimestamp } from "../utils/utils";
import { createEvent, publishEvent } from "./event";
import { getUserMetadataByPubkey, userKey, UserMetaData } from "./user";

export const localContacts = useLocalStorage<ContactList>("contacts", {});

/**
 * 获取联系人列表
 *
 * @export
 * @param {string} pubkey
 * @return {*}  {ComputedRef<ContactList>}
 */
export function getContactList(pubkey: string): ComputedRef<ContactList> {
  const newEvent = useNewestEvent([{ kinds: [3], authors: [pubkey] }], {
    useCache: true,
  });
  return computed(() => {
    if (!newEvent.value) return {};

    const cs = tagsToContactList(newEvent.value?.tags);
    if (!cs.contacts) return {};

    Object.keys(cs.contacts ?? {}).forEach(async (pubkey) => {
      const meta = await getUserMetadataByPubkey(pubkey);
      Object.assign((cs.contacts as any)[pubkey], meta);
    });
    return { cs, createAt: newEvent.value.created_at };
  }) as any;
}

/**
 * 更新联系人列表
 *
 * @export
 */
export function pullMyContacts() {
  const con = getContactList(userKey.value.publicKey);
  watch(con, () => {
    if (!con.value.createAt) return;
    if (
      !localContacts.value.createAt ||
      con.value.createAt > localContacts.value.createAt
    ) {
      localContacts.value = con.value;
    }
  });
}

/**
 * 推送联系人列表
 *
 * @export
 * @return {*}
 */
export function pushMyContacts() {
  if (
    !localContacts.value ||
    !localContacts.value.contacts ||
    !localContacts.value.createAt
  )
    return;

  const event = createEvent({
    kind: 3,
    created_at: localContacts.value.createAt,
    tags: Object.keys(localContacts.value.contacts).map((pubkey) => {
      const c = (localContacts.value.contacts as any)[pubkey];
      return createTagP(pubkey, c.relay, c.name);
    }),
  });
  publishEvent(event);
}

/**
 * 关注好友
 *
 * @export
 * @param {string} [pubkey]
 * @return {*}
 */
export async function followContact(pubkey?: string) {
  if (!pubkey) return;

  const up = (c: Contact) => {
    console.log("pushMyContacts", localContacts.value);
    (localContacts.value.contacts ?? (localContacts.value.contacts = {}))[
      pubkey
    ] = c;
    localContacts.value.createAt = nowSecondTimestamp();
    pushMyContacts();
    console.log("pushMyContacts", localContacts.value);
  };
  createContactByPubkey(pubkey, { reqFull: true, onUp: up });
}

/**
 * 取消关注
 *
 * @export
 * @param {string} [pubkey]
 * @return {*}
 */
export function unFollowContact(pubkey?: string) {
  if (!pubkey) return;
  if (!localContacts.value?.contacts) return;

  const c = localContacts.value.contacts[pubkey];
  if (!c) return;
  delete localContacts.value.contacts[pubkey];
  pushMyContacts();
}

function createContactByPubkey(
  pubkey: string,
  options?: {
    reqFull?: boolean;
    onFull?: (c: Contact) => void;
    onPart?: (c: Contact) => void;
    onUp?: (c: Contact) => void;
  }
): Contact {
  const contact = {};

  options?.reqFull &&
    getUserMetadataByPubkey(pubkey).then((m) => {
      Object.assign(contact, m);
      options?.onFull?.(contact);
      options?.onUp?.(contact);
    });
  options?.onPart?.(contact);
  options?.onUp?.(contact);
  return contact;
}

function tagsToContactList(tags?: string[][]) {
  if (!tags) return {};
  const contact: ContactList = {};
  tags.forEach((tag) => {
    if (tag[0] === "p") {
      //前一部分初始化，后一部分付值到前
      (contact.contacts ?? (contact.contacts = {}))[tag[1]] = {
        relay: tag[2],
        name: tag[3],
      };
    }
  });
  return contact;
}

export type ContactList = {
  createAt?: number;
  contacts?: Record<string, Contact>;
};

export interface Contact extends UserMetaData {
  name?: string;
  relay?: string;
}
