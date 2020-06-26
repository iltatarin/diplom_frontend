import axios from 'axios';

export function createAdvert({
                                 category, name, description, feature,
                                 country, city,
                                 address, images,
                                 phone, profile
                             })
{
    return async dispatch => {
        const fd = new FormData();
        for (let im=0; im < images.length; im++){
            fd.append('images', images[im], images[im].name);
        }
        fd.append('name', name);
        fd.append('description', description);
        fd.append('feature', feature);
        fd.append('country', country);
        fd.append('city', city);
        fd.append('address', address);
        fd.append('category', category);
        fd.append('profile', profile);
        fd.append('phone_number', phone);

        axios.post('http://localhost:8000/api/advert/adverts/', fd)
            .then(res => {
                console.log(res);
            },
            response => {
                alert('Ошибка! Попробуйте позже!');
                console.log(response);
            }
        );
    }
}


export function updateAdvert({
                                 category, name, description, feature,
                                 country, city,
                                 address, id,
                                 phone
                             })
{
    return async dispatch => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updateData = {
        name: name,
        description: description,
        feature: feature,
        country: country,
        city: city,
        address: address,
        category: category,
        phone_number: phone
    };

        instance.put(`/advert/adverts/${id}/`, updateData)
            .then(res => {
                console.log(res);
            },
            response => {
                alert('Ошибка! Попробуйте позже!');
                console.log(response);
            }
        );
    }
}


export function removeAdvert({ id })
{
    return async dispatch => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('ID: ', id);
        await instance.delete(`/advert/adverts/${id}/`)
            .then(res => {
                console.log(res);
            },
            response => {
                alert('Ошибка! Попробуйте позже!');
                console.log(response);
            }
        );
    }
}
