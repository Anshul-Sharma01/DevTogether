// Dont change the port
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to DevTogether!');
});

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});