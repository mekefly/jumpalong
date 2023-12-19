<script lang="ts" setup>
import i18n from "@/i18n";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { useThemeVars } from "naive-ui";

const MavonEditor = mavonEditor.mavonEditor;
const themeVars = useThemeVars();
</script>

<template>
  <MavonEditor
    class="md"
    :toolbarsBackground="themeVars.bodyColor"
    :previewBackground="themeVars.bodyColor"
    :editorBackground="themeVars.bodyColor"
    :language="i18n.global.locale"
    v-bind="$attrs"
  >
    <template v-if="$slots['right-toolbar-after']" #right-toolbar-after>
      <slot name="right-toolbar-after"></slot>
    </template>
  </MavonEditor>
</template>

<style scoped lang="scss">
.md {
  z-index: 0;
  background-color: v-bind("themeVars.bodyColor");
  color: v-bind("themeVars.textColor1");

  :deep(*) {
    .v-note-read-model {
      background-color: v-bind("themeVars.bodyColor");
      color: v-bind("themeVars.textColor1");
    }
    textarea,
    pre {
      background-color: v-bind("themeVars.bodyColor");
      color: v-bind("themeVars.textColor1");
    }
    pre div {
      background-color: v-bind("themeVars.cardColor");
      color: v-bind("themeVars.textColor1");
      border-radius: 10px;
    }
    td,
    tr {
      background-color: v-bind("themeVars.modalColor");
    }
  }
}
</style>
