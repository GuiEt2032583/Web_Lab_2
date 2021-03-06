import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Produit from './components/Produit.vue'

const app = createApp(App)

app.use(router)
app.component('Produit', Produit);

app.mount('#app')

var bd;

// Tentative d'ouverture de la bd
// Le deuxième paramètre représente le numéro de version
var requete = indexedDB.open("MaBD", 1);

// Créer ou mettre à jour (si le numéro de version change)
requete.onupgradeneeded = function(event){
	var bd = event.target.result;
	
	// Création du "store" à l'aide des options
	var options = {
		keyPath: "cle", //nom de la clé primaire
		autoIncrement: true //true si la clé primaire peut être générée
	};
	var entrepot = bd.createObjectStore("MonEntrepot", options);
	
	// Création d'un index, qui permet la recherche
	entrepot.createIndex("nomIndex", "cle");
	
	// Ajout de données
	entrepot.transaction.oncomplete = function(event){
		// Ouverture de la transaction
		var trans = bd.transaction("MonEntrepot", "readwrite");
		var monEntrepot = trans.objectStore("MonEntrepot");
	};
};

// Gestion des erreurs d'ouverture
requete.onerror = function(event){
	console.log(event.target.errorCode);
};

// En cas de succès, "bd" contient la connexion
requete.onsuccess = function(event){
	bd = event.target.result;
};
