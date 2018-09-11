<template>
  <v-ons-navigator swipeable :page-stack="pageStack" @push-page="pageStack.push($event)" @pop-page="pageStack.pop()">
  </v-ons-navigator>
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
