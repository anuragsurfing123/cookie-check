// const express = require('express');
// const cors = require('cors')

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Enable CORS for all origins
// app.use(cors({
//     origin: 'https://taupe-cat-01f823.netlify.app', // Replace with your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify required headers
//     credentials: true, // Allow credentials (cookies) to be sent
// }));

// app.get('/set-cookie', (req, res) => {
//   res.cookie('anuragCookie', 'cookieValue', {
//     path: '/',              
//     httpOnly: true,         
//     secure: true, 
//     sameSite: 'None',  
//     maxAge: 60 * 1000,
//   });

//   res.send('Cookie has been set with SameSite=None for .example.com!');
// });

// app.get('/get-cookie', (req, res) => {
//   console.log(req.headers.cookie);

//   if (req.headers.cookie) {
//     res.send(`Received cookies: ${req.headers.cookie}`);
//   } else {
//     res.send('No cookies received.');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all origins
app.use(cors({
  origin: 'https://transcendent-speculoos-22bb18.netlify.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify required headers
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Use cookie-parser middleware to parse cookies from requests
app.use(cookieParser());

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    getCookie: String
  }

  type Mutation {
    setCookie: String
  }
`;

// Define resolvers for the GraphQL schema
const resolvers = {
  Query: {
    getCookie: (parent, args, context) => {
      const cookies = context.req.cookies; // Access the cookies
      if (cookies.anuragCookie) {
        return `Received cookies: ${cookies.anuragCookie}`;
      } else {
        return 'No cookies received.';
      }
    }
  },
  Mutation: {
    setCookie: (parent, args, context) => {
      context.res.cookie('anuragCookie', 'cookieValue', {
        path: '/',              
        httpOnly: true,         
        secure: true, 
        sameSite: 'None',  
        maxAge: 60 * 1000,
      });

      return 'Cookie has been set with SameSite=None for .example.com!';
    }
  }
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }) // Provide req and res to resolvers
});

// Start the server and apply the middleware after starting
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
