<template>
  <div>
    <p> {{ cb_questions[cb_counter].question.text }} </p>
    <CB_ReponseOuverte v-if="cb_questions[cb_counter].question.question_type=='ouverte'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
    <CB_ReponseQCM v-if="cb_questions[cb_counter].question.question_type=='qcm'" :cb_response="cb_questions[cb_counter].reponse" @cb_nextQuestion="cb_getResponse"/>
  </div>
</template>

<script>
/* eslint-disable */
import jsonQuestions from './../../ressource/questions.json'
// eslint-disable-next-line
import CB_ReponseOuverte from './CB_ReponseOuverte.vue'
// eslint-disable-next-line
import CB_ReponseQCM from './CB_ReponseQCM.vue'
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
      cb_correcteAnswer: 0
    }
  },
  methods: {
    cb_counterBtn: function () {
      this.cb_counter++
    },
    cb_getResponse: function (cb_d) {
      if(cb_d)
        cb_correcteAnswer++
      //else
      this.cb_counter++
    }
  },
  created: function () {
    if (this.$root.cb_personne.cb_nom == null || this.$root.cb_personne.cb_prenom == null || this.$root.cb_personne.cb_entreprise == null)
      this.$router.push('/')
  },
  mounted: function () {},
  watch: {
    cb_counter: function (cb_val) {
      if (this.cb_counter == this.cb_questions.length)
        this.$router.push('/result')
    },
  }
}
</script>

<style scoped>

</style>
