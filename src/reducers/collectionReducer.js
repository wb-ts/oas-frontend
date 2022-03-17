const initState = {
    collectionState : {
        currentCollection : {
            name : "",
            slug : ""
        },
        listedCollections : []
    },
    scrollPosition : 0
}

const collectionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_COLLECTION_STATE':
            return {
                ...state ,
                collectionState: action.payload
            }
        case 'SET_SCROLLPOSITION':
            return {
                ...state ,
                scrollPosition: action.payload
            }
        default :
            return state;
    }
}
export default collectionReducer;