import { PrismaClient } from "@prisma/client";
import express from 'express'

const prisma = new PrismaClient();
const app = express()

app.use(express.json())

app.get('/translations', async (req, res) => {
    const allTranslations = await prisma.translations.findMany()
    res.json(allTranslations)
  })

  

//async function main() {
  // ... you will write your Prisma Client queries here

  //1--READ (findMany)
  //const allTranslations = await prisma.translations.findMany()
  //console.log(allTranslations)

  //const allComments = await prisma.comments.findMany()
  //console.log(allComments)

  //2--CREATE (create)
  /*
  await prisma.translations.create({
    data: {
      key:"effe eheheh",
      lang:"effe grrenetjz",
      content:"effe zefzzgrz",
      comments: {
        create: {
            comment: "Alice",
        },
      },
    },
  });
  //on affiche les commentaires , avec include on affiche la relation "one to many" lié a translation
  const allUsers = await prisma.comments.findMany({
    include: {
      translations: true,
    },
  });
  console.dir(allUsers, { depth: null });
    */

  //3--UPDATE
/*   const post = await prisma.comments.update({
    where: { id: 6 },
    data: { comment: "MahMoud", fk_translations_id: 204 },
  });
  console.log(post); */



//}

/*
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)