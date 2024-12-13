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
            <router-link class="nav-link" to="/" exact-active-class="active">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/modules" exact-active-class="active">Modules</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Apprenants</a>
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
      <button class="btn btn-success" @click="openAddModal">Ajouter un Module</button>
    </div>

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Durée</th>
          <th scope="col">Prix</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, index) in modules" :key="module.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ module.name }}</td>
          <td>{{ module.duration }}</td>
          <td>{{ module.price }} €</td>
          <td>
            <button class="btn btn-outline-primary me-2" @click="viewModule(module)">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-outline-warning me-2" @click="openEditModal(module)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-outline-danger" @click="deleteModule(module.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="modules.length === 0" class="text-center text-muted">
      Aucun module disponible.
    </div>

    <div v-if="showModal" class="modal show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEdit ? "Modifier le Module" : "Ajouter un Module" }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveModule">
              <div class="mb-3">
                <label for="moduleName" class="form-label">Nom</label>
                <input type="text" id="moduleName" v-model="currentModule.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="moduleDuration" class="form-label">Durée</label>
                <input type="text" id="moduleDuration" v-model="currentModule.duration" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="modulePrice" class="form-label">Prix</label>
                <input type="number" id="modulePrice" v-model="currentModule.price" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">{{ isEdit ? "Modifier" : "Ajouter" }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useModuleStore } from '../../stores/moduleStore';

const moduleStore = useModuleStore();
const { modules, fetchModules, createModule, updateModule, deleteModule } = moduleStore;

const showModal = ref(false);
const isEdit = ref(false);
const currentModule = reactive({ id: null, name: '', duration: '', price: '' });

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

const closeModal = () => {
  showModal.value = false;
};

const saveModule = async () => {
  if (isEdit.value) {
    await updateModule(currentModule.id, currentModule);
  } else {
    await createModule(currentModule);
  }
  closeModal();
};

const resetCurrentModule = () => {
  currentModule.id = null;
  currentModule.name = '';
  currentModule.duration = '';
  currentModule.price = '';
};

onMounted(() => {
  fetchModules();
});

const viewModule = (module) => {
  console.log('Voir le module :', module);
};
</script>

<style scoped>
.module-list {
  max-width: 900px;
  margin: 0 auto;
}
</style>
