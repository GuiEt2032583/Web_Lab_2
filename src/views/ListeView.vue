<script>
import { RouterLink } from 'vue-router';
import Produit from '../components/Produit.vue';

export default {
	data() {
		return {
			produits : [],
			bd:{}
		}
	},
	
	methods: {
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
	},


	mounted() {
		var vueObject = this;
		this.openDB().then(function(result){
			vueObject.bd = result;
			console.log(vueObject.bd);

			var transaction = vueObject.bd.transaction(["MonEntrepot"], "readwrite");
			var monEntrepot = transaction.objectStore("MonEntrepot");
			var requete = monEntrepot.getAll();
			requete.onsuccess = function(event){
			event.target.result.forEach(produit => vueObject.produits.push(JSON.parse(produit.data)));
			
				
			
			
			console.log(vueObject.produits);
		};
		});
	}	
}
</script>

<template>
<div class="container-fluid">
    <div class="row row-produit">
        <Produit v-for="produit in this.produits" :key="produit.nom" :nom="produit.nom" :prix="produit.prix" :qty="produit.qty" :fourn="produit.fourn" :desc="produit.desc" pic="abc"/>
    </div>
</div>
</template>

<style scoped>

/* bout de code pris sur StackOverFlow : https://stackoverflow.com/questions/31944691/bootstrap-5-column-layout */
	.container-fluid{
		margin-left:4.166666667%
	}
</style>