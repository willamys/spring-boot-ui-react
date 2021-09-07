import axios from 'axios';

const PERSON_API_URL = 'http://localhost:8080';
const API_URL = PERSON_API_URL + '/pessoa';

class PersonService {

    getAllPersons() {
        return axios.get(API_URL + '/all');
    }
    deletePerson(id) {
        return axios.delete(API_URL + '/delete/' + id);
    }
    retrievePerson(id) {
        return axios.get(API_URL + '/details/' + id);
    }
    updatePerson(id, person) {
        return axios.put(`${API_URL}/update/${id}`, person);
    }
    createPerson(person) {
        return axios.post(`${API_URL}/add`, person);
    }

}

export default new PersonService();