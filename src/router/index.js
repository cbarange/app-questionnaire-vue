/* eslint-disable */
// besoin de desactiver eslint le prefix CB_ ne respecte le camel case [15/10/2019]
import Vue from 'vue'
import Router from 'vue-router'
import CB_Question from '@/components/CB_Question' // Component pour la gestion des questions [15/10/2019]
import CB_Register from '@/components/CB_Register' // Component d'accueil du site [15/10/2019]
import CB_Result from '@/components/CB_Result' // Component pour l'affichage des resultats au test [05/11/2019]

Vue.use(Router)

export default new Router({
  routes: [
    // Route vers l'affichage des questions [15/10/2019]
    {
      path: '/questionnaire',
      name: 'CB_Question',
      component: CB_Question
    },
    // Route racine du site [15/10/2019]
    {
      path: '/',
      name: 'CB_Register',
      component: CB_Register
    },
    // Route vers l'affichage des resultats [05/11/2019]
    {
      path: '/result',
      name: 'CB_Result',
      component: CB_Result
    }
  ]
})
