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
            },
            bd: {
            }            
        }
    },
    
    created() {
        var vueObject = this;
		this.openDB().then(function(result){
			vueObject.bd = result;
		});
    }, 

    methods: {
        save: function() {   
            console.log(this.bd);  
	        var transaction = this.bd.transaction(["MonEntrepot"], "readwrite");
	        var monEntrepot = transaction.objectStore("MonEntrepot");
	        monEntrepot.add({
                data : JSON.stringify(this.produit)
            });
        },
        openDB : function() {
			var vueObject = this;
			return new Promise (function(resolve) {
				var requete = indexedDB.open("MaBD", 1);

				// Créer ou mettre à jour (si le numéro de version change)
				requete.onupgradeneeded = function(event){
					vueObject.bd = event.target.result;

					var options = {
					keyPath: "cle", //nom de la clé primaire
					autoIncrement: true //true si la clé primaire peut être générée
					};

					var entrepot = vueObject.bd.createObjectStore("MonEntrepot", options);
			
					// Création d'un index, qui permet la recherche
					entrepot.createIndex("nomIndex", "cle");
					};

				// Gestion des erreurs d'ouverture
				requete.onerror = function(event){
					console.log(event.target.errorCode);
				};

				// En cas de succès, "bd" contient la connexion
				requete.onsuccess = function(event){
					vueObject.bd = event.target.result;
					console.log(vueObject.bd);
					resolve(vueObject.bd);
				};  		
			});
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