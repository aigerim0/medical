import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import {galleryReducer} from "./galleryReducer";
import thunk from 'redux-thunk'


export const store = createStore(galleryReducer, composeWithDevTools(applyMiddleware(thunk)));