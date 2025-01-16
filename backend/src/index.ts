import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./schema/properties.js";
import "./db/database.js";
import { resolvers } from "./resolver.js";

const PORT = process.env.PORT || 4000;
const app = express();

async function startServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(express.json());

  app.use(
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        request: req,
        response: res,
      }),
    })
  );

  httpServer.listen(PORT || 3000, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}

startServer();
