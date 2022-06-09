const express = require('express');
const Letter = require('./model/letter');

const app = express();
const port = 5000;

const parseRawBody = (req, res, next) => {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    next();
  });
}

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(parseRawBody);

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

app.get("/home", (req, res) => {
  res.render("landing");
})

app.post('/test', (req, res) => {  
  let check = isJson(req.rawBody);  

  if (!check) return res.status(400).send("Bad request");

  req.rawBody = JSON.parse(req.rawBody);  
  res.send(req.rawBody);  
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})


// convert this object into a string to be stored in local storage

// const studentObjToString = JSON.stringify(student)

// console.log(typeof studentObjToString);

// localStorage.setItem('student', studentObjToString);

// // convert this string into a JSON to be stored in local storage

// const toJSONStudent = JSON.parse(studentObjToString);

// console.log(typeof toJSONStudent);

// console.log(toJSONStudent.age); //now u can access the property of the JSON;

// let text = "ther brothers that sold some cups of the donor are plenty over here";
// let result = JSON.stringify(text);
// console.log(result);

// let text = req.body;
// console.log(req.body);
// let result = JSON.stringify(text);
// res.send(result);