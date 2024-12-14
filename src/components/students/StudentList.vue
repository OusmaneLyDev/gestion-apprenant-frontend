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
    <h1 class="text-center">Liste des étudiants</h1>
    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openModal('add')">
      Ajouter un étudiant
    </button>
    </div>
    <div v-if="studentStore.loading" class="alert alert-info">
      Chargement...
    </div>
    <div v-if="studentStore.error" class="alert alert-danger">
      {{ studentStore.error }}
    </div>

    <table class="table table-striped table-bordered mt-4">
      <thead class="table-dark">
        <tr>
          <th>Nom complet</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Adresse</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in studentStore.students" :key="student.id">
          <td>{{ student.fullName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phoneNumber }}</td>
          <td>{{ student.address }}</td>
          <td>
            <button
              class="btn btn-outline-primary me-2"
              @click="showDetails(student)"
            >
            <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-outline-warning me-2"
              @click="openModal('update', student)"
            >
            <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-outline-danger"
              @click="confirmDelete(student.id)"
            >
            <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal pour Ajouter/Mise à jour -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      id="studentModal"
      tabindex="-1"
      aria-labelledby="studentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="studentModalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="fullName" class="form-label">Nom complet</label>
                <input
                  v-model="formStudent.fullName"
                  type="text"
                  class="form-control"
                  id="fullName"
                />
              </div>
              <div class="mb-3">
                <label for="phoneNumber" class="form-label"
                  >Numéro de téléphone</label
                >
                <input
                  v-model="formStudent.phoneNumber"
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="formStudent.email"
                  type="email"
                  class="form-control"
                  id="email"
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Adresse</label>
                <input
                  v-model="formStudent.address"
                  type="text"
                  class="form-control"
                  id="address"
                />
              </div>
              <div class="mb-3">
                <label for="tutor" class="form-label">Tuteur</label>
                <input
                  v-model="formStudent.tutor"
                  type="text"
                  class="form-control"
                  id="tutor"
                />
              </div>
              <div class="form-check">
                <input
                  v-model="formStudent.status"
                  class="form-check-input"
                  type="checkbox"
                  id="status"
                />
                <label class="form-check-label" for="status">Actif</label>
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                {{ modalButton }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation pour suppression -->
    <div
      v-if="showDeleteModal"
      class="modal fade show d-block"
      id="deleteConfirmModal"
      tabindex="-1"
      aria-labelledby="deleteConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmModalLabel">
              Confirmation de suppression
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeDeleteModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Voulez-vous vraiment supprimer cet étudiant ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeDeleteModal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteStudent(confirmedStudentId)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from "../../stores/studentStore";
import { ref } from "vue";
const studentStore = useStudentStore();
const modalMode = ref("add"); // Mode : 'add' ou 'update'
const modalTitle = ref("Ajouter un étudiant");
const modalButton = ref("Ajouter");
const formStudent = ref({
  fullName: "",
  phoneNumber: "",
  email: "",
  address: "",
  tutor: "",
  status: false,
});
const confirmedStudentId = ref(null);
const showModal = ref(false);
const showDeleteModal = ref(false);

// Charger les étudiants au montage du composant
studentStore.fetchStudents();

// Ouvrir le modal pour ajouter ou modifier un étudiant
const openModal = (mode, student = null) => {
  modalMode.value = mode;
  modalTitle.value =
    mode === "add" ? "Ajouter un étudiant" : "Modifier un étudiant";
  modalButton.value = mode === "add" ? "Ajouter" : "Modifier";
  formStudent.value = student
    ? { ...student }
    : {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        tutor: "",
        status: false,
      };
  showModal.value = true;
};

// Fermer le modal
const closeModal = () => {
  showModal.value = false;
};

// Ajouter ou mettre à jour un étudiant
const handleSubmit = async () => {
  if (modalMode.value === "add") {
    await studentStore.addStudent(formStudent.value);
  } else {
    await studentStore.updateStudent(formStudent.value.id, formStudent.value);
  }
  formStudent.value = {
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tutor: "",
    status: false,
  };
  closeModal();
};

// Afficher la confirmation pour la suppression
const confirmDelete = (id) => {
  confirmedStudentId.value = id;
  showDeleteModal.value = true;
};

// Fermer le modal de suppression
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Supprimer un étudiant
const deleteStudent = async (id) => {
  await studentStore.deleteStudent(id);
  closeDeleteModal();
};
</script>
