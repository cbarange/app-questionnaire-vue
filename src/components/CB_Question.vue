<template>
  <div class="cb_question">
    <md-card>
      <md-card-content>
        <p> {{ cb_questions[cb_counter].question.text }} </p>
        <CB_ReponseOuverte v-if="cb_questions[cb_counter].question.question_type == 'ouverte'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
        <CB_ReponseQCM v-if="cb_questions[cb_counter].question.question_type == 'qcm'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
/* eslint-disable */
import jsonQuestions from './../../ressource/questions.json'
// eslint-disable-next-line
import CB_ReponseOuverte from './CB_ReponseOuverte.vue'
// eslint-disable-next-line
import CB_ReponseQCM from './CB_ReponseQCM.vue'
// eslint-disable-next-line
import PouchDB from 'pouchdb'
export default {
  name: 'CB_Question',
  components: {
    CB_ReponseOuverte, CB_ReponseQCM
  },
  props: [],
  data () {
    return {
      //cb_nom_register: this.$root.cb_personne.cb_nom,
      cb_counter: 0,
      cb_questions: jsonQuestions.list_question,
      cb_correcteAnswer: 0,
      cb_remoteDB: new PouchDB("http://localhost:5984/cb-app-questionnaire"),
      cb_db: new PouchDB('cb-app-questionnaire'),
      cb_document: {},
      cb_indexParticipant: -1,
      cb_correcte: false
    }
  },
  methods: {
    cb_counterBtn: function () {
      this.cb_counter++
    },
    cb_getResponse: function (cb_d) {
      if (cb_d){
        this.cb_correcteAnswer++
        this.cb_correcte=true
      }else{
        this.cb_correcte=false
      }
      this.cb_counter++
    }
  },
  created: function () {
    // Si le formulaire n'a pas ete correctement rempli, on redirige l'utilisateur
    if (this.$root.cb_personne.cb_nom == null || this.$root.cb_personne.cb_prenom == null || this.$root.cb_personne.cb_entreprise == null || this.$root.cb_personne.cb_nom == '' || this.$root.cb_personne.cb_prenom == '' || this.$root.cb_personne.cb_entreprise == '')
      this.$router.push('/')
  },
  mounted: function () {
    // Met a jour la base de donnees local (PunchDB) avec la base de donnees distante (CouchDB) [08/11/2019]
    var sync = this.cb_db.sync(this.cb_remoteDB, {live: true, retry: true})

    // Recuperation du document contenant l'historique de tous les participants [08/11/2019]
    var that = this
    this.cb_document = this.cb_db.get('cb_historique_resultat').then(function (cb_doc) {
      // Verifie que je participant n'existe pas deja dans la base de donnees [08/11/2019]
      for( var cb_i in cb_doc.cb_historique_resultat)
        if( cb_doc.cb_historique_resultat[cb_i].cb_nom.toLowerCase() == that.$root.cb_personne.cb_nom.toLowerCase() && cb_doc.cb_historique_resultat[cb_i].cb_prenom.toLowerCase() == that.$root.cb_personne.cb_prenom.toLowerCase() && cb_doc.cb_historique_resultat[cb_i].cb_entreprise.toLowerCase() == that.$root.cb_personne.cb_entreprise.toLowerCase() )
          that.cb_indexParticipant=cb_i

      // Si le participant est nouveau, on l'ajout au document [08/11/2019]
      if(that.cb_indexParticipant == -1)
        cb_doc.cb_historique_resultat.push({
          cb_nom: that.$root.cb_personne.cb_nom,
          cb_prenom: that.$root.cb_personne.cb_prenom,
          cb_entreprise: that.$root.cb_personne.cb_entreprise,
          cb_participation: 0,
          cb_score: 0,
          cb_total: 0,
          cb_tests:[]
        })

      // Mise a jour du document dans la base de donnees [08/11/2019]
      return that.cb_db.put(cb_doc);
    }).then(function () {
      return that.cb_db.get('cb_historique_resultat');
    }).then(function (cb_doc2) {
      that.cb_document=cb_doc2
      for( var cb_i in cb_doc2.cb_historique_resultat)
        if( cb_doc2.cb_historique_resultat[cb_i].cb_nom.toLowerCase() == that.$root.cb_personne.cb_nom.toLowerCase() && cb_doc2.cb_historique_resultat[cb_i].cb_prenom.toLowerCase() == that.$root.cb_personne.cb_prenom.toLowerCase() && cb_doc2.cb_historique_resultat[cb_i].cb_entreprise.toLowerCase() == that.$root.cb_personne.cb_entreprise.toLowerCase() )
          that.cb_indexParticipant=cb_i
    })
  },
  watch: {
    cb_counter: function (cb_val) {
      this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_tests.push({cb_question: this.cb_questions[this.cb_counter-1].question.text, cb_reponse: this.cb_questions[this.cb_counter-1].reponse, cb_correcte: this.cb_correcte})
      if (this.cb_counter == this.cb_questions.length){
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_score += this.cb_correcteAnswer
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_total += this.cb_counter
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_participation++
        this.cb_db.put(this.cb_document)
        var sync = this.cb_db.sync(this.cb_remoteDB, {live: true, retry: true})

        //var cb_remoteDB = new PouchDB("http://localhost:5984/cb-app-questionnaire")
        //var cb_db = new PouchDB('cb-app-questionnaire')
        //cb_db.put(doc)
        // SYNC WITH CouchDB
        /*var sync = cb_db.sync(cb_remoteDB, {
          live: true,
          retry: true
        })*/
        /*
        db.info().then(function (info) {
          console.log(info)
        })
        */
        // GET DOCUMENT
        /*
        db.get('mittens').then(function (doc) {
          console.log(doc)
        });
        */
        // UPDATE DOCUMENT
        /*
        db.get('mittens').then(function (doc) {
          // update their age
          doc.age = 4
          // put them back
          return db.put(doc)
        }).then(function () {
          // fetch mittens again
          return db.get('mittens')
        }).then(function (doc) {
          console.log(doc)
        });*/
        //PouchDB.debug.enable('*')
        //PouchDB.debug.disable()

        this.$router.push({ path: '/result', query: { score: this.cb_correcteAnswer, total: this.cb_questions.length }})
      }
    },
  }
}
</script>

<style scoped>
.cb_question{
  width: 75%;
  min-width: 250px;
  margin: 0 auto;
}
</style>
