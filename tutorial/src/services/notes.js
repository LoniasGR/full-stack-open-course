import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = async () => {
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
      }
  const request =  axios.get(baseUrl)
    const response = await request
    return response.data.concat(nonExisting)
}

const create = async newObject => {
  const request =  axios.post(baseUrl, newObject)
  const response = await request
    return response.data

}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
    return response.data

}

const noteService = {
    getAll,
    create,
    update
  }

export default noteService