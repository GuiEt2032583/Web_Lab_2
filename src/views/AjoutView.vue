<script>
import {RouterLink} from 'vue-router';

export default{
    data() {
        return {
            produit: {
                nom: "",
                prix: 0,
                qty: 0,
                fourn: "",
                desc: ""
            }
        }
    },

    methods: {
        save: function() {
            localStorage.setItem(localStorage.length+1, JSON.stringify(produit));
        }
    }
}
</script>

<template>
    <div class="ajout-produit">
        <h1 class="titre">Ajout de produit</h1>
        <div>
            <h2>
                <input type="text" palceholder="Nom du produit" v-model="produit.nom">
            </h2>
            <h3>
                $<input type="text" pladceholder="Prix" v-model="produit.prix">
            </h3>
        </div>
        <div>
            <h4>Fournisseur</h4>
            <input type="text" placeholder="Fournisseur" v-model="produit.fourn">
            <div class="product-qty">
                <h4>Quantité</h4>
                <div class="quantity">
                    <input type="number" placeholder="Quantité" v-model="produit.qty">
                </div>
            </div>
        </div>
        <div>
            <h4 class="mb-1">Description</h4>
            <textarea rows="4" cols="50" placeholder="Courte description" v-model="produit.desc"></textarea>
        </div>
        <RouterLink to="/" class="btn btn-primary btn-block btn-lg" @click="save">Sauvegarder</RouterLink>
    </div>
    <p>{{produit.nom}}, {{produit.prix}}, {{produit.fourn}} ,{{produit.qty}}, {{produit.desc}}</p>
</template>

<style scoped>
 .ajout-produit{
     display : flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin: 1% 0 0 0;
 }

 .titre{
     margin: 1%;
 }
</style>