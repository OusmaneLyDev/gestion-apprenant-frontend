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
          <li class="nav-item">
              <router-link
                class="nav-link"
                to="/payments"
                exact-active-class="active"
                >Payements</router-link
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

    <table class="table table-striped table-bordered mt-4">
      <thead class="table-dark">
        <tr>
          <th scope="col">Nom de l'Apprenant</th>
          <th scope="col">Module</th>
          <th scope="col">Durée (jours)</th>
          <!-- Added duration column -->
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
          <td>{{ registration.module.duration }} jours</td>
          <!-- Display module duration -->
          <td>{{ formatDate(registration.dateRegister) }}</td>
          <td>{{ formatDate(registration.startDate) }}</td>
          <td>{{ formatDate(registration.endDate) }}</td>
          <td>{{ registration.amount }} €</td>
          <td>
            <button
              class="btn btn-outline-warning me-2"
              @click="openEditModal(registration)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-outline-info me-2"
              @click="openViewModal(registration)"
            >
              <i class="fas fa-eye"></i>
            </button>
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
              {{ "Modifier l'Inscription" }}
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
              <div class="mb-3">
                <label for="moduleDuration" class="form-label"
                  >Durée du Module (jours)</label
                >
                <input
                  type="number"
                  id="moduleDuration"
                  v-model="currentRegistration.moduleDuration"
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
const showDetailsModal = ref(false);
const isEdit = ref(false);
const currentRegistration = reactive({
  id: null,
  studentId: null,
  moduleId: null,
  registrationDate: "",
  startDate: "",
  endDate: "",
  amount: 0,
  moduleDuration: 0, // Adding moduleDuration here
  studentName: "",
  moduleName: "",
});

// Fetch data when component is mounted
onMounted(() => {
  fetchRegistrations();
  fetchModules();
  fetchStudents();
});

// Save the registration (add/edit)
const saveRegistration = async () => {
  if (isEdit.value) {
    if (!currentRegistration.id) {
      console.error("L'ID de l'inscription est manquant !");
      return;
    }
    await updateRegistration(currentRegistration.id, currentRegistration);
  } else {
    // Add moduleDuration in case of new registration
    currentRegistration.moduleDuration = modules.find(
      (module) => module.id === currentRegistration.moduleId
    )?.duration;
    await createRegistration(currentRegistration);
  }
  closeModal();
};

// Open the modal for adding registration
const openAddModal = () => {
  isEdit.value = false;
  currentRegistration.id = null;
  currentRegistration.studentId = null;
  currentRegistration.moduleId = null;
  currentRegistration.registrationDate = "";
  currentRegistration.startDate = "";
  currentRegistration.endDate = "";
  currentRegistration.amount = 0;
  currentRegistration.moduleDuration = 0;
  showModal.value = true;
};

// Open the modal for editing registration
const openEditModal = (registration) => {
  isEdit.value = true;
  currentRegistration.id = registration.id;
  currentRegistration.studentId = registration.studentId;
  currentRegistration.moduleId = registration.moduleId;
  currentRegistration.registrationDate = registration.registrationDate;
  currentRegistration.startDate = registration.startDate;
  currentRegistration.endDate = registration.endDate;
  currentRegistration.amount = registration.amount;
  currentRegistration.moduleDuration = registration.module.duration; // Set duration
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR");
};

// Confirm deletion
const confirmDelete = async (registrationId) => {
  const result = await Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Cette inscription sera supprimée définitivement.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, supprimer",
    cancelButtonText: "Annuler",
  });
  if (result.isConfirmed) {
    await deleteRegistration(registrationId);
  }
};

// Open details modal
const openViewModal = (registration) => {
  currentRegistration.studentName = getStudentName(registration.studentId);
  currentRegistration.moduleName = registration.module.name;
  currentRegistration.registrationDate = registration.dateRegister;
  currentRegistration.startDate = registration.startDate;
  currentRegistration.endDate = registration.endDate;
  currentRegistration.amount = registration.amount;
  showDetailsModal.value = true;
};

// Get student name by ID
const getStudentName = (studentId) => {
  const student = students.find((s) => s.id === studentId);
  return student ? student.fullName : "Inconnu";
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
