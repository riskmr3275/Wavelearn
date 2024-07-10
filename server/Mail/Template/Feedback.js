exports.feedbackMail=(name)=>
{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Email</title>
    <style>
        /* Reset styles for email compatibility */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background-color: #f1f1f1;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 30px;
            background-color: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            font-size: 16px;
            margin-bottom: 20px;
            text-align: justify;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .rating {
            text-align: center;
            margin-top: 20px;
        }
        .stars {
            display: inline-block;
            font-size: 24px;
            color: gold;
        }
        .stars span {
            cursor: pointer;
        }
        .stars span:hover,
        .stars span.active {
            color: orange;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #888;
            font-size: 14px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>We Value Your Feedback!</h1>
        <p>Dear ${name},</p>
        <p>At Wavelearn, we strive to provide the best possible experience for our customers. Your feedback is incredibly valuable to us and helps us improve our services.</p>
        <p>Please take a moment to rate your experience:</p>
        <div class="rating">
            <div class="stars">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
            </div>
        </div>
        <a href="#" class="button">Give Feedback Now</a>
        <div class="footer">
            <p>If you have any questions or need further assistance, please contact our <a href="mailto:risugupta208.nitb@gmail.com">Customer Support</a>.</p>
            <p>&copy; 2024 Wavelearn. All rights reserved.</p>
        </div>
    </div>

    <script>
        const stars = document.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                stars.forEach(s => s.classList.remove('active'));
                star.classList.add('active');
                const rating = star.getAttribute('data-value');
                console.log('Rated:', rating);
                // You can send the rating to your server or handle it as needed
            });
        });
    </script>
</body>
</html>
`
}