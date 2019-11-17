<template>
  <div class="cb_question">
    <md-card>
      <md-card-content>
        <!-- On affiche l'intitule de la question [17/11/2019] -->
        <p> {{ cb_questions[cb_counter].question.text }} </p>
        <!-- Si la question est ouverte on utilise le component CB_ReponseOuverte [17/11/2019] -->
        <CB_ReponseOuverte v-if="cb_questions[cb_counter].question.question_type == 'ouverte'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
        <!-- Si la question a choix multiple on utilise le component CB_ReponseQCM [17/11/2019] -->
        <CB_ReponseQCM v-if="cb_questions[cb_counter].question.question_type == 'qcm'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
/* eslint-disable */
// eslint ne supporte pas la syntaxe simplifie sur les if et for [17/11/2019]
// Import de la liste de question [17/11/2019]
import jsonQuestions from './../../ressource/questions.json'
// Component pour la gestion des reponses ouvertes [17/11/2019]
import CB_ReponseOuverte from './CB_ReponseOuverte.vue'
// Component pour la gestion des reponses a choix [17/11/2019]
import CB_ReponseQCM from './CB_ReponseQCM.vue'
// Utilisation de PouchDB [17/11/2019]
import PouchDB from 'pouchdb'

export default {
  name: 'CB_Question',
  components: {
    CB_ReponseOuverte, CB_ReponseQCM
  },
  props: [],
  data () {
    return {
      // Permet de savoir le nombre de question deja repondu [17/11/2019]
      cb_counter: 0,
      // Permet de savoir le nombre de bonne reponses donnees [17/11/2019]
      cb_correcteAnswer: 0,
      // Base de donnees distante CouchDB [17/11/2019]
      cb_remoteDB: new PouchDB("http://localhost:5984/cb-app-questionnaire"),
      // Base de donnees local PouchDB [17/11/2019]
      cb_db: new PouchDB('cb-app-questionnaire'),
      // Document en provenance de la base de donnees [17/11/2019]
      cb_document: '',
      // Index du participant dans le cb_document [17/11/2019]
      cb_indexParticipant: -1,
      // Permet de savoir si la reponse precedente etait juste [17/11/2019]
      cb_correcte: false,
      // Recupere entre 5 et 8 question dans la liste [17/11/2019]
      cb_questions: this.cb_getRandomQuestion()
    }
  },
  methods: {
    // Permet de recuperer entre 5 et 8 questions dans le fichier json [17/11/2019]
    cb_getRandomQuestion : function () {
      var cb_size = jsonQuestions.list_question.length
      var cb_res = []
      var cb_db = new PouchDB('cb-app-questionnaire')
      cb_db.get('cb_historique_resultat').then(function (cb_doc) {
        for(var i=0;i<cb_doc.num_question_min+Math.floor(Math.random() * Math.floor(cb_doc.num_question_sup));i++)
          if(cb_res.indexOf(jsonQuestions.list_question[(Math.floor(Math.random() * Math.floor(cb_size)))]) == -1)
            cb_res.push(jsonQuestions.list_question[(Math.floor(Math.random() * Math.floor(cb_size)))])  
        })
      return cb_res
    },
    // Cette methode est appellé quand l'utilisateur clique sur Suivant, elle permet de comparer la bonne reponse et la reponse de l'utilisateur [17/11/2019]
    cb_getResponse: function (cb_d) {
      if (cb_d){
        this.cb_correcteAnswer++
        this.cb_correcte=true
      }else{
        this.cb_correcte=false
      }
      this.cb_counter++
    },
    // Permet d'enregistrer la date au bon format, visible avec l'interface admin [17/11/2019]
    cb_displayDate:function(date){
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      return [day,month,year].join('-')
    }
  },
  created: function () {
    // Si le formulaire n'a pas ete correctement rempli, on redirige l'utilisateur [08/11/2019]
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
      return that.cb_db.get('cb_historique_resultat')
    }).then(function (cb_doc2) {
      that.cb_document=cb_doc2
      for( var cb_i in cb_doc2.cb_historique_resultat)
        if( cb_doc2.cb_historique_resultat[cb_i].cb_nom.toLowerCase() == that.$root.cb_personne.cb_nom.toLowerCase() && cb_doc2.cb_historique_resultat[cb_i].cb_prenom.toLowerCase() == that.$root.cb_personne.cb_prenom.toLowerCase() && cb_doc2.cb_historique_resultat[cb_i].cb_entreprise.toLowerCase() == that.$root.cb_personne.cb_entreprise.toLowerCase() )
          that.cb_indexParticipant=cb_i
      })
  },
  watch: {
    // Permet de suivre le nombre de question repondu et de les ajouter dans l'historique du joueur, consultable depuis l'interface admin [17/11/2019]
    cb_counter: function (cb_val) {
      // On enregistre la question et la reponse de l'utilisateur [17/11/2019]
      this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_tests.push({cb_question: this.cb_questions[this.cb_counter-1].question.text, cb_reponse: this.cb_questions[this.cb_counter-1].reponse, cb_correcte: this.cb_correcte, cb_date: this.cb_displayDate(Date.now()), cb_type_question: this.cb_questions[this.cb_counter-1].question.question_type.toUpperCase()})
      // Si toutes les questions sont passees, on met a jour les donnees du participant, scoreTotal, nbDeParticipation ... [17/11/2019]
      if (this.cb_counter == this.cb_questions.length){
        // Nombre de bonne reponses [17/11/2019]
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_score += this.cb_correcteAnswer
        // Nombre de question repondu [17/11/2019]
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_total += this.cb_counter
        // Nombre de participation [17/11/2019]
        this.cb_document.cb_historique_resultat[this.cb_indexParticipant].cb_participation++
        // On met a jour le document dans la base de donnees local
        this.cb_db.put(this.cb_document)
        // On synchronise avec la base de donnees distante
        var sync = this.cb_db.sync(this.cb_remoteDB, {live: true, retry: true})

        // ==============================
        // === UTILISATION DE PouchDB ===
        // ==============================
        /*
        var cb_remoteDB = new PouchDB("http://localhost:5984/cb-app-questionnaire")
        var cb_db = new PouchDB('cb-app-questionnaire')
        cb_db.put(doc)
        // SYNC WITH CouchDB
        var sync = cb_db.sync(cb_remoteDB, {
          live: true,
          retry: true
        })
        
        // GET INFORMATION
        db.info().then(function (info) {
          console.log(info)
        })
        
        // GET DOCUMENT
        db.get('mittens').then(function (doc) {
          console.log(doc)
        })
        
        // UPDATE DOCUMENT
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
        })
        //PouchDB.debug.enable('*')
        //PouchDB.debug.disable()
        */
        // On affiche la page de resultat
        this.$router.push({ path: '/result', query: { cb_score: this.cb_correcteAnswer, cb_total: this.cb_questions.length }})
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
