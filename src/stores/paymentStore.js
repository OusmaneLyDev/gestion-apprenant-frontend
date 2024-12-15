import { defineStore } from "pinia";
import axios from "axios";

export const usePaymentStore = defineStore("payments", {
  state: () => ({
    payments: [], // Liste des paiements
  }),

  actions: {
    // Récupérer tous les paiements
    async fetchPayments() {
      try {
        const response = await axios.get("http://localhost:3010/api/payments");
        this.payments = response.data; // Assurez-vous que la réponse correspond à votre API
      } catch (error) {
        console.error("Erreur lors de la récupération des paiements :", error);
        throw error;
      }
    },

    // Créer un nouveau paiement
    async createPayment(newPayment) {
      try {
        const response = await axios.post(
          "http://localhost:3010/api/payments",
          newPayment
        );
        this.payments.push(response.data); // Ajouter le paiement créé à la liste
      } catch (error) {
        console.error("Erreur lors de la création du paiement :", error);
        throw error;
      }
    },

    // Mettre à jour un paiement existant
    async updatePayment(id, updatedPayment) {
      try {
        const response = await axios.put(
          `http://localhost:3010/api/payments/${id}`,
          updatedPayment
        );
        const index = this.payments.findIndex((payment) => payment.id === id);
        if (index !== -1) {
          this.payments[index] = response.data; // Mettre à jour le paiement dans la liste
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du paiement :", error);
        throw error;
      }
    },

    // Supprimer un paiement
    async deletePayment(id) {
      try {
        await axios.delete(`http://localhost:3010/api/payments/${id}`);
        this.payments = this.payments.filter((payment) => payment.id !== id); // Supprimer le paiement de la liste
      } catch (error) {
        console.error("Erreur lors de la suppression du paiement :", error);
        throw error;
      }
    },
  },
});
