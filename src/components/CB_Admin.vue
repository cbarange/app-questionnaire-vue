<template>
  <div id="cb_admin">
    <!-- Saisi du mot de passe admin, la variable cb_correctePassword se met a jour quand on click sur le bouton Valider [10/11/2019] -->
    <div class="cb_md_card" v-if="!cb_correctePassword">
      <md-card>
        <span><br>&nbsp;</span>
        <md-field class="cb_md_field">
          <label>Saisir le mot de passe admin : password</label>
          <md-input v-model="cb_adminpw"></md-input>
          <!-- Si le mot de passe saisi est incorrecte on affiche ceci, ici le mot de passe est Password123 [10/11/2019] -->
          <span v-if="cb_incorrectePassword" class="md-helper-text">Veuillez saisir le bon mot de passe : Password123</span>
        </md-field>
        <span>&nbsp;<br><br></span>
        <!-- On propose à l'utilisateur de revenir sur la page d'accueil ou de valider le mot de passe [10/11/2019]-->
        <router-link to="/"><md-button class="md-raised md-primary">← Retour</md-button></router-link>
        <md-button @click="cb_checkPassword()" class="md-raised md-primary">Valider</md-button>
        <span><br>&nbsp;</span>
      </md-card>
    </div>
    <!-- Si le mot de passe a été correctement saisi alors on affiche les informations sur les utilisateurs inscrit, md-table est un élément de vuematerial [10/11/2019] -->
    <md-table v-if="cb_correctePassword" v-model="cb_searched" md-sort="cb_nom" md-sort-order="asc" md-card md-fixed-header class="cb_md_table">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Utilisateurs</h1>
        </div>
        <!-- On propose à l'utilisateur de faire une recherche par nom avec 3 caracteres maximum [10/11/2019] -->
        <md-field md-clearable class="md-toolbar-section-end cb_md_field_search">
          <md-input placeholder="Rechercher par nom..." v-model="cb_search" maxlength="3" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <!-- Si la recherche ne renvoie aucun utilisateur on affiche l'élément suivant [10/11/2019] -->
      <md-table-empty-state md-label="Aucun utilisateur trouver"></md-table-empty-state>
      <!-- Pour chaque utilisateur on affiche les informations suivantes [10/11/2019] -->
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nom" md-sort-by="cb_nom">{{ item.cb_nom }}</md-table-cell>
        <md-table-cell md-label="Prénom" md-sort-by="cb_prenom">{{ item.cb_prenom }}</md-table-cell>
        <md-table-cell md-label="Entreprise" md-sort-by="cb_entreprise">{{ item.cb_entreprise }}</md-table-cell>
        <md-table-cell md-label="N° Participations" md-sort-by="cb_participation">{{ item.cb_participation }}</md-table-cell>
        <md-table-cell md-label="N° Réponses" md-sort-by="cb_total">{{ item.cb_total }}</md-table-cell>
        <md-table-cell md-label="N° Réponses correcte" md-sort-by="cb_score">{{ item.cb_score }}</md-table-cell>
        <md-table-cell md-label=""><md-button class="md-raised md-primary">Détail</md-button></md-table-cell>
      </md-table-row>
    </md-table>
    <!-- On propose à l'utilisateur de revenir sur la page d'accueil [10/11/2019]-->
    <router-link to="/"><md-button v-if="cb_correctePassword" class="md-raised md-primary">← Retour</md-button></router-link>
  </div>
</template>

