import { defineStore } from "pinia";
import axios from "axios";

export const useModuleStore = defineStore("module", {
  state: () => ({
    modules: [], // Liste des modules
  }),

  actions: {
    // Récupérer tous les modules
    async fetchModules() {
      try {
        const response = await axios.get("http://localhost:3010/api");
        this.modules = response.data; // Assurez-vous que la réponse correspond à votre API
      } catch (error) {
        console.error("Erreur lors de la récupération des modules :", error);
        throw error;
      }
    },

    // Créer un nouveau module
    async createModule(newModule) {
      try {
        const response = await axios.post(
          "http://localhost:3010/api/modules",
          newModule
        );
        this.modules.push(response.data); // Ajouter le module créé à la liste
      } catch (error) {
        console.error("Erreur lors de la création du module :", error);
        throw error;
      }
    },

    // Mettre à jour un module existant
    async updateModule(id, updatedModule) {
      try {
        const response = await axios.put(
          `http://localhost:3010/api/modules/${id}`,
          updatedModule
        );
        const index = this.modules.findIndex((module) => module.id === id);
        if (index !== -1) {
          this.modules[index] = response.data; // Mettre à jour le module dans la liste
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du module :", error);
        throw error;
      }
    },

    // Supprimer un module
    async deleteModule(id) {
      try {
        await axios.delete(`http://localhost:3010/api/modules/${id}`);
        this.modules = this.modules.filter((module) => module.id !== id); // Supprimer le module de la liste
      } catch (error) {
        console.error("Erreur lors de la suppression du module :", error);
        throw error;
      }
    },
  },
});
