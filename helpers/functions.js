export const checkIfExists = (data, item, itemToSearch) => {
  if (data === undefined) {
    return false
  } else if (data.some((elem) => elem[itemToSearch] === item)) {
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
