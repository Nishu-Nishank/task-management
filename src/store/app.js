import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    pending: [],
    processing: [],
    done: [],
    progressBar: 0,
    totalTask: 0,
  }),
  getters: {
    getPendingData: (state) => state.pending,
    getProcessingData: (state) => state.processing,
    getDoneData: (state) => state.done,
  },
  actions: {
    createPendingData(data) {
      this.pending.push(data);
    },
    createProcessingData(data) {
      this.processing.push(data);
    },
    createDoneData(data) {
      this.done.push(data);
    },
    updatePendingData(data) {
      this.pending = data;
    },
    updateProcessingData(data) {
      this.processing = data;
    },
    updateDoneData(data) {
      this.done = data;
    },
    updateTaskBar(data) {
      this.progressBar = data;
    },
    totalTaskMethod(data) {
      this.totalTask = data;
    },
  },
});
