const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const { Blog } = require('./model/letter');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/text', (req, res) => {

  const blogOne = new Blog ({
    title: req.body.title,
    author: req.body.author
  })

  res.json(blogOne);

  // let text = req.body;
  // console.log(req.body);
  // let result = JSON.stringify(text);
  // res.send(result);

})



// // convert this object into a string to be stored in local storage

// const studentObjToString = JSON.stringify(student)

// console.log(typeof studentObjToString);

// localStorage.setItem('student', studentObjToString);

// // convert this string into a JSON to be stored in local storage

// const toJSONStudent = JSON.parse(studentObjToString);

// console.log(typeof toJSONStudent);

// console.log(toJSONStudent.age); //now u can access the property of the JSON;

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})

// let text = "ther brothers that sold some cups of the donor are plenty over here";
// let result = JSON.stringify(text);
// console.log(result);