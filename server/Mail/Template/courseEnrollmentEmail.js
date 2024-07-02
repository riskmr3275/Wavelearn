exports.courseEnrollment=()=>{
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
            <h1>Welcome to [Course Name]!</h1>
        </div>
        <div class="content">
            <p>Hi [Student's First Name],</p>
            <p>Congratulations on enrolling in <strong>[Course Name]</strong>! We’re thrilled to have you join our community of learners at [Platform Name].</p>
            
            <h2>Here’s what to expect next:</h2>
            <ul>
                <li><strong>Course Start Date:</strong> [Start Date]</li>
                <li><strong>Course Duration:</strong> [Duration]</li>
                <li><strong>Course Instructor:</strong> [Instructor's Name]</li>
            </ul>
            
            <h2>Getting Started:</h2>
            <p><strong>Access Your Course:</strong> You can access your course materials anytime by logging into your account at [<a href="[Login URL]">Login URL</a>]. Your course will be available under the “My Courses” section.</p>
            <p><strong>Course Materials:</strong> All the necessary materials, including video lectures, reading assignments, and quizzes, are available on the course page.</p>
            <p><strong>Community:</strong> Join our [<a href="[Discussion Forum URL]">discussion forum/community page</a>] to connect with fellow students, ask questions, and participate in discussions.</p>
            <p><strong>Support:</strong> If you have any questions or need assistance, our support team is here to help. You can reach us at [<a href="mailto:[Support Email]">Support Email</a>] or [Support Phone Number].</p>
            
            <a href="[Login URL]" class="button">Go to Course</a>
        </div>
        <div class="footer">
            <p>&copy; [Year] [Platform Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}