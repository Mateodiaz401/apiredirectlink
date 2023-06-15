require('dotenv').config();
const app = require('./src/app');
const dbConnect = require('./src/config/db');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dbConnect()