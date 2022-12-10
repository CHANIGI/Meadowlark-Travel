'use strict'

const express = require('express')
const {engine} = require('express-handlebars')
const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//핸들바 뷰 엔진 설정
app.engine('handlebars', engine({
  defaultLayout : 'main',
  helpers: {
    section: function(name, options){
      if(!this._sections)this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname+'/public'))
app.use(weatherMiddleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//라우팅
app.get('/', handlers.home)
app.get('/about', handlers.about)

app.get('/newsletter-signup', handlers.newsletterSignUp)
app.post('/newsletter-signup/process', handlers.newsletterSignUpProcess)
app.get('/newsletter-signup-thank-you', handlers.newsletterSignUpThankYou)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignUp)


//custom 404 page
app.use(handlers.notFound)
//custom 500 page
app.use(handlers.serverError)

if(require.main === module){
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}`+
    ';press Ctrl+C to terminate')
  })
}
else{
  module.exports = app
}