import axios from "axios";

const getAll = async () => {
    const response = await axios.get('http://localhost:3001/persons');
    return response.data;
}

const create = async (contact) => {
    const response = await axios
        .post('http://localhost:3001/persons', contact);
    return response.data;
}

const update = async (contact) => {
    console.log(contact);
    const response = await axios.put(`http://localhost:3001/persons/${contact.id}`, contact);
    return response.data;
}

const remove = async (id) => {
    const response = await axios
    .delete(`http://localhost:3001/persons/${id}`);
    return response;
}


const personsService = {
    getAll,
    create,
    update,
    remove,
}

export default personsService;