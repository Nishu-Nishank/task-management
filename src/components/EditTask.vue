<template>
  <div class="text-center">
    <v-dialog v-model="updateTaskData.dialog" class="w-[600px]">
      <v-card>
        <div class="p-4">
          <div>
            <span class="pr-2">Title:</span>
            <input
              v-model="updateData.title"
              placeholder="Title"
              class="border pl-2 rounded-md ml-[58px] py-1"
            />
          </div>
          <div class="flex items-center mt-5">
            <span>Description:</span>
            <textarea
              v-model="updateData.description"
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
              v-model="updateData.estimatedTime"
              class="border ml-4 rounded py-1 px-1"
            />
          </div>
          <div class="flex space-x-2 items-center mt-4">
            <span>Select Board:</span>
            <v-autocomplete
              v-model="updateData.board"
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
import { reactive, ref } from "vue";
import { useAppStore } from "../store/app";
export default {
  components: {
    VDatePicker,
  },
  props: {
    updateData: Object,
    closeModal: Function,
  },
  setup() {
    const store = useAppStore();
    const updateTaskData = reactive({
      file: ref(null),
      dialog: true,
      task: {
        pending: store.getPendingData,
        processing: store.getProcessingData,
        done: store.getDoneData,
      },
    });
    const uploadFile = (event) => {
        updateData.attachment.push(event.target.files[0]);
    };
    const deleteAttachment = () => {
      updateTaskData.task.attachment = [];
    };
    const removeAttachment = () => {
      updateTaskData.task.attachment = null;
    };
    const createTask = () => {

    };
    return {
      updateTaskData,
      store,
      uploadFile,
      removeAttachment,
      deleteAttachment,
      createTask,
    };
  },
};
</script>
