<template>
  <div>
    <!-- On proprose a l'utilisateur de repondre dans un champ de saisi [17/11/2019] -->
    <md-field class="cb_md_field">
      <label>Votre Réponse</label>
      <md-input v-model="cb_inputAnswer"></md-input>
    </md-field>
    <md-button class="md-raised md-primary" v-on:click="$emit('cb_nextQuestion', cb_checkResponse())">Suivante →</md-button>
  </div>
</template>

<script>
export default {
  name: 'CB_ReponseOuverte',
  // cb_response stocke la bonne reponse [17/11/2019]
  props: ['cb_response'],
  data () {
    return {
      // cb_inputAnswer stocke la reponse de l'utilisateur [17/11/2019]
      cb_inputAnswer: ''
    }
  },
  methods: {
    // cb_checkResponse renvoie true sur la reponse de l'utilisateur est juste, on applique un lowerCase et un trim pour eviter les erreur de saisie [17/11/2019]
    cb_checkResponse: function () {
      return this.cb_inputAnswer.toLowerCase().trim() === this.cb_response.correcte.toLowerCase().trim()
    }
  },
  created: function () {},
  mounted: function () {},
  watch: {}
}
</script>

<style scoped>
.cb_md_field{
  margin: 0 auto;
  width: 30%;
  min-width: 250px;
}
</style>
