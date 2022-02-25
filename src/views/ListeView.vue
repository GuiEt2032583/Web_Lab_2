<script setup>
import { RouterLink } from 'vue-router';
import Produit from '../components/Produit.vue';



</script>

<template>
<div class="container-fluid">
    <div v-for="produit in produits" class="row row-produit">
        
    </div>
</div>
</template>

<style scoped>

/* bout de code pris sur StackOverFlow : https://stackoverflow.com/questions/31944691/bootstrap-5-column-layout */
	.col-half-offset{
		margin-left:4.166666667%
	}
</style>