const express = require('express');
const upload = require('express-fileupload');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const port = 5000;

let filename;

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
app.use(upload());
// app.use(parseRawBody);

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

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

app.get("/show", (req, res) => {
  res.render("showupload");
});

app.post("/show", async (req, res) => {
  if(req.files) {
    console.log(req.files);

    let file = req.files.file;
    filename = file.name;
    
    await file.mv('./uploads/' + filename, function (err){
            if (err) {
              res.send(err);
            } else {
              // res.send("Fileupload");
            }
          })

    res.redirect("/convert");
  } else {
    res.send("No file was found");
  }
})

app.get('/convert', (req, res) => {
  res.render('convert');
})

app.post("/convert", (req, res) => {
  
    jsonReader(`./uploads + ${filename}`, (err, data) => {
      if (err){
          console.log(err);
      } else {
          console.log(data);
          res.send(data);
      }
    })
})

app.post('/test', (req, res) => {  
  console.log(req.rawBody.words);
  let check = isJson(req.rawBody);  

  if (!check) return res.status(400).send("Bad request");

  req.rawBody = JSON.parse(req.rawBody);  
  res.send(req.rawBody);  
});

server.listen(port, () => {
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