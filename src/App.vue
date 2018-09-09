<template>
  <v-ons-page id="app">
　  <home-page></home-page>
  </v-ons-page>
</template>

<script>
import HomePage from './pages/HomePage'

export default {
  name: 'app',
  components: {
    HomePage
  }
}
</script>
