<template>
  <div>
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
  props: ['cb_response'],
  data () {
    return {
      cb_inputAnswer: ''
    }
  },
  methods: {
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
