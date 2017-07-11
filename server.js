const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app =  express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next)=> {
  var now = new Date().toString();
  var output = now + ' '+req.method+ ' '+ req.url;
  console.log(output);
  fs.appendFile('server.log', output+'\n', (err) =>{
    if(err)
      console.log('Unable to append to server.log');
  });
  next(); //executes when middleware has completed
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
//   next();
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (request, response) =>{

  //response.send('<h1>HELLO EXPRESS!!</h1>');
  response.render('home.hbs',  {
    pageTitle: 'Home',
    welcomeMessage: 'Hi from the earth!!'
  });
});

app.get('/json', (request, response) =>{

  response.send({this: 'Is an object', transformed:  'By express!'});

  //console.log(request);
});

app.get('/about', (request, response) => {
  response.render('about.hbs',  {
    pageTitle: 'About page',
    randomNumber :  Math.random() * (10 - 1) +1
  });
});

app.listen(3000, () => {console.log('Server is up on port 3000 ...');});
