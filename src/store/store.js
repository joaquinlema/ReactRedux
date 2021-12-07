import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

//import reduxSaga from 'redux-saga';
//import rootSaga from '../sagas';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

//const sagaMiddleware = reduxSaga()

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
        //applyMiddleware(sagaMiddleware)
    )
);

//ejecuta las sagas del proyecto
//sagaMiddleware.run(rootSaga);
