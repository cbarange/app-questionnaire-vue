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

> Fin de séance :  Répondre aux questions et affichage des résultats finaux 

**10 / 11 / 2019**
> Objectif : Mise en place de sauvegarde des réponses et les rendre consultables par l'administrateur

> Fin de séance :  Affichage de l'interface admin et sauvegarde des réponses dans le base de données local et distante

**17 / 11 / 2019**
> Objectif : Mise en place de sauvegarde des réponses et les rendre consultables par l'administrateur

> Fin de séance :  

## CouchDB for Ubuntu 18LTS

Install and Setup CouchDB :
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

> Create database _cb-app-questionnaire_ and create document with file _./ressource/CouchDB_Initdocument.json_

> [Full guide](https://linuxize.com/post/how-to-install-couchdb-on-ubuntu-18-04/)

## PouchDB

Install and Setup PouchDB :
```bash
# Install PouchDB
npm install pouchdb
# Setup CORS
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```
How to use it :
```js
import PouchDB from 'pouchdb'
// Setup PouchDB connection
var db = new PouchDB('database_name')
// Setup CouchDB connection
var db_remote = new PouchDB('http://localhost:5984/cb-app-questionnaire')
// Push document in CouchDB (local Database)
db.put(json_document)
// Pull document from CouchDB (local Database)
db.get(_idValue)
// Sync CouchDB (local Database) with PouchDB (Remote Database)
var sync = db.sync(db_remote, {live: true, retry: true})
```
> [PunchDB Guide](https://pouchdb.com/guides/setup-couchdb.html)

> [Sync PunchDB et CouchDB](https://blogtech.soprasteria.com/2016/09/05/synchronisation-multi-client-avec-couchdb-et-pouchdb/)

> [Fix CORS Header error](https://pouchdb.com/errors.html)

## BcryptJs

Install and Setup BcryptJs :
```bash
sudo npm install bcryptjs
```
How to use it :
```js
import bcrypt from 'bcryptjs'
// Generate random salt and print it
//var salt = bcrypt.genSaltSync(10)
//console.log(salt)
// Result of random salt
var salt = '$2a$10$gt/8moSeQUxRsy13qbeE4e'
// Hash of good password, use to compare with user password
var hash = '$2a$10$gt/8moSeQUxRsy13qbeE4edMnfbhKxIkSDB5NzYkY4BFz12KLn/MS'
// Generate hash of user password
var hash2 = bcrypt.hashSync("Password123", salt)
// Compate hash
if ( hash2 === hash )
	console.log('Good Password')
```
> [BcryptJs Doc](https://www.npmjs.com/package/bcryptjs)

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

