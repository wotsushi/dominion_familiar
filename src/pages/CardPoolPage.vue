<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-back-button @click="pop">Back</v-ons-back-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-title>Cardpool settings</v-ons-list-title>
      <v-ons-list-item v-for="cardset in cardsets" :key="`${cardset.name} #${cardset.edition}`">
        <label class="center" :for="cardset.name">
          {{ `${cardset.name} ${cardset.edition === 1 ? "" : "#" + cardset.edition}` }}
        </label>
        <div class="right">
          <v-ons-switch :input-id="cardset.name" v-model="cardset.isUsed">
          </v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>


<script>
export default {
  name: 'cardpool',
  data () {
    return {
      msg: 'Configuration of Card Pool'
    }
  },
  methods: {
    pop () {
      localStorage.cardsets = JSON.stringify(this.cardsets)
      this.$emit('pop-page')
    }
  },
  computed: {
    cardsets () {
      return this.$store.getters['cardpool/cardsets']
    }
  }
}
</script>
