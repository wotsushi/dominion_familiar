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
      <v-ons-list-item v-for="expansion in expansions" :key="`${expansion.name} #${expansion.edition}`">
        <label class="center" :for="expansion.name">
          {{ `${expansion.name} ${expansion.edition === 1 ? "" : "#" + expansion.edition}` }}
        </label>
        <div class="right">
          <v-ons-switch :input-id="expansion.name" v-model="expansion.isUsed">
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
      localStorage.expansions = JSON.stringify(this.expansions)
      this.$emit('pop-page')
    }
  },
  computed: {
    expansions () {
      return this.$store.getters['cardpool/expansions']
    }
  }
}
</script>
