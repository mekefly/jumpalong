<script lang="ts" setup>
import ButtonCloseVue from "../components/ButtonClose.vue";
import EllipsisVue from "../components/Ellipsis.vue";
import { unSub } from "../nostr/relay";
import { PublishRelayTask, rootTask, SubRelayTask } from "../nostr/relayTask";

const message = useMessage();

const _rootTask = reactive(rootTask);
const taskList = computed<Array<SubRelayTask | PublishRelayTask>>(
  () => _rootTask.children as any
);
</script>

<template>
  <n-space vertical>
    <n-table striped>
      <thead>
        <tr>
          <th>任物类型</th>
          <th>中继</th>
          <th>错误</th>
          <th>正常</th>
          <th>其他</th>
          <th>描述</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskList">
          <td>
            <n-tooltip trigger="hover">
              <template #trigger>
                <span>{{ task.type === "sub" ? "订阅" : "发布" }}</span>
              </template>
              向服务器发起请求
            </n-tooltip>
          </td>
          <td v-for="key in ['allRelays', 'errorRelays', 'normalRelays']">
            <n-tooltip trigger="hover">
              <template #trigger>
                <span>
                  {{ (task as any)[key].size }}
                </span>
              </template>

              <div v-if=" (task as any)[key].size > 0">
                <p v-for="item in (task as any)[key]">
                  {{ item }}
                </p>
              </div>
              <p v-else>没有</p>
            </n-tooltip>
          </td>
          <td>
            <div v-if="task.type === 'sub'">
              <n-tooltip
                trigger="hover"
                v-for="{ title, key } in [
                  { title: '完成', key: 'eoseRelays' },
                  { title: '事件', key: 'eventIds' },
                ]"
              >
                <template #trigger>
                  <span> {{ title }}({{ (task as any)[key].size }}) </span>
                </template>

                <div
                  class="max-h-72 overflow-auto"
                  v-if=" (task as any)[key].size > 0"
                >
                  <p v-for="item in (task as any)[key]">
                    {{ item }}
                  </p>
                </div>
                <p v-else>没有</p>
              </n-tooltip>
            </div>
            <div v-if="task.type === 'publish'">
              <n-tooltip
                trigger="hover"
                v-for="{ title, key } in [
                  { title: '完成', key: 'okRelasys' },
                  { title: '失败', key: 'failedRelasys' },
                ]"
              >
                <template #trigger>
                  <span> {{ title }}({{ (task as any)[key].size }}) </span>
                </template>

                <div
                  class="max-h-72 overflow-auto"
                  v-if=" (task as any)[key].size > 0"
                >
                  <p v-for="item in (task as any)[key]">
                    {{ item }}
                  </p>
                </div>
                <p v-else>没有</p>
              </n-tooltip>
            </div>
          </td>
          <td>
            <EllipsisVue>{{ task.describe }}</EllipsisVue>
          </td>
          <td>
            <ButtonCloseVue
              v-if="task.type === 'sub'"
              @click="
                () => {
                  unSub(task.subIds);
                  message.success('已经发布了停止订阅事件！');
                }
              "
            />
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>

<style scoped></style>
