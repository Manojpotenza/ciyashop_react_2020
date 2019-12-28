import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk'
import combineReducers from '../reducers';

function StorageInSave(getstate){
    const getdatainState = JSON.stringify(getstate)
    localStorage.setItem('state', getdatainState)
}

function Storagereload()  {
    const getdatainState = localStorage.getItem('state')
    if(getdatainState === null) return undefined
    return JSON.parse(getdatainState)
}

const loadedState = Storagereload()

const enhancers = [];

const middleware = [
  thunk
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

const store = createStore(combineReducers, loadedState, composedEnhancers);

store.subscribe(() => {
    const getstate = store.getState();
    StorageInSave(getstate);
    
});

export default store;