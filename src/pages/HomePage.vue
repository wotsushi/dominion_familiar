<template>
  <v-ons-page>
    <v-ons-tabbar swipeable position="auto" :tabs="tabs" :visible="true" :index.sync="activeIndex" @postchange="saveStorage()">
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import game from './GamePage'
import players from './PlayerPage'

export default {
  name: 'home',
  data () {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: 'fa-home',
          label: 'Home',
          page: game
        },
        {
          icon: 'fa-users',
          label: 'Players',
          page: players
        }
      ]
    }
  },
  methods: {
    saveStorage () {
      localStorage.players = JSON.stringify(this.$store.getters['players/players'])
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
