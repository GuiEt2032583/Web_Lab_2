<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return{
            produit: {},
            bd: {},
            id: {}
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
        sendId: function(id, router){
        	var url = new URL("http://localhost:3000/" + router);
        	url.searchParams.set('id', id);
        	url.search = url.searchParams.toString();
        	var new_url = url.toString();
			window.location.href = new_url;
    	}
    },

    mounted() {
        var vueObject = this;
		this.openDB().then(function(result){
            //Va chercher l'id dans l'url
            //Bout de code de https://www.sitepoint.com/get-url-parameters-with-javascript/
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var id = urlParams.get('id');
            vueObject.id = parseInt(id);
            
            //va chercher le produit qui correspond à l'id
            var transaction = vueObject.bd.transaction(["MonEntrepot"], "readwrite");
	        var monEntrepot = transaction.objectStore("MonEntrepot");
	        var requete = monEntrepot.get(vueObject.id);
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
									    <img class="d-block" :src="produit.src" alt="First slide">
                                        
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                                    <div class="product-details">
                                        <div class="border-bottom pb-3 mb-3">
                                            <h2 class="mb-3">Produit : {{produit.nom}}</h2>
                                            <h3 class="mb-0 text-primary">Prix : ${{produit.prix}}</h3>
                                        </div>
                                        <div class="product-size border-bottom">
                                            <h4>Fournisseur</h4>
                                            {{produit.fourn}}
                                            <div class="product-qty">
                                                <h4>Quantité</h4>
                                                <div class="quantity">
                                                    {{produit.qty}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-description">
                                            <h4 class="mb-1">Description</h4>
                                            <p>{{produit.desc}}</p>
                                            <RouterLink to="/modification" class="btn btn-primary btn-block btn-lg" @click="sendId(id, 'modification')">Modifier</RouterLink>
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