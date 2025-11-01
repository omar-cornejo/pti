const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');
const { router: authRouter } = require('./auth');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
