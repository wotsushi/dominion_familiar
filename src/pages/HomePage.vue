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
export default {
  name: 'home',
  data () {
    return {
      msg: 'Dominion Familiar',
      supplies: [],
      cardpool: [
        {
          name: '地下貯蔵庫',
          set: '基本',
          cost: 2
        },
        {
          name: '礼拝堂',
          set: '基本',
          cost: 2
        },
        {
          name: '堀',
          set: '基本',
          cost: 2
        },
        {
          name: '家臣',
          set: '基本',
          cost: 3
        },
        {
          name: '鍛冶屋',
          set: '基本',
          cost: 4
        },
        {
          name: '研究所',
          set: '基本',
          cost: 5
        },
        {
          name: '山賊',
          set: '基本',
          cost: 5
        },
        {
          name: '魔女',
          set: '基本',
          cost: 5
        },
        {
          name: '倒壊',
          set: '冒険',
          cost: 2
        },
        {
          name: '地下牢',
          set: '冒険',
          cost: 3
        },
        {
          name: 'カササギ',
          set: '冒険',
          cost: 4
        },
        {
          name: '守銭奴',
          set: '冒険',
          cost: 4
        },
        {
          name: '沼の妖婆',
          set: '冒険',
          cost: 5
        },
        {
          name: 'ワイン商',
          set: '冒険',
          cost: 5
        },
        {
          name: '雇人',
          set: '冒険',
          cost: 6
        }
      ]
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
