/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`сервер доступен по адресу http://localhost:${PORT}`);
});
