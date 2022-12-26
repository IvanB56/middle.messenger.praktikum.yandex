/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(`${__dirname}/dist`));
app.listen(PORT, () => {
    console.log(`сервер доступен по адресу http://localhost:${PORT}`);
});
