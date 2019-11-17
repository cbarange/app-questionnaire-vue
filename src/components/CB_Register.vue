<template>
  <div>
    <!-- On propose a l'utilisateur de s'enregistrer, nom, prenom, entreprise [17/11/2019] -->
    <div class="cb_RegisterBox">
      <md-card>
        <!-- La valeur saisie par l'utilisateur sont enregistrees dans une variable global VueJs [17/11/2019] -->
        <md-card-content>
          <div class="RegisterPrenom">
            <md-field>
              <label>Prénom</label>
              <md-input v-model="$root.cb_personne.cb_prenom" maxlength="20" required></md-input>
            </md-field>
          </div>
          <div class="RegisterNom">
            <md-field>
              <label>Nom</label>
              <md-input v-model="$root.cb_personne.cb_nom" maxlength="20" required></md-input>
            </md-field>
          </div>
          <div class="RegisterEntreprise">
            <md-field>
              <label>Entreprise</label>
              <md-input v-model="$root.cb_personne.cb_entreprise" maxlength="20" required></md-input>
            </md-field>
          </div>
        </md-card-content>
        <!-- Bouton pour acceder a l'interface admin [17/11/2019] -->
        <router-link to="/admin"><md-button class="md-raised md-primary">Accès admin</md-button></router-link>
        <!-- Bouton pour acceder au questionnaire [17/11/2019] -->
        <router-link to="/questionnaire"><md-button class="md-raised md-primary">Commencer le test</md-button></router-link>
        <br><span>&nbsp;</span>
      </md-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// eslint ne supporte pas la syntaxe simplifie sur les if et for [17/11/2019]
// Permet de creer le document de la base de donnees PouchDB [17/11/2019]
import jsonInitDB from './../../ressource/CouchDB_Initdocument.json'
// Utilisateur de PouchDB [17/11/2019]
import PouchDB from 'pouchdb'
// Utilisation d'un plugin PouchDB pour la method putIfNotExists() [17/11/2019]
PouchDB.plugin(require('pouchdb-upsert'))
export default {
  name: 'CB_Register',
  data () {
    return {
      // Base de donnees distante CouchDB [17/11/2019]
      cb_remoteDB: new PouchDB("http://localhost:5984/cb-app-questionnaire"),
      // Base de donnes local PouchDB [17/11/2019]
      cb_db: new PouchDB('cb-app-questionnaire')
    }
  },
  methods: {},
  created: function () {},
  mounted: function () {
    // On synchronise les deux base de donnees [17/11/2019]
    var sync = this.cb_db.sync(this.cb_remoteDB, {live: true, retry: true})
    // La variable this n'est pas accessible dans la promesse [17/11/2019]
    var cb_that = this
    // Si le document n'est pas dans la base de donnees on l'insert [17/11/2019]
    this.cb_db.putIfNotExists('cb_historique_resultat', jsonInitDB).then(function (cb_res) {
      cb_that.cb_document = cb_res
    })
  },
  watch: {}
}
</script>

<style scoped>
.cb_RegisterBox{
  width: 30%;
  min-width: 250px;
  margin: 0 auto;
}
</style>
