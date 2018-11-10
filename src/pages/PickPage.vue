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
      <v-ons-list-item v-for="kingdom in suppliedKingdoms" :key="kingdom.name">
        <div class="left">{{ kingdom.name }}</div>
        <div class="center">{{ showExpansions(kingdom) }}</div>
        <div class="right">{{ kingdom.cost }}</div>
      </v-ons-list-item>
    <div v-if="baneSupply">
      <v-ons-list-header>Bane</v-ons-list-header>
        <v-ons-list-item>
          <div class="left">{{ baneSupply.name }}</div>
          <div class="center">{{ showExpansions(baneSupply) }}</div>
          <div class="right">{{ baneSupply.cost }}</div>
        </v-ons-list-item>
    </div>
    </v-ons-list>
    <v-ons-list-title>Events</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="event in suppliedEvents" :key="event.name">
        <div class="left">{{ event.name }}</div>
        <div class="center">{{ showExpansions(event) }}</div>
        <div class="right">{{ event.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Landmarks</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="landmark in suppliedLandmarks" :key="landmark.name">
        <div class="left">{{ landmark.name }}</div>
        <div class="center">{{ showExpansions(landmark) }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Options</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="option in options" :key="option">
        <div class="left">{{ option }}</div>
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
import pick from '../pick-supplies'
import cardPool from './CardPoolPage'

export default {
  name: 'pick',
  data () {
    return {
      msg: 'Dominion Familiar',
      suppliedKingdoms: [],
      suppliedEvents: [],
      suppliedLandmarks: [],
      baneSupply: null,
      options: [],
      players: []
    }
  },
  methods: {
    startNewGame () {
      const shuffledCards = pick.filterCards(this.expansions)(_.shuffle(this.cards))
      const suppliedCards = pick.pickSuppliedCards(shuffledCards)

      this.suppliedKingdoms = pick.filterKingdomCards(suppliedCards)
      this.suppliedEvents = pick.filterEventCards(suppliedCards)
      this.suppliedLandmarks = pick.filterLandmarkCards(suppliedCards)
      this.baneSupply = pick.pickBaneSupply(shuffledCards)(suppliedCards)
      this.options = pick.computeOptions(suppliedCards)
      this.players = pick.pickParticipants(_.shuffle(this.registeredPlayers))
    },
    configureCardPool () {
      this.$emit('push-page', cardPool)
    },
    showExpansions: pick.getExpansionsString
  },
  computed: {
    cards () {
      return this.$store.getters['cardpool/cards']
    },
    expansions () {
      return this.$store.getters['cardpool/expansions']
    },
    registeredPlayers () {
      return this.$store.getters['players/players']
    }
  }

}
</script>
