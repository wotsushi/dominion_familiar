<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <v-ons-list-title>Supplies</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="supply in supplies" :key="supply.name">
        <div class="left">{{ supply.name }}</div>
        <div class="center">{{ supply.set }}</div>
        <div class="right">{{ supply.cost }}</div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-button @click="makeSupplies()">Make Supplies</v-ons-button>

  </v-ons-page>
</template>

<script>
import cards from '../assets/cards.json'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Dominion Familiar',
      supplies: [],
      cardpool: cards
    }
  },
  methods: {
    makeSupplies () {
      this.supplies = this._.sortBy(this._.sampleSize(this.cardpool, 10), ['cost'])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
