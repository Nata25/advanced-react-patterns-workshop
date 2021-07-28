// Compound Components
// http://localhost:3000/isolated/exercise/recap/toggle.js

import * as React from 'react'
import {Switch} from '../../switch'
import { useToggle, toggleReducer as defaultReducer } from './hooks/use-toggle'

const ToggleButton = ({ value, onChange }) => {
  return <button onClick={onChange}>{value ? 'on' : 'off'}</button>
}

const ResetButton = ({ onReset }) => {
  return <button onClick={onReset}>Reset</button>
}

const Info = ({ clickedTooMuch, timesClicked }) => {
  return (
    clickedTooMuch ? (
      <div data-testid="notice">
        Whoa, you clicked too much!
        <br />
      </div>
    ) : timesClicked > 0 ? (
      <div data-testid="click-count">Click count: {timesClicked}</div>
    ) : null
  )
}

const CounterButton = (props) => {
  return (
    <div>
      <button {...props}
      >
        click
      </button>
    </div>
  )
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4
  const { getTogglerProps, on, toggle, reset } = useToggle({ reducer: toggleStateReducer })
  
  function toggleStateReducer(state, action) {
    if (action.type === 'toggle' && timesClicked >= 4) {
      return {on: state.on}
    }
    return defaultReducer(state, action)
  }

  const onReset = () => {
    setTimesClicked(0)
    reset()
  }

  return (
    <div>
      <Switch {...getTogglerProps({on}) } />
      <ToggleButton value={on} onChange={toggle} />
      <ResetButton onReset={onReset} />
      <CounterButton {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => setTimesClicked(count => count + 1),
          id: 'custom-button-id',
          disabled: clickedTooMuch
        })} />
      <Info clickedTooMuch={clickedTooMuch} timesClicked={timesClicked} />
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
