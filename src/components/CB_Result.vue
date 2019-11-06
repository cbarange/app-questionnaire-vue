<template>
  <div id="cb_result">
    {{ $root.cb_personne.cb_prenom }} {{ $root.cb_personne.cb_nom }}
    <p> Vous avez fait un score de </p>
    <p> {{ score }} / {{ total }} </p>
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
}
</style>
