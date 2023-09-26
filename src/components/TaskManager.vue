<template>
  <div class="mx-2">
    <div class="py-3 px-2 mt-10 border bg-white rounded-md">
      <p class="text-center text-lg font-bold pb-1">Progress</p>
      <v-progress-linear
        v-model="store.progressBar"
        v-bind:model-value="store.progressBar * 100"
        color="green-accent-3"
        height="20"
      >
        <template v-slot:default="{ value }">
          <strong
            >{{ Math.ceil(value) || 0 }}% Done({{
              doneData + " out of " + store.totalTask
            }})</strong
          >
        </template>
      </v-progress-linear>
    </div>
    <div class="flex justify-end py-4">
      <div class="flex space-x-4">
        <v-btn color="primary"> Filter </v-btn>
        <AddTask />
      </div>
    </div>
    <TaskBoard/>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskBoard from "./TaskBoards.vue";
import AddTask from "./AddTask.vue";
import { ref, watch, computed, onMounted } from "vue";
import { useAppStore } from "../store/app";
export default {
  components: {
    draggable: VueDraggableNext,
    TaskBoard,
    AddTask,
  },
  setup() {
    const store = useAppStore();
    const doneData = computed(() => {
      return store.done.length;
    });
    return { store, doneData };
  },
};
</script>
