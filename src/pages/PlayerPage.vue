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
      <v-ons-list-item v-for="player in registeredPlayers" :key="player.name">
        <div class="center">{{ player.name }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>


<script>

export default {
  name: 'player',
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
            this.registeredPlayers.push({name: playerName})
            localStorage.players = JSON.stringify(this.registeredPlayers)
          }
        })
    }
  },
  computed: {
    registeredPlayers () {
      return this.$store.getters['players/players']
    }

  }

}
</script>
