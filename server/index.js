import express from 'express';

const app = express();
const port = 5050;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello QwizR');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});