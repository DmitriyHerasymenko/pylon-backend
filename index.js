const express = require('express');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const servicesRouter = require('./routes/services.routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use('/api', userRouter);
app.use('/auth', authRouter);
app.use('/api', servicesRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`) )