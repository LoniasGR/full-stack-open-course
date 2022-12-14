const express = require('express');
const morgan = require('morgan')

const app = express();

app.use(express.json());
morgan.token('json', (req, res) => {
    if(req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :json')
);



let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    console.log(person)
    if (person == undefined) {
        response.status(404).end();
    } else {
        response.json(person);
    }
})

app.post('/api/persons/', (request, response) => {
    const body = request.body;

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name is missing'
        });
    }

    if (body.number === undefined) {
        return response.status(400).json({
            error: 'number is missing'
        });
    }

    if (persons.find((p) => p.name === body.name) !== undefined) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10_000_000),
    }

    persons = persons.concat(person)

    response.json(person)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const persons = persons.filter(p => p.id !== id);

    response.status(204).end();
})



app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>
    `);
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));