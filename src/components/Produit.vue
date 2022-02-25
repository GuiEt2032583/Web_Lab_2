<script>
export default {
    props:{
    nom : String,
    prix : String,
    qty : String,
    pic : String    
    }
}
</script>

<template>
    <div class="produit col-lg-2 col-md-4">
        <div class="card" >
        <img :src="pic" class="card-img-top" alt="...">
        <div class="card-header">
            <h1 class="card-title">{{nom}}</h1>
        </div>
        <div class="card-body">
            <p class="card-text">Prix : {{ prix }}</p>
            <p class="card-text">Quantité : {{qty}}</p>
        </div>
        <div class="card-footer">
            <RouterLink to="/modification" class="btn btn-primary">Modifier</RouterLink>
            <RouterLink to="/produit" class="btn btn-outline-dark">Détails</RouterLink>
        </div>
    </div>
    </div>    
</template>

<style scoped>
 .produit{
    text-align: center;
    margin: 1% 2% 1% 0;
 }

 .btn {
    margin: 5%;
 }
</style>