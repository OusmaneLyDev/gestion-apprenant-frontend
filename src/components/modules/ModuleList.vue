<template>
  <header class="header navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Gestion Apprenants</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active"
              >Accueil</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/modules"
              exact-active-class="active"
              >Modules</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/students"
              exact-active-class="active"
              >Apprenents</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/registrations"
              exact-active-class="active"
              >Inscriptions</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </header>

  <div class="container mt-5">
    <h1 class="text-center mb-4">Liste des Modules</h1>

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openAddModal">
        Ajouter un Module
      </button>
    </div>

    <table class="table table-striped table-bordered mt-4">
      <thead class="table-dark">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Durée</th>
          <th scope="col">Prix</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in moduleStore.modules" :key="module.id">
          <td>{{ module.name }}</td>
          <td>{{ module.duration }}</td>
          <td>{{ module.price }} Mru</td>
          <td>
            <button
              class="btn btn-outline-primary me-2"
              @click="viewModule(module)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-outline-warning me-2"
              @click="openEditModal(module)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-outline-danger"
              @click="confirmDelete(module.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="modules.length === 0" class="text-center text-muted">
      Aucun module disponible.
    </div>

    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      aria-labelledby="moduleFormModalLabel"
      aria-hidden="true"
      style="display: block"
      v-if="showModal"
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

    <div
      class="modal fade"
      :class="{ show: viewingModule !== null }"
      tabindex="-1"
      aria-labelledby="moduleViewModalLabel"
      aria-hidden="true"
      style="display: block"
      v-if="viewingModule"
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
            <h5>Nom : {{ viewingModule.name }}</h5>
            <p><strong>Durée:</strong> {{ viewingModule.duration }}</p>
            <p><strong>Prix:</strong> {{ viewingModule.price }} €</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeView">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useModuleStore } from "../../stores/moduleStore";
import Swal from "sweetalert2";

const moduleStore = useModuleStore();
const { modules, fetchModules, createModule, updateModule, deleteModule } =
  moduleStore;

const showModal = ref(false);
const isEdit = ref(false);
const currentModule = reactive({ id: null, name: "", duration: "", price: "" });
const viewingModule = ref(null);

const openAddModal = () => {
  resetCurrentModule();
  isEdit.value = false;
  showModal.value = true;
};

const openEditModal = (module) => {
  Object.assign(currentModule, module);
  isEdit.value = true;
  showModal.value = true;
};

const viewModule = (module) => {
  viewingModule.value = module;
};

const closeView = () => {
  viewingModule.value = null;
};

const closeModal = () => {
  showModal.value = false;
};

const saveModule = async () => {
  // Fermer la modal
  closeModal();

  // Valider la durée
  const dateTest = new Date(currentModule.duration);
  if (isNaN(dateTest.getTime())) {
    // Si la date n'est pas valide, essayer de la reformater
    const reformattedDate = new Date(
      currentModule.duration.split("/").reverse().join("-")
    );
    if (isNaN(reformattedDate.getTime())) {
      Swal.fire("Erreur", "Le format de la durée est invalide.", "error");
      return;
    }
    currentModule.duration = reformattedDate.toISOString().split("T")[0]; // Convertir en format ISO
  }

  // Appel backend
  if (isEdit.value) {
    await updateModule(currentModule.id, currentModule);
    const index = modules.findIndex((m) => m.id === currentModule.id);
    if (index !== -1) {
      modules[index] = { ...currentModule };
    }
  } else {
    const newModule = await createModule(currentModule);
    modules.push(newModule);
  }
};

const resetCurrentModule = () => {
  currentModule.id = null;
  currentModule.name = "";
  currentModule.duration = "";
  currentModule.price = "";
};

const confirmDelete = (moduleId) => {
  Swal.fire({
    title: "Êtes-vous sûr?",
    text: "Vous ne pourrez pas revenir en arrière après avoir supprimé ce module!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, supprimer!",
    cancelButtonText: "Annuler",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteModule(moduleId);
      Swal.fire(
        "Supprimé!",
        "Le module a été supprimé avec succès.",
        "success"
      );
      const index = modules.findIndex((m) => m.id === moduleId);
      if (index !== -1) {
        modules.splice(index, 1);
      }
    }
  });
};

onMounted(() => {
  fetchModules();
});
</script>

<style scoped>
.module-list {
  max-width: 900px;
  margin: 0 auto;
}
</style>
