const express = require('express');
const upload = require('express-fileupload');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);
const port = 5000;

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload());

function jsonReader(filePath, cb){
  fs.readFile(filePath, 'utf-8', (err, fileData) => {
      if (err){
          return cb && cb(err);
      }

      try {
          const object = JSON.parse(fileData)
          return cb && cb(null, object);
      } catch (error) {
          return cb && cb(err);
      }
  })
}

function done(filePath){
  jsonReader(filePath, (err, data) => {
      if (err){
          console.log(err);
      } else {
          console.log(data);
      }
  })
}

app.get("/home", (req, res) => {
  res.render("landing");
});

app.get("/", (req, res) => {
  res.render("showupload");
});

app.get('/convert', (req, res) => {
  res.render('convert');
})

app.get('/paste', (req, res) => {
  res.render('pasteName');
})

app.post("/show", (req, res) => {
  if (!req.files) res.send("No file was found");
  
  console.log(req.files);

  let file = req.files.file;
  let filename = file.name;
  console.log(filename);
  
  file.mv('./uploads/' + filename, function (err){
    if (err) {
      res.send(err);
    } else {
      console.log("Fileupload");
    }
  })
    
  res.redirect("/paste");
});

app.post('/convert', (req, res) => {
  let dataa;
  jsonReader('./uploads/' + req.body.pasteName, (err, data) => {
    if (err){
        console.log(err);
    } else {
      dataa = data;
        console.log(data);
        res.send(dataa);
    }
  })
})

server.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
});


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