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
        <div class="center">{{ showCardsets(kingdom) }}</div>
        <div class="right">{{ kingdom.cost }}</div>
      </v-ons-list-item>
    <div v-if="baneSupply">
      <v-ons-list-header>Bane</v-ons-list-header>
        <v-ons-list-item>
          <div class="left">{{ baneSupply.name }}</div>
          <div class="center">{{ showCardsets(baneSupply) }}</div>
          <div class="right">{{ baneSupply.cost }}</div>
        </v-ons-list-item>
    </div>
    </v-ons-list>
    <v-ons-list-title>Events</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="event in suppliedEvents" :key="event.name">
        <div class="left">{{ event.name }}</div>
        <div class="center">{{ showCardsets(event) }}</div>
        <div class="right">{{ event.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-title>Landmarks</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="landmark in suppliedLandmarks" :key="landmark.name">
        <div class="left">{{ landmark.name }}</div>
        <div class="center">{{ showCardsets(landmark) }}</div>
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
      let suppliedCards = _(this.cards)
        .filter(({set, editions}) =>
          this.cardsets.some(({name, edition, isUsed}) =>
            name === set && editions.includes(edition) && isUsed))
        .shuffle()
        .reduce((takenCards, card) => {
          let {kingdom: numKingdoms = 0, event: numEvents = 0, landmark: numLandmarks = 0} = _.countBy(takenCards, 'type')
          if (numKingdoms === 10 || ((card.type === 'event' || card.type === 'landmark') && numEvents + numLandmarks === 2)) {
            return takenCards
          } else {
            return _.concat(takenCards, card)
          }
        }, [])
      this.suppliedKingdoms = _(suppliedCards)
        .filter(['type', 'kingdom'])
        .sortBy(['cost'])
        .value()
      this.suppliedEvents = _(suppliedCards)
        .filter(['type', 'event'])
        .sortBy(['cost'])
        .value()
      this.suppliedLandmarks = _(suppliedCards)
        .filter(['type', 'landmark'])
        .value()
      if (this.suppliedKingdoms.some(({name}) => name === '魔女娘')) {
        this.baneSupply = _(this.cards)
          .filter((card) =>
            this.cardsets.some(({name, edition, isUsed}) => name === card.set && card.editions.includes(edition) && isUsed) &&
            card.type === 'kingdom' &&
            (card.cost.startsWith('2') || card.cost.startsWith('3')) &&
            !this.suppliedKingdoms.includes(card))
          .sample()
      } else {
        this.baneSupply = null
      }
      this.options = _.concat(
        suppliedCards.some(({cost}) => cost.match(/P/)) ? 'ポーション' : [],
        _.head(suppliedCards).set === '繁栄' ? '植民地・白金貨' : [],
        _.last(suppliedCards).set === '暗黒時代' ? '共同墓地・草茂る屋敷・納屋' : []
      )

      this.players = _(this.registeredPlayers)
        .filter('isParticipated')
        .shuffle()
        .value()
    },
    configureCardPool () {
      this.$emit('push-page', cardPool)
    },
    showCardsets (card) {
      if (_.isEqual(card.editions, [1])) {
        return card.set
      } else {
        return `${card.set} #${card.editions}`
      }
    }
  },
  computed: {
    cards () {
      return this.$store.getters['cardpool/cards']
    },
    cardsets () {
      return this.$store.getters['cardpool/cardsets']
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
