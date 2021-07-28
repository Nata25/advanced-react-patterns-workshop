import React from 'react'

const ToggleContext = React.createContext()

const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(`\`useToggle\` should be used inside \`ToggleProvider\``)
  }
  const { on, toggle } = context
  const togglerProps = {
    onClick: toggle,
    'aria-pressed': on
  }

  // const callFns = (...fns) => (...args) => {
  //   fns.forEach(fn => fn && fn(...args))
  // }

  function callFns (...fns) {
    console.log(fns)
    return function () {
      fns.forEach(fn => fn && fn())
    }
  }

  const getTogglerProps = ({ onClick, ...rest }) => {
    return {
      onClick: callFns(onClick, toggle),
      ...rest
    }
  }

  return { on, toggle, togglerProps, getTogglerProps }
}

const ToggleProvider = ({ children }) => {
    const [on, setOn] = React.useState(false)
    const toggle = () => { setOn(!on) }

    return (
      <ToggleContext.Provider value={{ on, toggle }}>
        { children }
      </ToggleContext.Provider>
    )
  }

export {
  useToggle,
  ToggleProvider
}