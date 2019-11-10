<template>
  <div>
    <div class="cb_RegisterBox">
      <md-card>
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
        <router-link to="/admin"><md-button class="md-raised md-primary">Accès admin</md-button></router-link>
        
        <router-link to="/questionnaire"><md-button class="md-raised md-primary">Commencer le test</md-button></router-link>
        <br><span>&nbsp;</span>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CB_Register',
  data () {
    return {
      cb_nom_register: this.$root.cb_personne.cb_nom
    }
  },
  methods: {},
  created: function () {},
  mounted: function () {},
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
