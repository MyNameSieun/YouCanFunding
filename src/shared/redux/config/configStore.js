// src/configStore.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import categoryList from '../modules/categoryList';

const rootReducer = combineReducers({ categoryList });
const store = createStore(rootReducer);

export default store;
