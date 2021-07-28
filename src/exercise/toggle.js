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
  const { getTogglerProps, on } = useToggle()
  return (
    <button {...getTogglerProps({
        'aria-label': 'custom-button',
        // onClick: () => customClick('hello from custom click'),
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
