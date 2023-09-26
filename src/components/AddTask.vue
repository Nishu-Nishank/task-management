<template>
  <div class="text-center">
    <v-btn color="primary" @click="addTaskData.dialog = true">
      Create Task
    </v-btn>
    <v-dialog v-model="addTaskData.dialog" class="w-[600px]">
      <v-card>
        <div class="p-4">
          <div>
            <span class="pr-2">Title:</span>
            <input
              v-model="addTaskData.task.title"
              placeholder="Title"
              class="border pl-2 rounded-md ml-[58px] py-1"
            />
          </div>
          <div class="flex items-center mt-5">
            <span>Description:</span>
            <textarea
              v-model="addTaskData.task.description"
              placeholder="Description"
              class="border pl-2 rounded-md ml-4"
            ></textarea>
          </div>
          <div class="flex items-center mt-4">
            <span>Upload Files:</span>
            <v-file-input
              ref="file"
              @change="uploadFile"
              @click:clear="removeAttachment"
              label="File input"
            ></v-file-input>
          </div>
          <div class="mt-2">
            <span>Select Date:</span>
            <input
              type="date"
              v-model="addTaskData.task.estimatedTime"
              class="border ml-4 rounded py-1 px-1"
            />
          </div>
          <div class="flex space-x-2 items-center mt-4">
            <span>Select Board:</span>
            <v-autocomplete
              v-model="addTaskData.task.board"
              label="Select Board"
              :items="['Pending', 'Processing', 'Done']"
            ></v-autocomplete>
          </div>
          <div class="flex justify-center"></div>
        </div>
        <div class="flex justify-center">
          <button
            @click="createTask"
            class="px-4 py-1 border rounded-md bg-emerald-300 font-semibold"
          >
            Create Task
          </button>
        </div>
        <v-card-actions>
          <v-btn color="primary" block @click="addTaskData.dialog = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VDatePicker } from "vuetify/labs/VDatePicker";
import { reactive, ref } from "vue";
import { useAppStore } from "../store/app";
export default {
  components: {
    VDatePicker,
  },
  setup() {
    const store = useAppStore();
    const addTaskData = reactive({
      file: ref(null),
      dialog: false,
      task: {
        title: "",
        description: "",
        attachment: [],
        estimatedTime: "",
        board: "",
        labels: [],
      },
      newLabel: "",
    });
    const uploadFile = (event) => {
      addTaskData.task.attachment.push(event.target.files[0]);
    };
    const deleteAttachment = () => {
      addTaskData.task.attachment = [];
    };
    const removeAttachment = () => {
      addTaskData.task.attachment = null;
    };
    const createTask = () => {
      if (addTaskData.task.board === "Pending") {
        store.createPendingData(addTaskData.task);
      } else if (addTaskData.task.board === "Processing") {
        store.createProcessingData(addTaskData.task);
      } else if (addTaskData.task.board === "Done") {
        store.createDoneData(addTaskData.task);
      }
      addTaskData.task = {
        title: "",
        description: "",
        attachment: [],
        estimatedTime: "",
        board: "",
        labels: [],
      };
      addTaskData.dialog = false;
    };
    return {
      addTaskData,
      store,
      uploadFile,
      removeAttachment,
      deleteAttachment,
      createTask,
    };
  },
};
</script>