<script>
// Import de PouchDB [10/11/2019]
// npm install PouchDB [10/11/2019]
import PouchDB from 'pouchdb'
// Import de bcryptjs [10/11/2019]
// npm install bcryptjs
import bcrypt from 'bcryptjs'
// La fonction toLower est utiliser dans la comparaison avec le champ de recherche par nom [10/11/2019]
const toLower = text => { return text.toString().toLowerCase() }
// La fonction searchByName permet de faire la comparaison avec les noms d'utilisateur en base [10/11/2019]
const searchByName = (items, term) => {
  if (term)
    return items.filter(item => toLower(item.cb_nom).includes(toLower(term)))
  return items
}
export default {
  name: 'CB_Admin',
  data () {
    return {
      // cb_adminpw est la variable qui utiliser pour stocker le mot de passe saisi pas l'utilisateur [10/11/2019]
      cb_adminpw: '',
      // cb_db est la variable utilisée pour la base de donnée local [10/11/2019]
      cb_db: new PouchDB('cb-app-questionnaire'),
      // cb_document est la variable qui stocke le contenu de la base [10/11/2019]
      cb_document: {},
      // cb_correctePassword permet de savoir si le mot de passe saisi est correcte pour afficher les informations des utilisateurs [10/11/2019]
      cb_correctePassword: false,
      // cb_incorrectePassword permet d'afficher le text d'aide si le mot de passe saisi est incorrecte [10/11/2019]
      cb_incorrectePassword: false,
      // cb_search est la variable qui utilisé pour par l'utilisateur dans la recherche par noms [10/11/2019]
      cb_search: null,
      // cb_searched est la variable qui contient tous les utilisateurs afficher dans le tableau [10/11/2019]
      cb_searched: []
    }
  },
  methods: {
    // searchOnTable est la fonction qui appelle la fonction searchByName [10/11/2019]
    searchOnTable () {
      this.cb_searched = searchByName(this.cb_document.cb_historique_resultat, this.cb_search)
    },
    // cb_chechPasssword Permet de vérifier si le mot de passe saisi est correcte, elle est appeller lors du clique sur le bouton Valider [10/11/2019]
    cb_checkPassword: function () {
      // Generation d'un salt
      //var cb_salt = bcrypt.genSaltSync(10)
      //console.log(cb_salt)
      // Le resultat sera utiliser pour la generation du cb_hash
      var cb_salt = '$2a$10$gt/8moSeQUxRsy13qbeE4e'
      // cb_hash stocke le hash du mot de passe correcte, a savoir Password123 [10/11/2019]
      // cb_hash2 stocke le hash du mot de passe saisi par l'utilisateur [10/11/2019]
      var cb_hash, cb_hash2
      // Generation du cb_hash du mot de passe correcte [10/11/2019]
      /*cb_hash = bcrypt.hashSync("Password123", cb_salt)
      for(var cb_i=0;cb_i<3;cb_i++)
        cb_hash = bcrypt.hashSync(cb_hash, cb_salt)
      console.log(cb_hash)*/
      // Le résultat est '$2a$10$gt/8moSeQUxRsy13qbeE4edMnfbhKxIkSDB5NzYkY4BFz12KLn/MS' [10/11/2019]
      // Génération du cb_hash2, on utilise 4 fois l'algorithme [10/11/2019]
      cb_hash2 = bcrypt.hashSync(this.cb_adminpw, cb_salt)
      for(var cb_i=0;cb_i<3;cb_i++)
        cb_hash2 = bcrypt.hashSync(cb_hash2, cb_salt)
      var cb_hash= '$2a$10$gt/8moSeQUxRsy13qbeE4edMnfbhKxIkSDB5NzYkY4BFz12KLn/MS'
      // Si le cb_hash2 et egale au cb_hash alors le mot de passe est correcte [10/11/2019]
      if ( cb_hash2 === cb_hash )
        this.cb_correctePassword = true
      else
        this.cb_correctePassword = false
      this.cb_incorrectePassword = true // Permet d'afficher l'aide pour la saisi du mot de passe [10/11/2019]
    }
  },
  created: function () {},
  mounted: function () {
    // On permet de context this dans le promesse, on doit alors utiliser une autre variable cb_that [10/11/2019]
    var cb_that = this
    // Recupere le contenu de la base de donnée [10/11/2019]
    this.cb_db.get('cb_historique_resultat').then(function (cb_doc) {cb_that.cb_document=cb_doc;cb_that.cb_searched=cb_that.cb_document.cb_historique_resultat})
  },
  watch: {}
}
</script>

<style>
#cb_admin {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}
.cb_md_field{
  margin: 0 auto;
  width: 70%;
  min-width: 250px;
}
.cb_md_field_search{
  width: 35%;
  max-width: 200px;
  min-width: 50px;
}
.cb_md_table{
  /*width: 95%;*/
  text-align: left;
  margin: 0 auto;
}
.cb_md_card{
  width: 50%;
  min-width: 350px;
  margin: 0 auto;
}
</style>
