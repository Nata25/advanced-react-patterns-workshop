// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'
import { useToggle, ToggleProvider } from './context/toggle-context'

function Toggle({ children }) {
  return (
    <ToggleProvider>
      {children}
    </ToggleProvider>
  )
}

const ToggleOn = ({children}) => {
  const { on } = useToggle()
  return on ? children : null
}

const ToggleOff = ({children}) => {
  const { on } = useToggle()
  return on ? null : children
} 

const ToggleButton = () => {
  const { on, togglerProps } = useToggle()
  return <Switch on={on} {...togglerProps } />
}

const customClick = (arg) => console.info('onButtonClick', arg)

const IndicatorButton = () => {
  const { getTogglerProps, on } = useToggle()
  return (
    <button {...getTogglerProps({
        'aria-label': 'custom-button',
        onClick: () => customClick('hello'),
        id: 'custom-button-id',
      })}
    >
      {on ? 'on' : 'off'}
    </button>
  )
} 

function App() {
  return (
    <div>
      <Toggle>
        {/* <ToggleOn>The button is on</ToggleOn> */}
        {/* <ToggleOff>The button is off</ToggleOff> */}
        <ToggleButton />
        <IndicatorButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
