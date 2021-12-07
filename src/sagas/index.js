import { all } from 'redux-saga/effects';
import auth from './auth';

//permite ejecutar los watchers de todas las sagas
export default function* rootSaga() {
    yield all([
        auth()
    ]);
}