<template>
  <div
    class="modal fade"
    :class="{ show: isVisible }"
    tabindex="-1"
    aria-labelledby="moduleFormModalLabel"
    aria-hidden="true"
    style="display: block"
    v-if="isVisible"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="moduleFormModalLabel">
            {{ isEdit ? "Modifier le Module" : "Ajouter un Module" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveModule">
            <div class="mb-3">
              <label for="moduleName" class="form-label">Nom</label>
              <input
                type="text"
                id="moduleName"
                v-model="currentModule.name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="moduleDuration" class="form-label">Durée</label>
              <input
                type="text"
                id="moduleDuration"
                v-model="currentModule.duration"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="modulePrice" class="form-label">Prix</label>
              <input
                type="number"
                id="modulePrice"
                v-model="currentModule.price"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isEdit ? "Modifier" : "Ajouter" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isEdit: Boolean,
  currentModule: Object,
  isVisible: Boolean,
});

const emit = defineEmits(["saveModule", "closeModal"]);

const saveModule = () => {
  emit("saveModule", props.currentModule);
};

const closeModal = () => {
  emit("closeModal");
};
</script>
