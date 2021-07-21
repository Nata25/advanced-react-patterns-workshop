// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import warning from 'warning'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  readOnly = false,
  on: controlledOn = null
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const onIsControlled = controlledOn !== null

  const on = onIsControlled ? controlledOn : state.on
  
  /* track changes in Toggle controlled/uncontrolled status */
  const onWasControlled = React.useRef(onIsControlled)

  /* Readonly warning */
  React.useEffect(() => {
    warning(
      !(onIsControlled && !onChange && !readOnly),
      `Warning: Failed prop type: You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field. If the field should be mutable use \`defaultValue\`. Otherwise, set either \`onChange\` or \`readOnly\``
    )

    /* Change from uncontrolled to controlled */
    warning(
      !(!onWasControlled.current && onIsControlled),
      `Warning: A component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components`
    )

    warning(
      !(onWasControlled.current && !onIsControlled),
      `Warning: A component is changing a controlled input of type undefined to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components`
    )
  }, [onChange, onIsControlled, readOnly, onWasControlled])

  function dispatchWithOnChange(action) {
    if (!onIsControlled) dispatch(action)
    onChange && onChange(reducer({...state, on}, action), action)
  }

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () => dispatchWithOnChange({type: actionTypes.reset, initialState})

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

function Toggle({on: controlledOn, onChange, readOnly}) {
  const {on, getTogglerProps} = useToggle({on: controlledOn, onChange, readOnly})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function App() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)
  // for test warnings only
  const [on, setOn] = React.useState(false)
  const [nullOn, setNullOn] = React.useState(null)

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick() {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
        <p>Readonly</p>
        <Toggle on={true} readOnly />
        <p>Uncontrolled input is turned to controlled </p>
        <Toggle on={nullOn} onChange={() => setNullOn(true)} />
        <p>Controlled input is turned to uncontrolled </p>
        <Toggle on={on} onChange={() => setOn(null)} />
      </div>
    </div>
  )
}

export default App
// we're adding the Toggle export for tests
export {Toggle}

/*
eslint
  no-unused-vars: "off",
*/
