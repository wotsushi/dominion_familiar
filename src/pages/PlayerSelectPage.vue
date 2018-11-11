<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="center">{{ msg }}</div>
      <div class="right">
        <v-ons-toolbar-button @click="registerPlayer()">
          <v-ons-icon icon="fa-user-plus"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <v-ons-button @click="f">Sign In</v-ons-button>
    <p v-show="username !== ''">
      Welcome {{ username }} !!
    </p>
    <v-ons-list-title>Players</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item tappable v-for="player in registeredPlayers" :key="player.name">
        <div class="center" @click="showPlayerDetail(player)">{{ player.name }}</div>
        <div class="right">
          <v-ons-switch :input-id="player.name" v-model="player.isParticipated">
          </v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>


<script>
import playerDetail from './PlayerDetailPage'
import firebase from 'firebase'

export default {
  name: 'playerSelect',
  data () {
    return {
      msg: 'Players',
      username: ''
    }
  },
  methods: {
    registerPlayer () {
      this.$ons.notification
        .prompt(
          'Input the player\'s name',
          {
            title: 'Player registration',
            cancelable: true
          })
        .then((playerName) => {
          if (playerName) {
            this.registeredPlayers.push({
              name: playerName,
              isParticipated: true
            })
            localStorage.players = JSON.stringify(this.registeredPlayers)
          }
        })
    },
    showPlayerDetail (player) {
      this.$store.commit('players/showPlayerDetail', player)
      this.$emit('push-page', playerDetail)
    },
    f () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    }
  },
  computed: {
    registeredPlayers () {
      return this.$store.getters['players/players']
    }
  },
  mounted () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5tYM10bUIWnl5dLIHaVkDlpKq6LTzKno',
      authDomain: 'dominion-familiar.firebaseapp.com',
      databaseURL: 'https://dominion-familiar.firebaseio.com',
      projectId: 'dominion-familiar',
      storageBucket: 'dominion-familiar.appspot.com',
      messagingSenderId: '429711557592'
    })
    firebase.auth().getRedirectResult().then(result => {
      if (result.credential) {
        this.username = result.user.displayName
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken
      // ...
      }
    }).catch(error => {
      console.log(error)
      // Handle Errors here.
      // var errorCode = error.code
      // var errorMessage = error.message
      // The email of the user's account used.
      // var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential
      // ...
    })
  }
}
</script>
