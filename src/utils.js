const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

export { callAll }