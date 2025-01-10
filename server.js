const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({  
    credentials: true, // Allow cookies to be sent
  })
);

app.get('/set-cookie', (req, res) => {
  // Set the cookie directly in the response
  res.cookie('anuragCookie', 'cookieValue', {
    path: '/',              // Path where the cookie is valid
    httpOnly: true,         // Prevent client-side JavaScript access
    secure: true, // Use HTTPS in production
    sameSite: 'None',       // Allow cross-site requests
  });

  res.send('Cookie has been set with SameSite=None for .example.com!');
});

app.get('/get-cookie', (req, res) => {
  // Log the cookies received in the request
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
