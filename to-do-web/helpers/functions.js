export const checkIfExists = (data, item) => {
  if (data === undefined) {
    return false
  }
  if (data.some((elem) => elem.title === item)) {
    return true
  } else {
    return false
  }
}

export const getUnique = (arr) => [...new Set(arr)]

export const checkIfChanged = (prevValue, newValue) => {
  if (prevValue !== newValue) {
    return true
  }
}
