import { EventBeltline } from "@/nostr/eventBeltline";
import { Event, Filter } from "nostr-tools";
import { createStaffFactory, FeatType } from "..";
export type StorageInterface = {
  setItem(this: FeatType<object>, event: Event): Promise<void>;
  getItemById(this: FeatType<object>, id: string): Promise<Event>;
  deleteItemById(this: FeatType<object>, id: string): Promise<void>;
  getByFilters(this: FeatType<object>, filters: Filter[]): Promise<Event[]>;
  setByFilters(
    this: FeatType<object>,
    filters: Filter[],
    events: Filter[]
  ): Promise<EventBeltline>;
  useStoreLine(
    this: FeatType<object>,
    filters: Filter[]
  ): Promise<EventBeltline>;
};

export default createStaffFactory()((): { feat: StorageInterface } => {
  return {
    feat: {
      setItem(event: Event): Promise<void> {
        throw new Error("");
      },
      async getItemById(id: string): Promise<Event> {
        throw new Error("");
      },
      async deleteItemById(id: string): Promise<void> {
        throw new Error("");
      },
      getByFilters(filters: Filter[]): Promise<Event[]> {
        throw new Error("");
      },
      setByFilters() {
        throw new Error("");
      },
      useStoreLine() {
        throw new Error("");
      },
    },
  };
});
