import { deserializeTagR } from "@/nostr/tag";
import { Event, Filter, nip19 } from "nostr-tools";
import { ProfilePointer } from "nostr-tools/lib/nip19";
import { setAdds } from "./utils";

export function toDeCodeNprofile(str: string): ProfilePointer | null {
  try {
    const v = nip19.decode(str);

    switch (v["type"]) {
      case "nprofile":
        return v.data as nip19.ProfilePointer;
      case "npub":
        return { pubkey: v.data as string };
      default:
        return null;
    }
  } catch (e) {
    try {
      nip19.npubEncode(str);
      return { pubkey: str };
    } catch (error) {
      return null;
    }
  }
}
export function decodeToPrikey(anyPrikey: string) {
  if (!anyPrikey) return null;
  if (isPrikey(anyPrikey)) {
    return anyPrikey;
  }
  try {
    const decodeData: any = nip19.decode(anyPrikey);
    if (decodeData.type === "nsec") {
      return decodeData.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
export function isPrikey(prikey: string): boolean {
  try {
    const nsec = nip19.nsecEncode(prikey);
    return nip19.decode(nsec).data === prikey;
  } catch (error) {
    return false;
  }
}

export function profilePointerToNprofile(
  profilePointer: nip19.ProfilePointer
): string {
  return nip19.nprofileEncode(profilePointer);
}
export function toNprofile(str: string): string | null {
  const profilePointer = toDeCodeNprofile(str);
  console.log(profilePointer);

  if (!profilePointer) return null;
  return profilePointerToNprofile(profilePointer);
}
export function neventEncodeByNeventOpt(v: NeventOpt | null) {
  if (!v) return null;
  return nip19.neventEncode(v);
}
type NeventOpt = {
  id: string;
  relays: string[];
};
export function toDeCodeNevent(str: string): NeventOpt | null {
  try {
    const v = nip19.decode(str);

    switch (v["type"]) {
      case "nevent":
        return v.data as any;
      case "note":
        return { id: v.data as string, relays: [] };
      default:
        return null;
    }
  } catch (e) {
    try {
      nip19.noteEncode(str);
      return { id: str, relays: [] };
    } catch (error) {
      return null;
    }
  }
}

export function getIncludePublicKeyByFilters(
  include: Array<"authors" | "#p">,
  filters: Iterable<Filter>
) {
  return getIncludeMergeByFilters(include, filters);
}

export function getIncludeMergeByFilters(
  include: Iterable<"ids" | "#e" | "authors" | "#p">,
  filters: Iterable<Filter>
) {
  const merageArr: Set<string> = new Set();
  for (const includeKey of include) {
    for (const filter of filters) {
      setAdds(merageArr, filter[includeKey] ?? []);
    }
  }
  return merageArr;
}
export function neventEncodeByEvent(event: Event, moreUrls?: Set<string>) {
  const url = deserializeTagR(event.tags);
  return nip19.neventEncode({
    id: event.id as string,
    relays: [...url, ...(moreUrls ?? [])],
  });
}
