const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/users', (req, res) => res.send('hello user'))

app.listen(PORT, () => console.log(`server started on port ${PORT}`) )