import {
  clearUserData,
  logOut,
  setJwtExpired,
} from "../redux/reducers/userSlice"

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

export const tokenErrorHandler =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    console.log(action)
    if (action.payload && action.payload.status === 401) {
      console.log("hoilaaa")
      dispatch(setJwtExpired(true))
      dispatch(logOut())
      dispatch(clearUserData())
    }
    return next(action)
  }
