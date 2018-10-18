import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import cards from './assets/cards.json'

if (!localStorage.getItem('cardsets')) {
  localStorage.cardsets = JSON.stringify(
    _.concat(...cards.cardsets.map(
      ({name, latestEdition}) => _.range(1, latestEdition + 1)
        .map(edition => ({
          name: name,
          edition: edition,
          isUsed: true
        }))
    ))
  )
}
if (!localStorage.getItem('players')) {
  localStorage.players = JSON.stringify([])
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cardpool: {
      namespaced: true,
      state: {
        cards: cards.cards,
        cardsets: JSON.parse(localStorage.cardsets)
      },
      mutations: {
      },
      getters: {
        cards: state => state.cards,
        cardsets: state => state.cardsets,
        events: state => state.events,
        landmarks: state => state.landmarks
      }
    },
    players: {
      namespaced: true,
      state: {
        players: JSON.parse(localStorage.players),
        shownPlayer: null
      },
      getters: {
        players: state => state.players,
        shownPlayer: state => state.shownPlayer
      },
      mutations: {
        showPlayerDetail (state, player) {
          state.shownPlayer = player
        },
        deletePlayer (state, player) {
          state.players = state.players.filter((p) => p !== player)
        }
      }
    }
  }
})
