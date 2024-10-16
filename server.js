import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 3000;

// Định nghĩa __dirname để dùng trong các đường dẫn file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware để xử lý form data
app.use(bodyParser.urlencoded({ extended: true }));

// Trang đăng nhập (GET)
app.get('/', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <div style="text-align: center;">
                <img src="https://via.placeholder.com/150" alt="User Avatar">
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

// Xử lý đăng nhập (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Đọc file user.txt từ đường dẫn tuyệt đối
    const filePath = join(__dirname, 'user.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user file:', err);
            return res.send('Error reading user file.');
        }

        const [savedUsername, savedPassword] = data.split(':').map(item => item.trim());

        // Kiểm tra tài khoản và mật khẩu
        if (username === savedUsername && password === savedPassword) {
            res.send(`<h2>Welcome, ${username}!</h2>`);
        } else {
            res.send('<h2>Login failed: Invalid username or password.</h2>');
        }
    });
});

// Server chạy ở port 3000 
app.listen(PORT)