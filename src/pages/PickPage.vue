<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="center">{{ msg }}</div>
      <div class="right">
        <v-ons-toolbar-button @click="configureCardPool()">
          <v-ons-icon icon="fa-bars"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <v-ons-button @click="startNewGame()">New Game</v-ons-button>
    <v-ons-list-title>Supplies</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="supply in supplies" :key="supply.name">
        <div class="left">{{ supply.name }}</div>
        <div class="center">{{ supply.set }}</div>
        <div class="right">{{ supply.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Players</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="player in players" :key="player.name">
        <div class="center">{{ player.name }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>


<script>
import _ from 'lodash'
import cardPool from './CardPoolPage'

export default {
  name: 'pick',
  data () {
    return {
      msg: 'Dominion Familiar',
      supplies: [],
      players: []
    }
  },
  methods: {
    startNewGame () {
      this.supplies = _(this.cards)
        .filter(card => _.includes(this.cardsets, card.set))
        .sampleSize(10)
        .sortBy(['cost'])
        .value()
      this.players = _(this.registeredPlayers)
        .filter(registeredPlayer => registeredPlayer.isParticipated)
        .shuffle()
        .value()
    },
    configureCardPool () {
      this.$emit('push-page', cardPool)
    }
  },
  computed: {
    cards () {
      return this.$store.getters['cardpool/cards']
    },
    cardsets () {
      return this.$store.getters['cardpool/usedCardsets']
    },
    registeredPlayers () {
      return this.$store.getters['players/players']
    }
  }

}
</script>
