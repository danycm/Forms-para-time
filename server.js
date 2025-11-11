const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle form submissions
app.post('/api/submit', (req, res) => {
    const newResponse = req.body;
    const responsesFilePath = path.join(__dirname, 'data', 'responses.json');

    fs.readFile(responsesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading responses file:', err);
            return res.status(500).send('Error saving response.');
        }

        let responses = [];
        try {
            responses = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing responses JSON:', parseErr);
            return res.status(500).send('Error saving response.');
        }

        responses.push(newResponse);

        fs.writeFile(responsesFilePath, JSON.stringify(responses, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing responses file:', writeErr);
                return res.status(500).send('Error saving response.');
            }
            res.status(200).send('Response saved successfully!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
