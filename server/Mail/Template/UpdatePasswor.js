exports.passwordUpdate=(email,name)=>
    {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Update Confirmation</title>
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
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .content p {
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Update Successful</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We are writing to confirm that your account password has been successfully updated.</p>
            <p><strong>Date and Time of Change:</strong> ${Date.now().toLocaleString()}</p>
            <p>If you did not make this change or if you believe an unauthorized person has accessed your account, please contact our support team immediately at <a href="mailto:[Support Email]">support.risu@gmail.com</a> or call us at +91 9798571703.</p>
            <p>For your security, here are a few tips to keep your account safe:</p>
            <ul>
                <li>Use a unique password for each of your accounts.</li>
                <li>Avoid using easily guessable information, such as birthdays or common words.</li>
                <li>Enable two-factor authentication (2FA) if you haven’t done so already.</li>
                <li>Regularly update your passwords and review your account activity.</li>
            </ul>
            <p>If you have any questions or need further assistance, please do not hesitate to reach out.</p>
            <p>Thank you for your attention to this important matter.</p>
            <p>Best regards,</p>
            <p>WaveLearn<br>
               Customer Support Team: Risu Gupta<br>
               <a href="[Company Website]">Company Website</a><br>
               <a href="mailto:[Support Email]">[${email}]</a><br>
               [Support Phone Number]</p>
        </div>
        <div class="footer">
            <p>&copy; [Current Year] [Your Company Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    }