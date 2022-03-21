<script >
import { RouterLink } from 'vue-router';

export default {
    data() {
        return{
            produit: {},
            bd: {},
            id: {},
            img: {},
            src: {}
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
            console.log(vueObject.id);
	        monEntrepot.put({
		        cle: vueObject.id,
		        data: JSON.stringify(vueObject.produit)
	        });
        },
        saveImage: function(img){
            this.produit.src = img;
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
    <div class="container-fluid">

        <div class="row">

            <div class="col-xl-6 col-lg-6 col-md-6 half">
                <img class="d-block image" :src="produit.src" alt="First slide">
                <a href="#" class="btn btn-primary btn-block btn-lg btn-left-half" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Choisir une image</a>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 half right">
                <div>
                    <h4>Nom du produit</h4>
                    <h2 class="mb-3"><input type="text" v-model="produit.nom"></h2>
                </div>
                <div>
                    <h4>Prix</h4>
                    <h3 class="mb-3 text-primary">$<input type="text" v-model="produit.prix"></h3>
                </div>
                <div>
                    <h4>Fournisseur</h4>
                    <input class="mb-3" type="text" v-model="produit.fourn">
                </div>
                <div>
                    <h4>Quantité</h4>      
                    <input class="mb-3" type="number" v-model="produit.qty">
                </div>
                <div>
                    <h4>Description</h4>
                    <textarea class="mb-3" rows="4" cols="50" v-model="produit.desc"></textarea>
                </div>
                <RouterLink to="/" class="btn btn-primary btn-lg" @click="save">Sauvegarder</RouterLink>
            </div>
        </div>
        <!--
            Pour selectionner l'image, faire un modal qui a un v-model sur sa src
            Champ de texte ou l'utilisateur peut rentrer l'url de l'image, avec le v-model
            L'image va s'update auto une fois l'url rentrée au complet
        -->

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajouter une image</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="modal-perso-body">
                    <img class="image" :src="img">
                    <input type="text" v-model="img">                             
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveImage(img)">Confirmer</button>
              </div>
            </div>
          </div>
        </div>
    </div>	
</template>

<style>
.product.description{
    display : flex;
    justify-content: start;
    flex-direction: column;
}

.half, .modal-perso-body{
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;
}

.right{
    align-items: flex-start;
}

.btn-left-half{
    width: 25%;
}
</style>