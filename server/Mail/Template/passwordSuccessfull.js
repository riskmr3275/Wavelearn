exports.passwordSuccess = (name, email) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }

        .container {
            text-align: center;
            background-color: #fff;
            padding: 30px 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .message-box h1 {
            color: #4caf50;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .message-box p {
            color: #333;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .message-box .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #4caf50;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .message-box .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="message-box">
            <h1>Dear ${name}</h1>
            <p>Password Reset Successful of your Account: ${email}</p>
            <p>Your password has been successfully reset. You can now use your new password to log in.</p>
            <a href="http://localhost:3000/login" class="btn">Go to Login</a>
        </div>
    </div>
</body>
</html>
`
}