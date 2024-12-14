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

  <div class="registration-list container mt-5">
    <h1 class="text-center mb-4">Liste des Inscriptions</h1>

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openAddModal">
        Ajouter une Inscription
      </button>
    </div>

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Nom de l'Apprenant</th>
          <th scope="col">Module</th>
          <th scope="col">Date d'Inscription</th>
          <th scope="col">Date de Début</th>
          <th scope="col">Date de Fin</th>
          <th scope="col">Prix</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registration in registrations" :key="registration.id">
          <td>{{ getStudentName(registration.studentId) }}</td>
          <td>{{ registration.module.name }}</td>
          <td>{{ formatDate(registration.registrationDate) }}</td>
          <td>{{ formatDate(registration.startDate) }}</td>
          <td>{{ formatDate(registration.endDate) }}</td>
          <td>{{ registration.amount }} €</td>
          <td>
            <!-- Bouton Modifier -->
            <button
              class="btn btn-outline-warning me-2"
              @click="openEditModal(registration)"
            >
              <i class="fas fa-edit"></i>
            </button>

            <!-- Bouton Voir -->
            <button
              class="btn btn-outline-info me-2"
              @click="openViewModal(registration)"
            >
              <i class="fas fa-eye"></i>
            </button>

            <!-- Bouton Supprimer -->
            <button
              class="btn btn-outline-danger"
              @click="confirmDelete(registration.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="registrations.length === 0" class="text-center text-muted">
      Aucune inscription disponible.
    </div>

    <!-- Modal Form -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      aria-labelledby="registrationFormModalLabel"
      aria-hidden="true"
      style="display: block"
      v-if="showModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registrationFormModalLabel">
              {{ " Ajouter une Inscription " }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveRegistration">
              <div class="mb-3">
                <label for="studentName" class="form-label"
                  >Nom de l'Apprenant</label
                >
                <select
                  id="studentName"
                  v-model="currentRegistration.studentId"
                  class="form-select"
                  required
                >
                  <option
                    v-for="student in students"
                    :key="student.id"
                    :value="student.id"
                  >
                    {{ student.fullName }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="moduleName" class="form-label">Module</label>
                <select
                  id="moduleName"
                  v-model="currentRegistration.moduleId"
                  class="form-select"
                  required
                >
                  <option
                    v-for="module in modules"
                    :key="module.id"
                    :value="module.id"
                  >
                    {{ module.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="registrationDate" class="form-label"
                  >Date d'Inscription</label
                >
                <input
                  type="date"
                  id="registrationDate"
                  v-model="currentRegistration.registrationDate"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="startDate" class="form-label">Date de Début</label>
                <input
                  type="date"
                  id="startDate"
                  v-model="currentRegistration.startDate"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">Date de Fin</label>
                <input
                  type="date"
                  id="endDate"
                  v-model="currentRegistration.endDate"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="amount" class="form-label">Prix (€)</label>
                <input
                  type="number"
                  id="amount"
                  v-model="currentRegistration.amount"
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

    <!-- Modal Voir les Détails -->
    <div
      class="modal fade"
      :class="{ show: showDetailsModal }"
      tabindex="-1"
      aria-labelledby="registrationDetailsModalLabel"
      aria-hidden="true"
      style="display: block"
      v-if="showDetailsModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registrationDetailsModalLabel">
              Détails de l'Inscription
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeDetailsModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              <strong>Nom de l'Apprenant:</strong>
              {{ currentRegistration.studentName }}
            </p>
            <p><strong>Module:</strong> {{ currentRegistration.moduleName }}</p>
            <p>
              <strong>Date d'Inscription:</strong>
              {{ formatDate(currentRegistration.registrationDate) }}
            </p>
            <p>
              <strong>Date de Début:</strong>
              {{ formatDate(currentRegistration.startDate) }}
            </p>
            <p>
              <strong>Date de Fin:</strong>
              {{ formatDate(currentRegistration.endDate) }}
            </p>
            <p><strong>Prix:</strong> {{ currentRegistration.amount }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRegistrationStore } from "../../stores/registrationStore";
import { useModuleStore } from "../../stores/moduleStore";
import { useStudentStore } from "../../stores/studentStore";

const registrationStore = useRegistrationStore();
const moduleStore = useModuleStore();
const studentStore = useStudentStore();

const {
  registrations,
  fetchRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration,
} = registrationStore;
const { modules, fetchModules } = moduleStore;
const { students, fetchStudents } = studentStore;

const showModal = ref(false);
const showDetailsModal = ref(false); // Modal pour afficher les détails
const isEdit = ref(false);
const currentRegistration = reactive({
  id: null,
  studentId: null,
  moduleId: null,
  registrationDate: "",
  startDate: "",
  endDate: "",
  amount: 0,
  studentName: "", // Ajout de studentName et moduleName pour l'affichage dans le modal
  moduleName: "",
});

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR");
};

const openAddModal = () => {
  currentRegistration.id = null;
  currentRegistration.studentId = null;
  currentRegistration.moduleId = null;
  currentRegistration.registrationDate = "";
  currentRegistration.startDate = "";
  currentRegistration.endDate = "";
  currentRegistration.amount = 0;
  isEdit.value = false;
  showModal.value = true;
};

const openEditModal = (registration) => {
  currentRegistration.id = registration.id;
  currentRegistration.studentId = registration.studentId;
  currentRegistration.moduleId = registration.moduleId;
  currentRegistration.registrationDate = registration.registrationDate;
  currentRegistration.startDate = registration.startDate;
  currentRegistration.endDate = registration.endDate;
  currentRegistration.amount = registration.amount;
  isEdit.value = true;
  showModal.value = true;
};

const openViewModal = (registration) => {
  currentRegistration.id = registration.id;
  currentRegistration.studentId = registration.studentId;
  currentRegistration.moduleId = registration.moduleId;
  currentRegistration.registrationDate = registration.registrationDate;
  currentRegistration.startDate = registration.startDate;
  currentRegistration.endDate = registration.endDate;
  currentRegistration.amount = registration.amount;
  currentRegistration.studentName = getStudentName(registration.studentId);
  currentRegistration.moduleName = registration.module.name;
  showDetailsModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
};

const saveRegistration = async () => {
  if (isEdit.value) {
    await updateRegistration(currentRegistration);
  } else {
    await createRegistration(currentRegistration);
  }
  closeModal();
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Cette inscription sera définitivement supprimée !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, Supprimer",
    cancelButtonText: "Annuler",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteRegistration(id);
      Swal.fire("Supprimé !", "L'inscription a été supprimée.", "success");
    }
  });
};

const getStudentName = (studentId) => {
  const student = students.find((student) => student.id === studentId);
  return student ? student.fullName : "";
};

onMounted(() => {
  fetchRegistrations();
  fetchModules();
  fetchStudents();
});
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
