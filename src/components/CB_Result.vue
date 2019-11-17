<template>
  <div id="cb_result">
    <md-card>
      <md-card-content>
        <!-- On affiche le score de l'utilisateur  [17/11/2019] -->
        <p  class="cb_presentation"> {{ $root.cb_personne.cb_prenom }} {{ $root.cb_personne.cb_nom }}</p>
        <p> Vous avez fait un score de </p>
        <p class="cb_resultat"> {{ cb_score }} / {{ cb_total }} <br><br>
          <!-- si le score est parfait on affiche une medaille d'or  [17/11/2019] -->
          <span v-if="score == total "> 🥇 </span>
          <!-- si le score est presque parfait on affiche une medaille d'argent [17/11/2019] -->
          <span v-else-if="score >= (total * 0.75) "> 🥈 </span>
          <!-- si le score est superieur a la moitier on affiche une medaille de bronze [17/11/2019] -->
          <span v-else-if="score >= (total * 0.5) "> 🥉 </span>
          <!-- si le score est inferieur a la moitier on affiche une medaille en chocolat ☻ [17/11/2019]-->
          <span v-else> 🏅 </span>
        </p>
        <!-- Bouton de redirection vers la page d'acceuil [17/11/2019] -->
        <router-link to="/"><md-button class="md-raised md-primary">← Retour</md-button></router-link>
        <!-- Bouton d'acces a l'interface admin [17/11/2019] -->
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
      // Pour recuperer les valeurs on utilise une query qui permet de passe en parametres les valeurs dans l'url
      // score permet de recuperer le nombre de bonnes reponses [17/11/2019]
      cb_score: this.$route.query.cb_score,
      // total permet de recuperer le nombre de question repondu [17/11/2019]
      cb_total: this.$route.query.cb_total
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
