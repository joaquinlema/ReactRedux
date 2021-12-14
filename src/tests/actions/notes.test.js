/**

* @jest-environment node

*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

//mock de archivo
jest.mock("../../helpers/fileUpload", () => {
    return {
        fileUpload: () => {
            return Promise.resolve("Cualquierlinlk/cualquierimagen.jpg");
        },
    };
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'yU7P4LliIRPsaaF4syRo',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);

global.scrollTo = jest.fn();

describe('Pruebas con las acciones de notes', () => {

    //REINICIAMOS EL STORE
    beforeEach(() => {

        store = mockStore(initState);

    });

    test('debe de crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();
        // console.log(actions);
        //testea contra activenote()
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        //testea cibtra addnewnote()
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // const docId .... action.... payload.... id
        // await ..... db.... doc(``)..... .delete();
        //eliminamos el documento creado en firebase de test
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    })


    test('startLoadingNotes debe cargar las notas', async () => {

        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);


    })

    test('startSaveNote debe de actualizar la nota', async () => {

        const note = {
            id: 'uj4fBV7Ai1uuUsgC9zuw',
            title: 'tituloesting',
            body: 'body'
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);

    })

    test('startUploading debe de actualizar el url del entry prueba general', async () => {

        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await db.doc('/TESTING/journal/notes/yU7P4LliIRPsaaF4syRo').get();
        expect(docRef.data().url).not.toBe('https://hola-mundo.com/cosa.jpg');
        expect(docRef.data().url).toBe('Cualquierlinlk/cualquierimagen.jpg')
    })
})
