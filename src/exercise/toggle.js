// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'
import { useToggle } from './hooks/use-toggle'

const ToggleButton = () => {
  const { on, getTogglerProps } = useToggle()
  return <Switch {...getTogglerProps({on}) } />
}

const customClick = (arg) => console.info('onButtonClick', arg)

const IndicatorButton = () => {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4

  function toggleStateReducer(state, action) {
    switch (action.type) {
      case 'toggle': {
        if (clickedTooMuch) {
          return {on: state.on}
        }
        return {on: !state.on}
      }
      case 'reset': {
        return {on: false}
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`)
      }
    }
  }

  const { getTogglerProps, on } = useToggle({ reducer: toggleStateReducer })
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
      <button {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => setTimesClicked(count => count + 1),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
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
