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

export default {
  name: 'playerSelect',
  data () {
    return {
      msg: 'Players'
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
    }
  },
  computed: {
    registeredPlayers () {
      return this.$store.getters['players/players']
    }
  }
}
</script>
