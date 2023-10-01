export function load(key) {
    try {
      const serializedState = localStorage.getItem(key)
      return JSON.parse(serializedState)
    } catch {
      return undefined
    }
  }