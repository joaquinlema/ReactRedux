import { put, call, takeLatest } from 'redux-saga/effects';
import { types } from '../types/types';

export function* login({ payload }) {
    try {
        console.log('escuchamos la llamada de login');
        yield put({ type: types.login, payload })
    } catch (error) {

    }
}

//watcher de redux saga
//toma como parametro la nombre de la accion que se ejecuta y el metodo a ejecutar
export default function* auth() {
    yield takeLatest(types.login, login);
}