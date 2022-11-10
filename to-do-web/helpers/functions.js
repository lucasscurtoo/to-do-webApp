export const defaultList = [{
    title: 'My list',
    todo: [],
    user: {
        username: typeof window !== 'undefined' ? localStorage.getItem('username') : null
    }
}]

export const checkIfExists = (data, item) => {
    console.log(data, item)
    console.log('exitse', data.some(elem => elem.title === item))
    if (data.some(elem => elem.title === item)){
        return true
     }else {
        return false
     }
}

