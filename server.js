const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.get("/getCountries/:name", (req, res) => {
  axios
    .get("https://restcountries.com/v3.1/name/" + req.params.name)
    .then(function (response) {
      if (response.status == 200) {
        const filteredData = response.data.map((ele) => {
          return {
            flags: {
              svg: ele.flags.svg,
              alt: ele.flags.alt,
            },
            name: ele.name.official,
            currencies: ele.currencies,
            region: ele.region,
            population: ele.population,
            capital: ele.capital,
            area: ele.area,
            borders: ele.borders,
          };
        });
        res.json(filteredData);
      }
    })
    .catch(function () {
      res.status(404).json({ message: "No such country" });
    });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "error" });
});

app.listen(5000, () => {
  console.log("Server Started");
});
