const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all origins
app.use(cors({
    origin: 'https://taupe-cat-01f823.netlify.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify required headers
    credentials: true, // Allow credentials (cookies) to be sent
}));

app.get('/set-cookie', (req, res) => {
  res.cookie('anuragCookie', 'cookieValue', {
    path: '/',              
    httpOnly: true,         
    secure: true, 
    sameSite: 'None',  
    maxAge: 60 * 1000,
  });

  res.send('Cookie has been set with SameSite=None for .example.com!');
});

app.get('/get-cookie', (req, res) => {
  console.log(req.headers.cookie);

  if (req.headers.cookie) {
    res.send(`Received cookies: ${req.headers.cookie}`);
  } else {
    res.send('No cookies received.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
