import { defineStore } from "pinia";
import axios from "axios";

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    registrations: [], // Liste des inscriptions
  }),

  actions: {
    // Récupérer toutes les inscriptions
    async fetchRegistrations() {
      try {
        const response = await axios.get(
          "http://localhost:3010/api/registrations"
        );
        this.registrations = response.data; // Assurez-vous que la réponse correspond à votre API
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des inscriptions :",
          error
        );
        throw error;
      }
    },

    // Créer une nouvelle inscription
    async createRegistration(newRegistration) {
      try {
        const response = await axios.post(
          "http://localhost:3010/api/registration",
          newRegistration
        );
        this.registrations.push(response.data); // Ajouter l'inscription créée à la liste
      } catch (error) {
        console.error("Erreur lors de la création de l'inscription :", error);
        throw error;
      }
    },

    async updateRegistration(id, updatedRegistration) {
        try {
          const response = await axios.put(
            `http://localhost:3010/api/registration/${id}`,
            updatedRegistration
          );
          console.log("Réponse API:", response.data); // Pour vérifier la réponse
          const index = this.registrations.findIndex(
            (registration) => registration.id === id
          );
          if (index !== -1) {
            this.registrations[index] = response.data; // Mettre à jour l'inscription dans la liste
          }
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour de l'inscription :",
            error
          );
          throw error;
        }
      },
      
    // Supprimer une inscription
    async deleteRegistration(id) {
      try {
        await axios.delete(`http://localhost:3010/api/registration/${id}`);
        this.registrations = this.registrations.filter(
          (registration) => registration.id !== id
        ); // Supprimer l'inscription de la liste
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'inscription :",
          error
        );
        throw error;
      }
    },
  },
});
