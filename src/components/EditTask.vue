<template>
  <div class="text-center">
    <v-dialog v-model="updateTaskData.dialog" class="w-[600px]">
      <v-card>
        <div class="p-4">
          <div>
            <span class="pr-2">Title:</span>
            <input
              v-model="updateTaskData.task.title"
              placeholder="Title"
              class="border pl-2 rounded-md ml-[58px] py-1"
            />
          </div>
          <div class="flex items-center mt-5">
            <span>Description:</span>
            <textarea
              v-model="updateTaskData.task.description"
              placeholder="Description"
              class="border pl-2 rounded-md ml-4"
            ></textarea>
          </div>
          <div class="flex items-center mt-4">
            <span>Upload Files:</span>
            <v-file-input
              ref="file"
              v-model="updateTaskData.task.attachment"
              @change="uploadFile"
              @click:clear="removeAttachment"
              label="File input"
            ></v-file-input>
          </div>
          <div class="mt-2">
            <span>Select Date:</span>
            <input
              type="date"
              v-model="updateTaskData.task.estimatedTime"
              class="border ml-4 rounded py-1 px-1"
            />
          </div>
          <div class="flex space-x-2 items-center mt-4">
            <span>Select Board:</span>
            <v-autocomplete
              v-model="updateTaskData.task.board"
              label="Select Board"
              :items="['Pending', 'Processing', 'Done']"
            ></v-autocomplete>
          </div>
          <div class="flex justify-center"></div>
        </div>
        <div class="flex justify-center">
          <button
            @click="updateTask(updateData)"
            class="px-4 py-1 border rounded-md bg-emerald-300 font-semibold"
          >
            Update Task
          </button>
        </div>
        <v-card-actions>
          <v-btn color="primary" block @click="closeModal">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VDatePicker } from "vuetify/labs/VDatePicker";
import { reactive, ref, defineEmits } from "vue";
import { useAppStore } from "../store/app";
export default {
  components: {
    VDatePicker,
  },
  props: {
    updateData: Object,
    closeModal: Function,
  },
   emits :['closeModal'],
  setup({ updateData }, { emit }) {

    const store = useAppStore();
    const taskBoardData = reactive({
      pending: store.getPendingData,
      processing: store.getProcessingData,
      done: store.getDoneData,
    });
    const updateTaskData = reactive({
      file: ref(null),
      dialog: true,
      task: {
        title: updateData.title,
        description: updateData.description,
        attachment: updateData.attachment,
        estimatedTime: updateData.estimatedTime,
        board: updateData.board,
      },
    });
    const uploadFile = (event) => {
      updateData.attachment.push(event.target.files[0]);
    };
    const removeAttachment = () => {
      updateTaskData.task.attachment = null;
    };
    const updateTask = (ele) => {
      const newData = {};
      Object.keys(taskBoardData).forEach((key) => {
        newData[key] = taskBoardData[key].filter((item) => isEqual(item, ele));
      });
      function isEqual(objA, objB) {
        if (JSON.stringify(objA) === JSON.stringify(objB)) {
          return (
            (objA.attachment = updateTaskData.task.attachment),
            (objA.board = updateTaskData.task.board),
            (objA.description = updateTaskData.task.description),
            (objA.estimatedTime = updateTaskData.task.estimatedTime),
            (objA.title = updateTaskData.task.title)
          );
        }
      }
      store.updatePendingData(newData.pending);
      store.updateProcessingData(newData.processing);
      store.updateDoneData(newData.done);
      emit('closeModal')
    };
    const closeModal = ()=>{
      emit('closeModal')
    }
    return {
      emit,
      closeModal,
      updateTaskData,
      store,
      taskBoardData,
      updateTask,
      uploadFile,
      removeAttachment,
    };
  },
};
</script>
