import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import cards from './assets/cards.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cardpool: {
      namespaced: true,
      state: {
        cards: cards,
        cardsets: _(cards)
          .map(card => card.set)
          .uniq()
          .map(cardset => ({
            name: cardset,
            isUsed: true
          }))
          .value()
      },
      mutations: {
      },
      getters: {
        cards: state => state.cards,
        cardsets: state => state.cardsets,
        usedCardsets: state => _(state.cardsets)
          .filter(cardset => cardset.isUsed)
          .map(cardset => cardset.name)
          .value()
      }
    }
  }
})
