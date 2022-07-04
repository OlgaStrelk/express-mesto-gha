const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The app is listened on port ${PORT}`);
});
