# app-questionnaire - VueJs

> Lien build
[https://cbarange.github.io/](https://cbarange.github.io/)

## Planning

**14 / 10 / 2019**
> Objectif : Mise en place du projet et de repo de build

> Fin de séance : Projet et GitHub Pages mis en place

**15 / 10 / 2019**
> Objectif : Mise en place des components principaux, des routes, installation de couchdb

> Fin de séance : CouchDb mis en place, Question Register Header et Footer component mis en place

**05 / 11 / 2019**
> Objectif : Mise en place de sauvegarde des réponses et les rendre consultables par l'administrateur

> Fin de séance :  

**04 / 12 / 2019**
> Objectif : 

> Fin de séance :  

## CouchDB

``` bash
# Start by adding the CouchDB GPG key to your system using the following command
curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | sudo apt-key add -
# Once the key is imported, add the CouchDB repository with
echo "deb https://apache.bintray.com/couchdb-deb bionic main" | sudo tee -a /etc/apt/sources.list
# Now that the repository is enabled update the packages list and install CouchDB
sudo apt update
sudo apt install couchdb
# To verify whether the installation has completed successfully run the following command
curl http://127.0.0.1:5984/
# Maybe need to start service
sudo service couchdb start
```

> Use this url to configure DataBase [http://127.0.0.1:5984/_utils/](http://127.0.0.1:5984/_utils/)

> [Full guide](https://linuxize.com/post/how-to-install-couchdb-on-ubuntu-18-04/)

## Build Setup

``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

More details about github pages : [GuideGitHubPages](https://pages.github.com/)

## Setup WebPack and Vue-cli

``` bash
sudo apt update && sudo apt upgrade
sudo apt-get install nodejs npm
sudo npm install -g @vue/cli
npm install -g @vue/cli-init
vue --version
# Need 3.X or more
vue init webpack projectName # Create new blank project with webpack setting
npm run dev # Execute dev server
npm run build # Compile project
```
> [Full guide](https://www.pierrefay.fr/formation-vuejs/d%C3%A9couverte-installation-tutoriel.html)

