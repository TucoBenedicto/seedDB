const fetch = require("node-fetch");

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

function createTranslation() {
  /* const key = faker.LocationModule.country();
  const lang = faker.LocationModule.countryCode();
  const content = faker.RandomModule.word(); */
  return new Promise((resolve, reject) => {
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {

    for (let i = 0; i < json?.results?.length; i++) {

      console.log("-----------------------------");
      console.log(json?.results[i].adult.toString());
      console.log(json?.results[i].genre_ids);
      console.log(json?.results[i].id);
      console.log(json?.results[i].original_language);
      console.log(json?.results[i].overview);
      console.log(json?.results[i].popularity);
      console.log(json?.results[i].release_date);
      console.log(json?.results[i].title);
      console.log(json?.results[i].vote_average);
      console.log(json?.results[i].vote_count);
      console.log("-----------------------------");

       const key =json?.results[1].toString();
      const lang = json?.results[1].title.toString();
      const content = json?.results[1].overview.toString();
      console.log(typeof key);
      console.log(typeof lang);
      console.log(typeof content);
      console.log( resolve `${key},${lang},${content}\n`);
      resolve (`${key},${lang},${content}\n`);

    }
  })
  .catch((err) => reject(err));
});
}

//createTranslation();
//console.log(createTranslation())
/* async function run() {
  await createTranslation();
}

run()
 */
createTranslation()

