// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const {resolve} = require('path');

const app = express();

app.use('/', express.static(resolve(__dirname, './build')));

// eslint-disable-next-line consistent-return
app.listen(process.env.PORT || 3000, err => {
  if (err) return console.log(err);

  console.log('running');
});
