import { createStaffFactory } from "./Staff";

const sourceRecorder = reactive(new Map<string, Set<string>>());

export default createStaffFactory()(() => {
  return {
    push(e, _, { url }) {
      if (url) {
        const sourceUrls = sourceRecorder.get(e.id);
        if (sourceUrls) {
          sourceUrls.add(url);
        } else {
          sourceRecorder.set(e.id, new Set<string>().add(url));
        }
      }
    },
    feat: {
      getSourceUrls,
    },
  };
});

export function getSourceUrls(id: string) {
  return sourceRecorder.get(id);
}
