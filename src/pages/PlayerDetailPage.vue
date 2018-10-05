<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-back-button @click="pop">Back</v-ons-back-button>
      </div>
      <div class="center">{{ player.name }}</div>
    </v-ons-toolbar>
    <v-ons-button @click="deletePlayer" style="background-color: red">Delete</v-ons-button>
  </v-ons-page>
</template>


<script>
export default {
  name: 'playerDetail',
  methods: {
    pop () {
      this.$emit('pop-page')
    },
    deletePlayer () {
      this.$ons.notification
        .confirm(
          `Are you sure you want to delete ${this.player.name}?`,
          {
            options: {
              buttonLabels: [
                'No',
                'Yes'
              ]
            }
          })
        .then((response) => {
          if (response) {
            this.$store.commit('players/deletePlayer', this.player)
            this.$store.commit('players/showPlayerDetail', null)
            this.$emit('pop-page')
          }
        })
    }
  },
  computed: {
    player () {
      return this.$store.getters['players/shownPlayer']
    }
  }
}
</script>