const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const route = require('./routes');
const multer = require('multer');

const app = express();

require('dotenv').config()

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

route(app);
app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})
