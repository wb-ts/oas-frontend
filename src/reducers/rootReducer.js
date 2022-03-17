import CollectionReducer from './collectionReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    Collection: CollectionReducer
})

export default rootReducer