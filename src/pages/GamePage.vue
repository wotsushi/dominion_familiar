<template>
  <v-ons-page>
    <v-ons-navigator swipeable :page-stack="pageStack" @push-page="pageStack.push($event)" @pop-page="pageStack.pop()">
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
import pick from './PickPage'

export default {
  name: 'home',
  data () {
    return {
      pageStack: [pick]
    }
  }
}
</script>

