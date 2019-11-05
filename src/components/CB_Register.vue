<template>
  <div>
    <div class="RegisterBox">
      <md-card>
        <md-card-content>
          <div class="RegisterPrenom">
            <md-field>
              <label>Prénom</label>
              <md-input v-model="$root.cb_personne.cb_prenom" md-counter="50" required></md-input>
            </md-field>
          </div>
          <div class="RegisterNom">
            <md-field>
              <label>Nom</label>
              <md-input v-model="$root.cb_personne.cb_nom" md-counter="50" required></md-input>
            </md-field>
          </div>
          <div class="RegisterEntreprise">
            <md-field>
              <label>Entreprise</label>
              <md-input v-model="$root.cb_personne.cb_entreprise" md-counter="50" required></md-input>
            </md-field>
          </div>
        </md-card-content>
        <md-card-actions>
          <router-link to="/questionnaire"><md-button class="md-raised md-primary">Valider</md-button></router-link>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CB_Register',
  // props: ['cb_routerProps'],
  data () {
    return {
      // eslint-disable-next-line
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
.RegisterBox{
  width: 30%;
  min-width: 250px;
  margin: 0 auto;
}
</style>
