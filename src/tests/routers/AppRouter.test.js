/**
 * @jest-environment jsdom
*/

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const user = { uid: '6OYT1hgrWoZcgDl1JqaJQ3huInE2', displayName: null };
const authMock = {
    firebase: {
        auth: () => ({
            signOut: jest.fn(),
            signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user })),
            onAuthStateChanged: jest.fn((callback) => callback(user))
        })
    }
};
jest.mock('../../firebase/firebase-config', () => (authMock));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

    test('debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act(async () => {

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@test.com', '123456');
            user = userCred.user;
        });

        expect(login).toHaveBeenCalledWith('6OYT1hgrWoZcgDl1JqaJQ3huInE2', null);
        expect(login).toHaveBeenCalledTimes(1);
    });

})
