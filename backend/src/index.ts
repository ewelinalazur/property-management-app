import "./db/database.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/properties.js";
import { resolvers } from "./graphql/resolver.js";

const PORT = parseInt(process.env.PORT || "3000", 10);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`🚀 Server ready at ${url} NEW`);
}

startServer();
