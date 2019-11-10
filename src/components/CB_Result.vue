<template>
  <div id="cb_result">
    <md-card>
      <md-card-content>
        <p  class="cb_presentation"> {{ $root.cb_personne.cb_prenom }} {{ $root.cb_personne.cb_nom }}</p>
        <p> Vous avez fait un score de </p>
        <p class="cb_resultat"> {{ score }} / {{ total }} <br><br>
          <span v-if="score == total "> 🥇 </span>
          <span v-else-if="score >= (total * 0.75) "> 🥈 </span>
          <span v-else-if="score >= (total * 0.5) "> 🥉 </span>
          <span v-else> 🏅 </span>
        </p>
        <router-link to="/"><md-button class="md-raised md-primary">← Retour</md-button></router-link>
        <router-link to="/admin"><md-button class="md-raised md-primary">Accès admin</md-button></router-link>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'CB_Result',
  data () {
    return {
      score: this.$route.query.score,
      total: this.$route.query.total
    }
  },
  methods: {},
  created: function () {},
  mounted: function () {},
  watch: {}
}
</script>

<style>
#cb_result {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 50%;
  min-width: 250px;
}
.cb_presentation{
  font-size: 25px;
}
.cb_resultat{
  font-size: 30px;
}
</style>
