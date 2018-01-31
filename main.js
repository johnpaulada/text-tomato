import { h, app } from "hyperapp"
/** @jsx h */

const toWords = number => {
  const wordIndex = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four',
    5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
    10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen',
    15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'fourty', 50: 'fifty', 60: 'sixty'
  }

  if (number > 19) {
    const ones    = number % 10
    const tens    = Math.floor(number / 10)
    const oneWord = ones === 0 ? '' : wordIndex[ones]
    const tenWord = wordIndex[tens * 10]

    return `${tenWord} ${oneWord}`
  } else {
    return wordIndex[number]
  }
}

const state = {
  remaining: 25,
  focus: 25,
  rest: 5,
  mode: 'focus',
  timer: null
}

const actions = {
  plusFocus: () => state => ({focus: state.focus + 1}),
  minusFocus: () => state => ({focus: state.focus === 1 ? 1 : state.focus - 1}),
  plusRest: () => state => ({rest: state.rest + 1}),
  minusRest: () => state => ({rest: state.rest === 1 ? 1 : state.rest - 1}),
  decrement: () => state => ({remaining: state.remaining - 1}),
  startFocus: () => (state, actions) => {
    const timer = new Timer({
      tick: 60,
      ontick: () => actions.decrement(), 
      onend: () => actions.startBreak()
    })
    
    timer.start(60*state.focus)

    return {timer, remaining: state.focus, mode: 'focus'}
  },
  startBreak: () => (state, actions) => {
    const timer = new Timer({
      tick: 60,
      ontick: () => actions.decrement(), 
      onend: () => actions.startFocus()
    })
    
    timer.start(60*state.rest)

    return {timer, remaining: state.focus, mode: 'break'}
  },
  reset: () => (state, actions) => {
    if (state.timer) {
      state.timer.stop()
    }

    return {timer: null, remaining: 25, focus: 25, rest: 5, mode: 'focus'}
  }
}

const view = (state, actions) => (
  <div class="container">
    <div class="display">
      <h2 class="display__time display--text">{toWords(state.remaining)}</h2>
      <h3 class="display__details display--text">MINUTES LEFT ({state.mode})</h3>
    </div>
    <div class="options">
      <div class="options__box">
        <h3 class="options__option focus">{toWords(state.focus)}</h3>
        <h4 class="options__description"><span onclick={actions.plusFocus}>plus</span> | <span onclick={actions.minusFocus}>minus</span> | <span onclick={actions.startFocus}>start</span> | <span onclick={actions.reset}>reset</span></h4>
        <h4 class="options__description">FOCUS</h4>
      </div>
      <div class="options__box">
        <h3 class="options__option rest">{toWords(state.rest)}</h3>
        <h4 class="options__description"><span onclick={actions.plusRest}>plus</span> | <span onclick={actions.minusRest}>minus</span> | <span onclick={actions.startBreak}>start</span> | <span onclick={actions.reset}>reset</span></h4>
        <h4 class="options__description">BREAK</h4>
      </div>
    </div>
  </div>
)

const main = app(state, actions, view, document.body)