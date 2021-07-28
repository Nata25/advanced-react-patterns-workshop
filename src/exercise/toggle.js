// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'
import { useToggle, toggleReducer as defaultReducer } from './hooks/use-toggle'

const ToggleButton = () => {
  const { on, getTogglerProps } = useToggle()
  return <Switch {...getTogglerProps({on}) } />
}

const customClick = (arg) => console.info('onButtonClick', arg)

const IndicatorButton = () => {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4
  const { getTogglerProps, on, reset } = useToggle({ reducer: toggleStateReducer })
  
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
      {clickedTooMuch ? (
          <div data-testid="notice">
            Whoa, you clicked too much!
            <br />
          </div>
        ) : timesClicked > 0 ? (
          <div data-testid="click-count">Click count: {timesClicked}</div>
        ) : null
      }
      <button onClick={onReset}>Reset</button>
      <button {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => setTimesClicked(count => count + 1),
          id: 'custom-button-id',
          disabled: clickedTooMuch
        })}
      >
        click
      </button>
    </div>
  )
} 

function App() {
  return (
    <div>
      <ToggleButton />
      <IndicatorButton />
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
