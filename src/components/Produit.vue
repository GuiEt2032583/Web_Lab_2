<script>

export default {
    props:{
        id: Number,
        nom : String,
        prix : String,
        qty : Number,
        fourn: String,
        desc: String,
        pic : String    
    },
    methods: {
        sendId: function(id, router){
        	var url = new URL("http://localhost:3000/" + router);
        	url.searchParams.set('id', id);
        	url.search = url.searchParams.toString();
        	var new_url = url.toString();
			window.location.href = new_url;
    	}
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
            <p class="card-text">Prix : {{ prix }} $</p>
            <p class="card-text">Quantité : {{qty}}</p>
            <p class="card-text">Fournisseur : {{fourn}}</p>
            <p class="card-text">Description : {{desc}}</p>
        </div>
        <div class="card-footer">
            <RouterLink to="/modification" class="btn btn-primary" @click="sendId(id, 'modification')">Modifier</RouterLink>
            <RouterLink to="/produit" class="btn btn-outline-dark" @click="sendId(id, 'produit')">Détails</RouterLink>          
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

 .card-img-top{
     width: 50%;
     align-self : center;
 }
</style>