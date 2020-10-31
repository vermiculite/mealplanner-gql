import 'reflect-metadata'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import * as jwt from 'express-jwt'
import { createConnection } from 'typeorm'
import { BookResolver } from './resolvers/BookResolver'
import { buildSchema } from 'type-graphql'
import { MealResolver } from './resolvers/MealResolver'
import { authChecker } from './auth/auth-checker'
import { Context } from './auth/context.interface'
import isTokenValid from './validate'
const app = express()

async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [BookResolver, MealResolver],
    authChecker,
  })

  const app = express()
  const path = '/graphql'

  // Create a GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const { authorization: token } = req.headers
      return { token }
    },
  })

  // Mount a jwt or other authentication middleware that is run before the GraphQL execution
  app.use(
    path,
    jwt({
      secret: 'TypeGraphQL',
      credentialsRequired: false,
    })
  )

  // Apply the GraphQL server middleware
  server.applyMiddleware({ app, path })

  // Launch the express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

main()
  .then(() => console.log('Alles gut'))
  .catch((e) => console.log('oops', e))
