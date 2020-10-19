import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { BookResolver } from "./resolvers/BookResolver"
import { buildSchema } from "type-graphql"

async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [BookResolver],
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}

main()
  .then(() => console.log("Alles gut"))
  .catch((e) => console.log("oops", e))
