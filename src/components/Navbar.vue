<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link">Liste des produits</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/modification" class="nav-link">Modification</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/ajout" class="nav-link">Ajout</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/produit" class="nav-link">Produit</RouterLink>
              </li>
            </ul>
          </div>
          
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-image : linear-gradient(to bottom right, #626262, #9e9e9e);
}

.navbar-brand, .nav-link{
    color: #e6e6e6;
}

.nav-link:hover{
    color: #cfcfcf;
}

 a:focus{
    color: #b1b1b1;
}

</style>