const express = require('express');
const sharp = require('sharp');
const app = express();
const port = 3000;

// Middleware to handle JSON data
app.use(express.json());

app.post('/convert-svg', async (req, res) => {
    try {
        // Expecting SVG data as a string in the JSON body under the key 'svg'
        const svgString = req.body.svg;
        if (!svgString) {
            return res.status(400).send('No SVG data provided.');
        }

        // Convert SVG string to PNG
        const pngBuffer = await sharp(Buffer.from(svgString))
            .png()
            .toBuffer();

        // Send the PNG image as response
        res.set('Content-Type', 'image/png');
        res.send(pngBuffer);
    } catch (error) {
        console.error('Error converting image:', error);
        res.status(500).send('Failed to convert image.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
