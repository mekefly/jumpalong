import type { CardData } from "@/api/dataBase";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useHistory = defineStore("history", () => {
  const historyList = useLocalStorage("history", ref<CardData[]>([])) as Ref<
    CardData[]
  >;
  return {
    historyList,
    pushHistory(v: CardData) {
      const i = historyList.value.map((item) => item.name).indexOf(v.name);
      if (i !== -1) {
        return;
      }
      historyList.value.push(v);
    },
  };
});
