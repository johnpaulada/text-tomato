import { h, app } from "hyperapp"
/** @jsx h */

const toWords = number => {
  let words = ""
  let power = ""
  const wordIndex = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
  }

  while (number > 0) {
    const digit = number % 10;
    number = Math.floor(number / 10)
  }
}

const state = {
  remaining: 25,
  focus: 25,
  rest: 5,
  mode: 'focus'
}

const actions = {
  plusFocus: () => state => ({focus: state.focus + 1}),
  minusFocus: () => state => ({focus: state.focus === 1 ? 1 : state.focus - 1}),
  plusRest: () => state => ({focus: state.rest + 1}),
  minusRest: () => state => ({focus: state.rest === 1 ? 1 : state.rest - 1}),
  decrement: () => state => ({remaining: state.remaining - 1}),
  start: () => (state, actions) => {
    const timer = new Timer({
      tick: 60,
      ontick: ms => {
        actions.decrement()
      }
    })
    
    timer.start(60*state.focus)

    return {remaining: state.focus}
  }
}

const view = (state, actions) => (
  <div class="container">
    <div class="display">
      <h2 class="display__time display--text">{state.remaining}</h2>
      <h3 class="display__details display--text">MINUTES LEFT ({state.mode})</h3>
    </div>
    <div class="options">
      <div class="options__box">
        <h3 class="options__option focus">{state.focus}</h3>
        <h4 class="options__description">FOCUS | <span onclick={actions.plusFocus}>plus</span> | <span onclick={actions.minusFocus}>minus</span> | <span onclick={actions.start}>start</span></h4>
      </div>
      <div class="options__box">
        <h3 class="options__option rest">{state.rest}</h3>
        <h4 class="options__description">REST | <span onclick={actions.plusRest}>plus</span> | <span onclick={actions.minusRest}>minus</span> | <span onclick={actions.start}>start</span></h4>
      </div>
    </div>
  </div>
)

const main = app(state, actions, view, document.body)