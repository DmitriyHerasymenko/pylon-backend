const express = require('express');
const useRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use('/api', useRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`) )