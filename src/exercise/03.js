// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{ on, toggle }} children={children} />
}

function useToggleContext () {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(`Use \`Toggle\` component as a wrapper to provide context for compound child components`)
  }
  return context
}

// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({ children }) {
  const { on } = useToggleContext()
  return on ? children : null
}

function ToggleOff({ children }) {
  const { on } = useToggleContext()
  return on ? null : children
}

function ToggleButton({...props}) {
  const { on, toggle } = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
