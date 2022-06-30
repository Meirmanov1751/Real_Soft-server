const express = require('express')
const config = require('config')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const PORT = config.get('port') || 5000

app.use(express.urlencoded({extended : true}))

app.use('/api', routes)


async function start() {
  try{
    await mongoose.connect(config.get('mongoUrl'),{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  }catch (e){
    console.log(`server error ${e.message}`)
    process.exit(1)
  }
}

start()

