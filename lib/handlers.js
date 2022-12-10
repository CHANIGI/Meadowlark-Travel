'use strict'

exports.api = {}
const fortune = require('./fortunes')

exports.home = (req, res) => {res.render('home')}
exports.about = (req, res) => {res.render('about', {fortune: fortune.getFortune()})}
exports.notFound = (req, res) => {res.render('404')}
exports.serverError = (err, req, res, next) => {res.render('500')}

exports.newsletter = (req, res) => {
  res.render('newsletter', {csrf: 'CSRF token goes here'})
}

exports.newsletterSignUp = (req, res) => {
  res.render('newsletter-signup', {csrf: 'CSRF token goes here'})
}
exports.newsletterSignUpProcess = (req, res) => {
  console.log('Form (from querystring): '+req.body.form)
  console.log('CSRF token (from hidden form field): '+req.body._csrf)
  console.log('Name (from visible form field): '+req.body.name)
  console.log('Email (from visible form field): '+req.body.email)
  res.redirect(303, '/newsletter-signup-thank-you')
}
exports.newsletterSignUpThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you')
}
exports.api.newsletterSignUp = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.send({ result: 'success' })
}