<template>
  <div>
    <!-- Pour Chaque reponse possible on affiche une check box [17/11/2019] -->
    <!-- eslint-disable-next-line -->
    <md-checkbox v-for="cb_item in cb_response.reponses" v-model="cb_array" :value="cb_item">{{ cb_item }}</md-checkbox>
    <br>
    <!-- Bouton pour passer a la question suivante [17/11/2019] -->
    <md-button class="md-raised md-primary" v-on:click="$emit('cb_nextQuestion', cb_checkResponse())">Suivante →</md-button>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'CB_ReponseOuverte',
  // cb_response contient la liste des reponses possible et la bonne reponse [17/11/2019]
  props: ['cb_response'],
  data () {
    return {
      // cb_array contient la liste des reponses de l'utilisateur [17/11/2019]
      cb_array: []
    }
  },
  methods: {
    // cb_checkResponse renvoie true la reponse est correcte [17/11/2019]
    cb_checkResponse: function () {
      var cb_res = true
      if (this.cb_response.correcte.length != this.cb_array.length)
        cb_res = false
      for (var cb_i in this.cb_array)
        if (this.cb_response.correcte.indexOf(this.cb_array[cb_i]) === -1)
          cb_res = false
      this.cb_array = []
      return cb_res
    }
  },
  created: function () {},
  mounted: function () {},
  watch: {}
}
</script>

<style scoped>

</style>
