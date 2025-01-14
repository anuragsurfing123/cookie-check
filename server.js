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

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));

app.use(cookieParser());

const typeDefs = gql`
  type Query {
    getCookie: String
  }

  type Mutation {
    setCookie: String
    handlePaymentHoldForWalkOn(input: HandlePaymentHoldForWalkOnInput!): HandlePaymentHoldForWalkOnResponse
  }

  input HandlePaymentHoldForWalkOnInput {
    chargerId: String!
    action: String!
    stripeSessionId: String!
  }

  type HandlePaymentHoldForWalkOnResponse {
    success: Boolean!
    message: String!
    sessionData: SessionData!
  }

  type SessionData {
    sessionId: String!
    stripeSessionId: String!
    paymentIntentId: String!
    userId: String!
  }
`;

const resolvers = {
  Query: {
    getCookie: (parent, args, context) => {
      const cookies = context.req.cookies; 
      if (cookies.anuragCookie) {
        return `Received cookies: ${cookies.anuragCookie}`;
      } else {
        return 'No cookies received.';
      }
    }
  },
  Mutation: {
    setCookie: (parent, args, context) => {
      context.res.cookie('sessionId', 'session_3c549229-e8ba-44e4-817a-197a4080f6b3_SN10052203020246', {
        path: '/',              
        httpOnly: true,         
        secure: true, 
        sameSite: 'None',  
        maxAge: 60 * 1000,
      });

      return 'Cookie has been set with SameSite=None for .anuragmishra.com!';
    },
    handlePaymentHoldForWalkOn: (parent, { input }, context) => {
      const { chargerId, action, stripeSessionId } = input;

      // Simulate handling payment hold logic
      const sessionData = {
        sessionId: 'session_3c549229-e8ba-44e4-817a-197a4080f6b3_SN10052203020246',
        stripeSessionId: stripeSessionId,
        paymentIntentId: 'pi_1234567890abcdef',
        userId: 'user_9876543210abcdef',
      };

      // Assuming you have a business logic for payment hold here
      if (action === 'Accept') {
        return {
          success: true,
          message: 'Payment hold accepted successfully.',
          sessionData,
        };
      }

      return {
        success: false,
        message: 'Invalid action or failure in processing payment.',
        sessionData,
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }) 
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
