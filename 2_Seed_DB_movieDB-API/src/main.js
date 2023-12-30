//const { faker } = require('@faker-js/faker');
const fetch = require("node-fetch");

const fs = require("fs");
const fastcsv = require("fast-csv");
const db = require("./db");
const contains = require("validator/lib/contains");
const args = require("minimist")(process.argv.slice(2));

// The path to write the csv file to
const output = "./src/output.csv";

// Create a stream to write to the csv file
const stream = fs.createWriteStream(output);

// Create some fake data using the faker lib. Returns a template string to be inserted into a csv file as a single line
/* function createTranslation() {
  const key = faker.LocationModule.country();
  const lang = faker.LocationModule.countryCode();
  const content = faker.RandomModule.word();
  return `${key},${lang},${content}\n`;
}
 */

/////////////////////////////////////////////////////////////////////
const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2E0Mzk3NzA4NWU4YzZjNjM3NzM3MTdmODM1ZGJlOSIsInN1YiI6IjY1NzFjZTQ0ODg2MzQ4MDExZGEwYzIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p0TMzk7omlTdJOm2Dqlkcokqi7QBN__-W2SOXjnZPNM",
  },
};
/////////////////////////////////////////////////////////////////////

function createTranslation() {
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const translations = [];
      for (let i = 0; i < json?.results?.length; i++) {
        const key = json?.results[i].id;
        const lang = json?.results[i].adult;
        //les fichiers csv considere les virgule comme des nouvelle colonnes , par consequent je les supprimes
        const content = json?.results[i].overview.replace(/,/g, " ");

        translations.push(`${key},${lang},${content}\n`);
      }

      return translations.join("");
    });
}


async function writeToCsvFile() {
  // The user can specify how many rows they want to create (yarn seed --rows=20), if they dont specify anything then defaults to 10
  let rows = args["rows"] || 10;
  // Iterate x number of times and write a new line to the csv file using the createTranslation function
  for (let index = 0; index < rows; index++) {
    stream.write(await createTranslation(), "utf-8");
  }
  stream.end();
}

function insertFromCsv() {
  let csvData = [];
  return (
    fastcsv
      .parse()
      // validate that the column key doesn't contain any commas, as some countries do. This will break our insertion as it would be treated as an extra column and our table expects only 3 columns
      .validate((data) => !contains(data[0], ","))
      // triggered when a new record is parsed, we then add it to the data array
      .on("data", (data) => {
        csvData.push(data);
      })
      .on("data-invalid", (row, rowNumber) =>
        console.log(
          `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
        )
      )
      // once parsing is finished and all the data is added to the array we can then insert it into the db table
      .on("end", () => {
        // The insert statement
        const query =
          "INSERT INTO translations (key, lang, content) VALUES ($1, $2, $3)";
        // Connect to the db instance
        db.connect((err, client, done) => {
          if (err) throw err;
          try {
            // loop over the lines stored in the csv file
            csvData.forEach((row) => {
              // For each line we run the insert query with the row providing the column values
              client.query(query, row, (err, res) => {
                if (err) {
                  // We can just console.log any errors
                  console.log(err.stack);
                } else {
                  console.log("inserted " + res.rowCount + " row:", row);
                }
              });
            });
          } finally {
            done();
          }
        });
      })
  );
}

async function seed() {
  await writeToCsvFile();
  let stream = fs.createReadStream(output);
  stream.pipe(insertFromCsv());
}

seed();
