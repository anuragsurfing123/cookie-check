const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: '*',  // This allows all headers
    exposedHeaders: '*',  // This exposes all headers
    credentials: true
}));

app.get('/set-cookie', (req, res) => {
  res.cookie('anuragCookie', 'cookieValue', {
    path: '/',              
    httpOnly: true,         
    secure: true, 
    sameSite: 'None',  
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
