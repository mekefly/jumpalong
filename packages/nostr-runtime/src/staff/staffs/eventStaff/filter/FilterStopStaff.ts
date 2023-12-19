import FiltersStaff from "./FiltersStaff";
import addFiltersStaff from "./AddFiltersStaff";
import { Event, Filter } from "nostr-tools";
import { createStaff } from "../../../staff";
import EventStaff from "../EventStaff";

export default createStaff(EventStaff, addFiltersStaff, (mod) => {
  mod.out().on("event", (subId, event) => {
    if (toFilters(event, [...mod.out().filters.values()], 0)) {
      return true;
    } else {
      return false;
    }
  });
  return mod;
});

export function toFilters(event: Event, filters: Filter[], length: number) {
  if (filters.length === 0) {
    return true;
  }
  return filters.some((filter) => {
    return toFilter(event, filter, length);
  });
}

export function toFilter(
  event: Event,
  filter: Filter & { search?: string },
  length: number
) {
  const { ids, kinds, authors, since, until, limit, search } = filter;

  if (ids && !ids.includes(event.id as any)) {
    return false;
  } else if (kinds && !kinds.includes(event.kind)) {
    return false;
  } else if (authors && !authors.includes(event.pubkey)) {
    return false;
  } else if (since && !(event.created_at >= since)) {
    return false;
  } else if (until && !(event.created_at <= until)) {
    return false;
  } else if (limit && !(length < limit)) {
    return false;
  } else if (!filterTags(filter, event.tags)) {
    return false;
  } else if (
    search &&
    !JSON.stringify(event).toLowerCase().includes(search.toLowerCase())
  ) {
    return false;
  } else {
    return true;
  }
}

export function filterTags(filter: Filter, tags: string[][]) {
  for (let f in filter) {
    if (f[0] === "#") {
      let tagName = f.slice(1);
      let filterTagValues = filter[`#${tagName}`];
      if (
        filterTagValues &&
        !tags.find(([t, v]) => t === tagName && (filterTagValues as any).includes(v))
      )
        return false;
    }
  }
  return true;
}
