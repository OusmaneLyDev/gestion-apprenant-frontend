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
              >Students</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </header>

  <div class="module-list container mt-5">
    <h1 class="text-center mb-4">Liste des Modules</h1>

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openAddModal">
        Ajouter un Module
      </button>
    </div>

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Durée</th>
          <th scope="col">Prix</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module) in modules" :key="module.id">
          <td>{{ module.name }}</td>
          <td>{{ module.duration }}</td>
          <td>{{ module.price }} €</td>
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

    <ModuleForm
      v-if="showModal"
      :isEdit="isEdit"
      :currentModule="currentModule"
      :isVisible="showModal"
      @saveModule="saveModule"
      @closeModal="closeModal"
    />

    <ModuleView
      v-if="viewingModule"
      :module="viewingModule"
      :isVisible="viewingModule !== null"
      @closeView="closeView"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useModuleStore } from "../../stores/moduleStore";
import ModuleForm from "./ModuleForm.vue";
import ModuleView from "./ModuleView.vue";
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

const saveModule = async (module) => {
  // Fermer le modal immédiatement
  closeModal();

  // Effectuer l'ajout ou la modification après la fermeture du modal
  if (isEdit.value) {
    await updateModule(module.id, module);
    // Mettre à jour la liste localement après modification
    const index = modules.findIndex((m) => m.id === module.id);
    if (index !== -1) {
      modules[index] = module;
    }
  } else {
    const newModule = await createModule(module);
    modules.push(newModule); // Ajouter le module à la liste localement
  }
};

const resetCurrentModule = () => {
  currentModule.id = null;
  currentModule.name = "";
  currentModule.duration = "";
  currentModule.price = "";
};

// Fonction de confirmation pour supprimer un module avec SweetAlert
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
      // Mettre à jour la liste après la suppression
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
