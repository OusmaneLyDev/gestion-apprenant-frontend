<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Liste des Paiements</h1>

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openAddModal">
        Ajouter un Paiement
      </button>
    </div>

    <table class="table table-striped table-bordered mt-4">
      <thead class="table-dark">
        <tr>
          <th scope="col">Payeur</th>
          <th scope="col">Module</th>
          <th scope="col">Montant</th>
          <th scope="col">Mode de Paiement</th>
          <th scope="col">Date de payement</th>
          <th scope="col">Tel du payeur</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in paymentStore.payments" :key="payment.id">
          <td>{{ payment.payer }}</td>
          <td>{{ getModuleName(payment.moduleId) }}</td>
          <td>{{ payment.amount }} Mru</td>
          <td>{{ payment.paymentMode }}</td>
          <td>{{ payment.paymentDate }}</td>
          <td>{{ payment.payerNumber }}</td>
          <td>
            <button
              class="btn btn-outline-primary me-2"
              @click="viewPayment(payment)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-outline-warning me-2"
              @click="openEditModal(payment)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-outline-danger"
              @click="confirmDelete(payment.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Add/Edit Payment -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      aria-labelledby="paymentFormModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentFormModalLabel">
              {{ isEdit ? "Modifier le Paiement" : "Ajouter un Paiement" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePayment">
              <div class="mb-3">
                <label for="payerName" class="form-label">Nom du Payeur</label>
                <input
                  type="text"
                  id="payerName"
                  v-model="currentPayment.payer"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="studentId" class="form-label">Sélectionner un Étudiant</label>
                <select
                  id="studentId"
                  v-model="currentPayment.studentId"
                  class="form-control"
                  required
                >
                  <option v-for="student in paymentStore.students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="moduleId" class="form-label">Module</label>
                <select
                  id="moduleId"
                  v-model="currentPayment.moduleId"
                  class="form-control"
                  required
                >
                  <option v-for="module in paymentStore.modules" :key="module.id" :value="module.id">
                    {{ module.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="registrationId" class="form-label">Inscriptions</label>
                <select
                  id="registrationId"
                  v-model="currentPayment.registrationId"
                  class="form-control"
                  required
                >
                  <option v-for="registration in paymentStore.registrations" :key="registration.id" :value="registration.id">
                    {{ registration.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="paymentAmount" class="form-label">Montant</label>
                <input
                  type="number"
                  id="paymentAmount"
                  v-model="currentPayment.amount"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="paymentMode" class="form-label">Mode de Paiement</label>
                <input
                  type="text"
                  id="paymentMode"
                  v-model="currentPayment.paymentMode"
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
  </div>
</template>


<script setup>
import { reactive, ref, onMounted } from "vue";
import { usePaymentStore } from "../../stores/paymentStore";
import Swal from "sweetalert2";
import { useModuleStore } from "../../stores/moduleStore";

const paymentStore = usePaymentStore();
const moduleStore = useModuleStore();

const { payments, fetchPayments, createPayment, updatePayment, deletePayment } =
  paymentStore;

const showModal = ref(false);
const isEdit = ref(false);
const currentPayment = reactive({
  id: null,
  payer: "",
  moduleId: "",
  amount: "",
  paymentMode: "",
});
const viewingPayment = ref(null);

const openAddModal = () => {
  resetCurrentPayment();
  isEdit.value = false;
  showModal.value = true;
};

const { modules } = moduleStore; // Nous avons déjà une liste des modules dans le store

// Récupère le nom du module en utilisant l'ID du module
const getModuleName = (moduleId) => {
  const module = modules.find(m => m.id === moduleId);
  return module ? module.name : "Module non trouvé"; // Si aucun module n'est trouvé, on retourne un message d'erreur
};


const openEditModal = (payment) => {
  Object.assign(currentPayment, payment);
  isEdit.value = true;
  showModal.value = true;
};

const viewPayment = (payment) => {
  viewingPayment.value = payment;
};

const closeView = () => {
  viewingPayment.value = null;
};

const closeModal = () => {
  showModal.value = false;
};

const savePayment = async () => {
  closeModal();

  if (isEdit.value) {
    await updatePayment(currentPayment.id, currentPayment);
    const index = payments.findIndex((p) => p.id === currentPayment.id);
    if (index !== -1) {
      payments[index] = { ...currentPayment };
    }
  } else {
    const newPayment = await createPayment(currentPayment);
    payments.push(newPayment);
  }
};

const resetCurrentPayment = () => {
  currentPayment.id = null;
  currentPayment.payer = "";
  currentPayment.moduleId = "";
  currentPayment.amount = "";
  currentPayment.paymentMode = "";
};

const confirmDelete = (paymentId) => {
  Swal.fire({
    title: "Êtes-vous sûr?",
    text: "Vous ne pourrez pas revenir en arrière après avoir supprimé ce paiement!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, supprimer!",
    cancelButtonText: "Annuler",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deletePayment(paymentId);
      Swal.fire(
        "Supprimé!",
        "Le paiement a été supprimé avec succès.",
        "success"
      );
      const index = payments.findIndex((p) => p.id === paymentId);
      if (index !== -1) {
        payments.splice(index, 1);
      }
    }
  });
};

// Vérifiez les paiements et les modules dans votre composant
onMounted(() => {
  paymentStore.fetchPayments();
  moduleStore.fetchModules();

});

</script>

<style scoped>
.module-list {
  max-width: 900px;
  margin: 0 auto;
}
</style>
