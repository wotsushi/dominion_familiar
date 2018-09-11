import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import cards from './assets/cards.json'

if (!localStorage.getItem('cardsets')) {
  localStorage.cardsets = JSON.stringify(
    _(cards)
      .map(card => card.set)
      .uniq()
      .map(cardset => ({
        name: cardset,
        isUsed: true
      }))
      .value()
  )
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cardpool: {
      namespaced: true,
      state: {
        cards: cards,
        cardsets: JSON.parse(localStorage.cardsets)
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
