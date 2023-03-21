import http from "http";
import fetch from "node-fetch"
import { createDeflateRaw } from "zlib"

  const server = http.createServer((req, res) =>{ 
    const url = req.url
    let tableData =
    "<table border='1'><tr><th>name</th><th>height</th><th>birth_year</th><th>gender</th><th>url</th></tr>";
    if (url === "/") {
      res.write("<h1>Home Page</h1>")
      res.write('<img src="https://dummyimage.com/600x400/000000/8c00ff.jpg&text=Welcome!">')
      res.end();
    }

    if (url === '/list') {   
      fetch('https://swapi.dev/api/people')
        .then(res => res.json())
        .then(data => {
          createData(data)
          res.write("<h1>Welcome To My Homepage</h1>")
          res.write(tableData);
          res.end()
        })
      } 
    else {
          res.write("<h1>Page Not Found</h1>")
          res.end();
        }


    function createData(data) {
      data.results.forEach(element => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td>`
      });
      tableData += `</table>`
    }

  }).listen(6923, console.log("server is listening on port" + 6923));
