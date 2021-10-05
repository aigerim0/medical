const initialState = {
    gallery: [],

}

export const galleryReducer = (state = initialState, action) => {
switch (action.type){
    case 'GET_PROJECT':
        return {...state,gallery:action.payload}
}
return state
}