import React from 'react'

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset': {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

const useToggle = ({ initialState = { on: false } } = {}) => {
  const [state, dispatch] = React.useReducer(toggleReducer, initialState)
  const toggle = () => dispatch({type: 'toggle'})
  const reset = () => dispatch({type: 'reset', initialState})

  const callFns = (...fns) => (...args) => {
    fns.forEach(fn => fn && fn(...args))
  }

  const getTogglerProps = ({ onClick, ...rest }) => {
    return {
      onClick: callFns(onClick, toggle),
      ...rest
    }
  }

  return { on: state.on, toggle, reset, getTogglerProps }
}

export {
  useToggle
}