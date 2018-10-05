<template>
  <v-ons-page>
    <v-ons-navigator swipeable :page-stack="pageStack" @push-page="pageStack.push($event)" @pop-page="pageStack.pop()">
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
import playerSelect from './PlayerSelectPage'

export default {
  name: 'playerPage',
  data () {
    return {
      pageStack: [playerSelect]
    }
  }
}
</script>

