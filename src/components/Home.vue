<template>
  <div>
    <!-- Header Navigation -->
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
              <a class="nav-link active" aria-current="page" href="#"
                >Accueil</a
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
              <router-link
                class="nav-link"
                to="/registrations"
                exact-active-class="active"
                >Inscription</router-link
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

    <!-- Main Content -->
    <main class="container mt-5">
      <div class="text-center">
        <h1 class="display-4">
          Bienvenue sur l'application de gestion des apprenants
        </h1>
        <p class="lead">
          Utilisez les options du menu pour naviguer dans l'application.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
// No additional setup logic for now
</script>

<style scoped></style>
