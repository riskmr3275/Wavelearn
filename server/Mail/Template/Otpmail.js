exports.otpMail=(otp)=>{
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WaveLearn OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 28px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .message {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666666;
            padding: 10px;
            text-align: center;
            font-size: 14px;
        }
        .button {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            WaveLearn
        </div>
        <div class="content">
            <p class="message">Dear User,</p>
            <p class="message">Thank you for using WaveLearn. To complete your login, please use the following One-Time Password (OTP):</p>
            <div class="otp">${otp}</div> <!-- Replace with dynamic OTP -->
            <p class="message">This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
            <a href="https://www.google.com" class="button">Visit WaveLearn</a>
        </div>
        <div class="footer">
            © 2024 WaveLearn. All rights reserved Risu Gupta.
        </div>
    </div>
</body>
</html>
`
}