<template>
  <div class="flex space-x-20 w-full">
    <div class="p-4 border bg-white w-1/3 rounded-md">
      <p class="text-center font-bold pb-2">
        Pending({{ pendingTask + "/" + totalTaskData }})({{
          Math.ceil((pendingTask / totalTaskData) * 100) || 0
        }}%)
      </p>
      <draggable
        v-model="taskBoardData.pending"
        group="people"
        class="max-w-full max-h-full"
        @start="drag = true"
        @end="drag = false"
        @change="changeBoard"
      >
        <div
          v-for="element in taskBoardData.pending"
          :key="element.title"
          class="py-2 cursor-move"
        >
          <TaskContent
            :element="element"
            :deleteItem="deleteItem"
            color="bg-pink-100"
          />
        </div>
      </draggable>
    </div>
    <div class="p-2 border bg-white w-1/3 rounded-md">
      <p class="text-center font-bold pb-2">
        Processing({{ processingTask + "/" + totalTaskData }})({{
          Math.ceil((processingTask / totalTaskData) * 100) || 0
        }}%)
      </p>
      <draggable
        v-model="taskBoardData.processing"
        group="people"
        class="max-w-full max-h-full"
        @start="drag = true"
        @end="drag = false"
        @change="changeBoard"
      >
        <div
          v-for="element in taskBoardData.processing"
          :key="element.title"
          class="py-2 cursor-move"
        >
          <TaskContent
            :deleteItem="deleteItem"
            :element="element"
            color="bg-blue-100"
          />
        </div>
      </draggable>
    </div>
    <div class="p-2 border bg-white w-1/3 rounded-md">
      <p class="text-center font-bold pb-2">
        Done({{ taskDone + "/" + totalTaskData }})({{
          Math.ceil((taskDone / totalTaskData) * 100) || 0
        }}%)
      </p>
      <draggable
        v-model="taskBoardData.done"
        group="people"
        class="max-w-full max-h-full"
        @start="drag = true"
        @end="drag = false"
        @change="changeBoard"
      >
        <div
          v-for="element in taskBoardData.done"
          :key="element.title"
          class="py-2 cursor-move"
        >
          <TaskContent
            :deleteItem="deleteItem"
            :element="element"
            color="bg-green-100"
          />
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskContent from "./TaskContent.vue";
import { reactive, computed, watch, ref } from "vue";
import { useAppStore } from "../store/app";
export default {
  components: {
    draggable: VueDraggableNext,
    TaskContent,
  },
  setup() {
    const store = useAppStore();
    const taskBoardData = reactive({
      pending: store.getPendingData,
      processing: store.getProcessingData,
      done: store.getDoneData,
    });
    const totalTask = ref(null);

    const changeBoard = (event) => {
      store.updatePendingData(taskBoardData.pending);
      store.updateProcessingData(taskBoardData.processing);
      store.updateDoneData(taskBoardData.done);
    };

    const deleteItem = (ele) => {
      const newData = {};
      Object.keys(taskBoardData).forEach((key) => {
        newData[key] = taskBoardData[key].filter((item) => !isEqual(item, ele));
      });
      function isEqual(objA, objB) {
        return JSON.stringify(objA) === JSON.stringify(objB);
      }
      store.updatePendingData(newData.pending);
      store.updateProcessingData(newData.processing);
      store.updateDoneData(newData.done);
      refreshData();
    };
    const refreshData = () => {
      taskBoardData.pending = store.getPendingData;
      taskBoardData.processing = store.getProcessingData;
      taskBoardData.done = store.getDoneData;
    };
    const totalTaskData = computed(() => {
      totalTask.value =
        taskBoardData.pending.length +
        taskBoardData.processing.length +
        taskBoardData.done.length;
      store.totalTaskMethod(totalTask.value);
      return totalTask.value;
    });
    const pendingTask = computed(() => {
      return taskBoardData.pending.length;
    });
    const processingTask = computed(() => {
      return taskBoardData.processing.length;
    });
    const taskDone = computed(() => {
      return taskBoardData.done.length;
    });
    watch(
      taskBoardData,
      () => {
        store.updateTaskBar(taskBoardData.done.length / totalTask.value);
      },
      { deep: true }
    );
    return {
      taskBoardData,
      store,
      totalTask,
      refreshData,
      deleteItem,
      changeBoard,
      totalTaskData,
      pendingTask,
      processingTask,
      taskDone,
    };
  },
};
</script>
