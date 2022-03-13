<script >
import { RouterLink, stringifyQuery } from 'vue-router';

export default {
    data() {
        return{
            produit: {},
            bd: {}
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
					resolve(vueObject.bd);
				};  		
			});
		},
         
        save : function() {
            var vueObject = this;
            var transaction = this.bd.transaction(["MonEntrepot"], "readwrite");
	        var monEntrepot = transaction.objectStore("MonEntrepot");
	        monEntrepot.put({
		        cle: parseInt(vueObject.produit.cle),
		        data: JSON.stringify(vueObject.produit)
	        });
        }
    },

    mounted() {
        var vueObject = this;
		this.openDB().then(function(result){
            //Va chercher l'id dans l'url
            //Bout de code de https://www.sitepoint.com/get-url-parameters-with-javascript/
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var id = urlParams.get('id')
            
            //va chercher le produit qui correspond à l'id
            var transaction = vueObject.bd.transaction(["MonEntrepot"], "readwrite");
	        var monEntrepot = transaction.objectStore("MonEntrepot");
	        var requete = monEntrepot.get(parseInt(id));
	        requete.onsuccess = function(event){
		        vueObject.produit = JSON.parse(event.target.result.data);
	        };  
        });
    }
}
</script>

<template>
    <div class="dashboard-wrapper">
            <div class="dashboard-ecommerce">
                <div class="container-fluid dashboard-content ">
                    
                    <div class="row">
                        <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30">
                                    <div class="product-slider">
										<img class="d-block" :src="produit.img" alt="First slide">
                                        <a href="#" class="btn btn-primary btn-block btn-lg">Choisir une image</a>
                                        <!--
                                            Pour selectionner l'image, faire un modal qui a un v-model sur sa src
                                            Champ de texte ou l'utilisateur peut rentrer l'url de l'image, avec le v-model
                                            L'image va s'update auto une fois l'url rentrée au complet
                                        -->
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                                    <div class="product-details">
                                        <div class="border-bottom pb-3 mb-3">
                                            <h2 class="mb-3"><input type="text" :value="produit.nom"></h2>
                                            <h3 class="mb-0 text-primary">$<input type="text" :value="produit.prix"></h3>
                                        </div>
                                        <div class="product-size border-bottom">
                                            <h4>Fournisseur</h4>
                                            <input type="text" :value="produit.fourn">
                                            <div class="product-qty">
                                                <h4>Quantité</h4>
                                                <div class="quantity">
                                                    <input type="number" :value="produit.qty">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-description">
                                            <h4 class="mb-1">Description</h4>
                                            <textarea rows="4" cols="50" :value="produit.desc"></textarea>
                                            <RouterLink to="/" class="btn btn-primary btn-block btn-lg" @click="save">Sauvegarder</RouterLink>
                                        </div>
                                    </div>
                                </div>                          
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
</template>

<style>

</style>