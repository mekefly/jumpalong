<script lang="ts" setup>
import { t } from "@/i18n";
import { prettifyStringify } from "@/utils/utils";
import { NInput, NInputNumber, TreeOption } from "naive-ui";
import JSONTreeEditLavel from "./JSONTreeEditLavel.vue";
const props = defineProps<{
  data: object;
}>();
const emit = defineEmits<{
  (e: "change"): void;
}>();
const { data } = toRefs(props);

const dataOptions = computed<TreeOption[]>(() => {
  return createData(data.value);
});

function createData(data: any[] | object, route: string[] = []): TreeOption[] {
  if (Array.isArray(data)) {
    return data.map((value, index) => {
      const newRoute = [...route, String(index)];
      if (typeof value === "object" || Array.isArray(value)) {
        return {
          key: newRoute.join("."),
          prefix: () => renderPrefix(index.toString()),
          children: createData(value, [...route, String(index)]),
          value: value,
          onUpdateValue: (value: any) => {
            (data as any)[index] = value;
            emit("change");
          },
        } as TreeOption;
      } else {
        return {
          key: newRoute.join("."),
          prefix: () => renderPrefix(index.toString(), index.toString()),
          value: value,
          onUpdateValue: (value: any) => {
            (data as any)[index] = value;
            emit("change");
          },
        } as TreeOption;
      }
    });
  } else if (typeof data === "object") {
    return Object.entries(data).map(([key, value]) => {
      const newRoute = [...route, key];
      if (typeof value === "object" || Array.isArray(value)) {
        return {
          key: newRoute.join("."),
          prefix: () => renderPrefix(key, `${t(key)}`),
          children: createData(value, newRoute),
          value: value,
          onUpdateValue: (value: any) => {
            (data as any)[key] = value;
            emit("change");
          },
        } as TreeOption;
      } else {
        return {
          key: newRoute.join("."),
          prefix: () => renderPrefix(key, `${t(key)}`),
          value: value,
          onUpdateValue: (value: any) => {
            (data as any)[key] = value;
            emit("change");
          },
        } as TreeOption;
      }
    });
  } else {
    return [];
  }
}

//这里展示的是key和key的当前语言
function renderPrefix(key: string, value?: string) {
  return h(JSONTreeEditLavel, { k: key, v: value });
}
function renderSuffix({ option }: { option: TreeOption }) {
  if (typeof option.value === "string") {
    return h(
      NInput,
      {
        value: option.value,
        onUpdateValue: option.onUpdateValue as any,
        type: "textarea",
        rows: 1,
      },
      {}
    );
  } else if (typeof option.value === "number") {
    return h(
      NInputNumber,
      {
        value: option.value,
        onUpdateValue: option.onUpdateValue as any,
        rows: 1,
      },
      {}
    );
  } else if (typeof option.value === "object") {
    return h(
      NInput,
      {
        value: prettifyStringify(option.value),
        onUpdateValue: (v) => {
          (option as any).onUpdateValue?.(JSON.parse(v));
        },
        type: "textarea",
        rows: 1,
      },
      {}
    );
  }
}
</script>

<template>
  <n-tree
    class="tree"
    block-line
    :data="dataOptions"
    expand-on-click
    selectable
    :renderSuffix="renderSuffix"
  />
</template>

<style scoped lang="scss">
.tree {
  :deep(.n-tree-node-content) {
    display: flex;
  }
  :deep(.n-tree-node-content__prefix) {
    word-wrap: break-word;
    word-break: break-all;
    flex-shrink: 1;
  }
  :deep(.n-tree-node-content__text) {
    word-wrap: break-word;
    word-break: break-all;
    flex-shrink: 1;
  }

  :deep(.n-tree-node-content__suffix) {
    flex-shrink: 1;
    flex-grow: 0;
  }
}
</style>
