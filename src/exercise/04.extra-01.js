// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => { setOn(!on) }

  const togglerProps = {'aria-pressed': on, onClick: toggle}

  function getTogglerProps(props) {
    const result = {...togglerProps}
    /* merge functions named the same */
    Object.keys(props).forEach(prop => {
      if (result.hasOwnProperty(prop)) {
        if (typeof result[prop] === 'function') {
          result[prop] = (...args) => {
            togglerProps[prop](...args)
            props[prop](...args)
          }
        }
      } else result[prop] = props[prop]
    })
    return result
  }

  return {on, toggle, getTogglerProps}
}

function customOnClick(e) {
  console.log(e.target)
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: customOnClick,
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
