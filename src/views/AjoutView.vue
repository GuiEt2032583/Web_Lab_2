<script>

</script>

<template>
    <div class="ajout-produit">
        <h1 class="titre">Ajout de produit</h1>
        <div>
            <h2>
                <input type="text" palceholder="Nom du produit">
            </h2>
            <h3>
                $<input type="text" pladceholder="Prix">
            </h3>
        </div>
        <div>
            <h4>Fournisseur</h4>
            <input type="text" placeholder="Fournisseur">
            <div class="product-qty">
                <h4>Quantité</h4>
                <div class="quantity">
                    <input type="number" placeholder="Quantité">
                </div>
            </div>
        </div>
        <div>
            <h4 class="mb-1">Description</h4>
            <textarea rows="4" cols="50" placeholder="Courte description"></textarea>
        </div>
        <button href="#" class="btn btn-primary btn-block btn-lg">Sauvegarder</button>
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