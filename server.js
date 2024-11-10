const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];

        // Fetch user's birthday and gender
        const response = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=birthdays,genders`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });

        const birthday = response.data.birthdays ? response.data.birthdays[0].date : null;
        const gender = response.data.genders ? response.data.genders[0].value : null;

        // Here you can save the user info to your database
        console.log(`User ID: ${userId}, Email: ${email}, Birthday: ${birthday}, Gender: ${gender}`);

        res.status(200).json({ message: 'User signed up successfully', birthday, gender });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});