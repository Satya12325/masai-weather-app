import { createStore,applyMiddleware,compose } from "redux"
import { rootReducer } from "./Reducer"
import thunk from 'redux-thunk'

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,createComposer(applyMiddleware(thunk)))