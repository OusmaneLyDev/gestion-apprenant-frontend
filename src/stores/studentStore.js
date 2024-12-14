import { defineStore } from "pinia";
import axios from "axios";

export const useStudentStore = defineStore("studentStore", {
  state: () => ({
    students: [], // Liste des étudiants
    loading: false, // Indique si une action est en cours
    error: null,    // Stocke les erreurs
  }),

  actions: {
    // Récupérer tous les étudiants
    async fetchStudents() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:3010/api/students");
        this.students = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
        this.error = "Impossible de récupérer les étudiants.";
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouvel étudiant
    async addStudent(newStudent) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://localhost:3010/api/student", newStudent);
        this.students.push(response.data); // Ajouter le nouvel étudiant à la liste
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'étudiant :", error);
        this.error = "Impossible d'ajouter l'étudiant.";
      } finally {
        this.loading = false;
      }
    },

    // Mettre à jour un étudiant existant
    async updateStudent(id, updatedData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3010/api/student/${id}`, updatedData);
        const index = this.students.findIndex((student) => student.id === id);
        if (index !== -1) {
          this.students[index] = response.data; // Mettre à jour l'étudiant dans la liste
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étudiant :", error);
        this.error = "Impossible de mettre à jour l'étudiant.";
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un étudiant
    async deleteStudent(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`http://localhost:3010/api/student/${id}`);
        this.students = this.students.filter((student) => student.id !== id); // Supprimer l'étudiant de la liste
      } catch (error) {
        console.error("Erreur lors de la suppression de l'étudiant :", error);
        this.error = "Impossible de supprimer l'étudiant.";
      } finally {
        this.loading = false;
      }
    },
  },
});
