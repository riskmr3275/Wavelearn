exports.verificationEmail=()=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            color: white;
            padding: 20px 0;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h2 {
            color: #4CAF50;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #777777;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification Required</h1>
        </div>
        <div class="content">
            <p>Hi [User's First Name],</p>
            <p>Thank you for signing up on Wavelearn! To complete your registration, please verify your email address by clicking the button below:</p>
            
            <a href="[Verification URL]" class="button">Verify Email</a>
            
            <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
            <p><a href="[Verification URL]">[Verification URL]</a></p>
            
            <p>If you didn't sign up for an account, you can ignore this email.</p>
            
            <p>Best regards,</p>
            <p>The [Platform Name] Team</p>
        </div>
        <div class="footer">
            <p>&copy; [Year] [Platform Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}