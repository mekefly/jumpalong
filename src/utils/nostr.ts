import { Filter, nip19 } from "nostr-tools";
import { ProfilePointer } from "nostr-tools/nip19";
import { setAdds } from "./utils";

export function toProfilePointer(str: string): ProfilePointer | null {
  try {
    const v = nip19.decode(str);

    switch (v["type"]) {
      case "nprofile":
        return v.data as ProfilePointer;
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

export function profilePointerToNprofile(
  profilePointer: ProfilePointer
): string {
  return nip19.nprofileEncode(profilePointer);
}
export function toNprofile(str: string): string | null {
  const profilePointer = toProfilePointer(str);
  console.log(profilePointer);

  if (!profilePointer) return null;
  return profilePointerToNprofile(profilePointer);
}
export function toDeCodeNevent(str: string): {
  id: string;
  relays: string[];
} | null {
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
