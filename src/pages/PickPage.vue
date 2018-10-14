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
      <v-ons-list-item v-for="kingdom in supplied_kingdoms" :key="kingdom.name">
        <div class="left">{{ kingdom.name }}</div>
        <div class="center">{{ kingdom.set }}</div>
        <div class="right">{{ kingdom.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Events</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="event in supplied_events" :key="event.name">
        <div class="left">{{ event.name }}</div>
        <div class="center">{{ event.set }}</div>
        <div class="right">{{ event.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Landmarks</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="landmark in supplied_landmarks" :key="landmark.name">
        <div class="left">{{ landmark.name }}</div>
        <div class="center">{{ landmark.set }}</div>
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
      supplied_kingdoms: [],
      supplied_events: [],
      supplied_landmarks: [],
      players: []
    }
  },
  methods: {
    startNewGame () {
      this.supplied_kingdoms = []
      this.supplied_events = []
      this.supplied_landmarks = []
      let cardpool = _(this.cards)
        .filter(card => _.includes(this.cardsets, card.set))
        .shuffle()
        .value()
      while (this.supplied_kingdoms.length < 10) {
        let card = cardpool.pop()
        if (card.type === 'kingdom') {
          this.supplied_kingdoms.push(card)
        } else if (card.type === 'event' && (this.supplied_events.length + this.supplied_landmarks.length) < 2) {
          this.supplied_events.push(card)
        } else if (card.type === 'landmark' && (this.supplied_events.length + this.supplied_landmarks.length) < 2) {
          this.supplied_landmarks.push(card)
        }
      }
      this.supplied_kingdoms = _.sortBy(this.supplied_kingdoms, ['cost'])
      this.supplied_events = _.sortBy(this.supplied_events, ['cost'])

      // this.supplies = _(this.cards)
      //   .filter(card => _.includes(this.cardsets, card.set))
      //   .sampleSize(10)
      //   .sortBy(['cost'])
      //   .value()

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
    events () {
      return this.$store.getters['cardpool/events']
    },
    landmarks () {
      return this.$store.getters['cardpool/landmarks']
    },
    registeredPlayers () {
      return this.$store.getters['players/players']
    }
  }

}
</script>
