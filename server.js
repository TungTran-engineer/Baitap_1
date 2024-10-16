import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <div style="text-align: center;">
                <img src="tung.png" alt="User Avatar" style="width: 100px; height: auto;">
                <h2>Login</h2>
                <label for="username">Username</label><br>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit">Login</button>
                <p><a href="#">Forgot password?</a></p>
            </div>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const filePath = join(__dirname, 'user.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user file:', err);
            return res.send('Error reading user file.');
        }

        const [savedUsername, savedPassword] = data.split(':').map(item => item.trim());

        if (username === savedUsername && password === savedPassword) {
            res.send(`<h2>Welcome, ${username}!</h2>`);
        } else {
            res.send('<h2>Login failed: Invalid username or password.</h2>');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
