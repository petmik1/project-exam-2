export function save(key, state) {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  }