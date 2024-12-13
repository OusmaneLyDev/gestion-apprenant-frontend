<template>
  <div
    class="modal fade"
    :class="{ show: isVisible }"
    tabindex="-1"
    aria-labelledby="moduleViewModalLabel"
    aria-hidden="true"
    style="display: block"
    v-if="isVisible"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="moduleViewModalLabel">
            Détails du Module
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="closeView"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>Nom : {{ module.name }}</h5>
          <p><strong>Durée:</strong> {{ module.duration }}</p>
          <p><strong>Prix:</strong> {{ module.price }} €</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeView">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  module: Object,
  isVisible: Boolean,
});

const emit = defineEmits(["closeView"]);

const closeView = () => {
  emit("closeView");
};
</script>
