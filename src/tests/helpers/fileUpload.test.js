import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dmqcbrhf5',
    api_key: '623665285517955',
    api_secret: 'fk9Fzw1SE114B5Yuzl2iyKKhliU'
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = [];
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        //en este caso no hace falta llamar a done()
        cloudinary.v2.api.delete_resources(imageId, {}, () => {

        });

    })

    test('debe de retornar un error', async () => {

        const file = []
        const url = await fileUpload(file);

        expect(url).toBe(null);

    })

})


