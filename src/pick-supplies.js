import _ from 'lodash'
import fp from 'lodash/fp'

/**
  * @param {Object} card The card object to create a string.
  * @return {string} A string of the expansion and the editions enclosing `card`.
  */
const getExpansionsString = _.cond([
  [
    fp.flow(
      _.property('editions'),
      fp.isEqual([1])
    ),
    _.property('expansion')
  ],
  [
    _.stubTrue,
    ({expansion, editions}) => `${expansion} #${editions}`
  ]
])

/**
  * @param {Object[]} expansions Expansions to be used.
  * @return {function(Object[]): Object[]} A filter function that takes cards `expansions` enclose.
  */
function filterCards (expansions) {
  return fp.filter(
    ({expansion, editions}) => expansions.some(
      ({name, edition, isUsed}) => name === expansion && editions.includes(edition) && isUsed
    )
  )
}

/**
  * @param {Object[]} cards Cards to be picked.
  * @return {Object[]} Picked cards to be supplied.
  */
const pickSuppliedCards = fp.reduce(
  (pickedCards, card) => {
    const {kingdom: numKingdoms = 0, event: numEvents = 0, landmark: numLandmarks = 0} = _.countBy(pickedCards, 'type')
    return (numKingdoms === 10 || ((card.type === 'event' || card.type === 'landmark') && numEvents + numLandmarks === 2))
      ? pickedCards : _.concat(pickedCards, card)
  },
  []
)

/**
  * @param {Object[]} cards Picked cards to be supplied.
  * @return {Object[]} Kingdom cards filtered from `cards` sorted by cost.
  */
const filterKingdomCards = fp.flow(
  fp.filter(['type', 'kingdom']),
  fp.sortBy(['cost'])
)

/**
  * @param {Object[]} cards Picked cards to be supplied.
  * @return {Object[]} Event cards filtered from `cards` sorted by cost.
  */
const filterEventCards = fp.flow(
  fp.filter(['type', 'event']),
  fp.sortBy(['cost'])
)

/**
  * @param {Object[]} cards Picked cards to be supplied.
  * @return {Object[]} Landmark cards filtered from `cards`.
  */
const filterLandmarkCards = fp.filter(['type', 'landmark'])

/**
  * @param {Object[]} cards (Shuffled) cards to be picked.
  * @return {Object} `null` if young witch do not used, otherwise a bane supply
  */
const pickBaneSupply = _.cond([
  [
    fp.flow(
      pickSuppliedCards,
      filterKingdomCards,
      fp.some(['name', '魔女娘'])
    ),
    cards => _.find(
      cards,
      card =>
        card.type === 'kingdom' &&
        (card.cost.startsWith('2') || card.cost.startsWith('3')) &&
        !pickSuppliedCards(cards).includes(card)
    )
  ],
  [
    _.stubTrue,
    _.constant(null)
  ]
])

/**
  * @param {Object[]} suppliedCards Cards to be supplied.
  * @return {string[]} Strings of options.
  */
function computeOptions (suppliedCards) {
  return _.concat(
    suppliedCards.some(card => 'cost' in card && card.cost.match(/P/)) ? 'ポーション' : [],
    _.head(suppliedCards).expansion === '繁栄' ? '植民地・白金貨' : [],
    _.last(suppliedCards).expansion === '暗黒時代' ? '共同墓地・草茂る屋敷・納屋' : []
  )
}
/**
   * @param {Object[]} registeredPlayers All registered players.
   * @return {Object[]} Players that will participate a game.
   */
const pickParticipants = fp.filter('isParticipated')

export default {
  getExpansionsString,
  filterCards,
  pickSuppliedCards,
  filterKingdomCards,
  filterEventCards,
  filterLandmarkCards,
  pickBaneSupply,
  computeOptions,
  pickParticipants
}
