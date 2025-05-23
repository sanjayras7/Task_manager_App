const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
