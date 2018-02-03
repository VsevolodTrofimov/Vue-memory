import {snapAction, MockPromise, resetTimetable} from 'vuex-snapshot'

import * as actions from '@/src/store/actions.js'


describe('Game actions', () => {
  describe('Flip card', () => {
    it('Matches "flipping first card" snapshot', () => {
      const getters = {flipped: Array(0)}
      const card = {flipped: false, url: 'AS'}

      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()
    })

    it('Matches "flipping second card" snapshot', () => {
      const getters = {flipped: Array(1)}
      const card = {flipped: false, url: 'AS'}

      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()
    })

    it('Matches "2 flipped cards -> again" snapshot', () => {
      const getters = {flipped: Array(2)}

      const card = {flipped: true, url: 'AS'}
      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()

      card.flipped = false
      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()
    })

    
    // inactive states
    it('Matches "flipping same card" snapshot', () => {
      const getters = {flipped: Array(1)}
      const card = {flipped: true, url: 'AS'}

      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()
    })


    it('Matches "card is hidden" snapshot', () => {
      const getters = {flipped: Array(0)}
      const card = {flipped: true, url: 'AS', hidden: true}

      expect(
        snapAction(actions.flipCard, {getters, payload: card})
      ).toMatchSnapshot()
    })
  })

  describe('Match cards', () => {
    it('Matches "match" snapshot', () => {
      const getters = {
        flipped: [{id: 1}, {id: 1}]
      }
    
      expect(snapAction(actions.matchCards, {getters})).toMatchSnapshot()
    })

    it('Matches "mismatch" snapshot', () => {
      const getters = {
        flipped: [{id: 1}, {id: 2}]
      }
    
      expect(snapAction(actions.matchCards, {getters})).toMatchSnapshot()
    })
  })

  describe('Apply card match', () => {
    it('Matches "default" snapshot', () => {
      const getters = {
        score: 150,
        matched: 10,
        unmatched: 10,
        flipped: ['card1', 'card2']
      }
    
      expect(snapAction(actions.applyCardMatch, {getters})).toMatchSnapshot()
    })

    it('Matches "last pair" snapshot', () => {
      // should think about expecting getters to update state
      const getters = {
        score: 150,
        matched: 10,
        unmatched: 0,
        flipped: ['card1', 'card2']
      }
    
      expect(snapAction(actions.applyCardMatch, {getters})).toMatchSnapshot()
    })

  })
})