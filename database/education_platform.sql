-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2025 at 12:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `education_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`userId`, `username`, `email`, `password`) VALUES
(1, 'Rahul Datta', 'rahuldatta@gmail.com', '13245'),
(2, 'Taha Ibne Abdullah', 'tahaibne@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cate_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `noOfCourses` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cate_id`, `title`, `imagePath`, `noOfCourses`) VALUES
(1, 'Web Development', 'assets/images/code-box-line.png', 0),
(2, 'Artificial Intelligence', 'assets/images/robot-2-line.png', 0),
(3, 'Cyber Security', 'assets/images/bug-line.png', 0),
(4, 'Data Science', 'assets/images/database-2-line.png', 0),
(5, 'Programming', 'assets/images/braces-line.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `batch_nO` int(11) NOT NULL,
  `no_of_seat` int(11) NOT NULL,
  `rem_days` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_desc` text NOT NULL,
  `no_of_class` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `cate_id` int(11) NOT NULL,
  `playlistId` varchar(255) NOT NULL,
  `isPremium` tinyint(1) NOT NULL,
  `isEnrolled` tinyint(1) NOT NULL,
  `course_fee` decimal(10,0) NOT NULL,
  `technologies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`technologies`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `img_url`, `batch_nO`, `no_of_seat`, `rem_days`, `course_name`, `course_desc`, `no_of_class`, `created_at`, `cate_id`, `playlistId`, `isPremium`, `isEnrolled`, `course_fee`, `technologies`) VALUES
(10001, 'https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg', 4, 17, 0, 'Learn Artificial Intelligence', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 20, '2025-06-29 20:10:17', 2, '5NgNicANyqM', 1, 0, 1500, '[]'),
(10002, 'https://img.youtube.com/vi/RWXKysImabs/hqdefault.jpg', 2, 0, 0, 'Learn Dot Net Development', 'This project showcases web application development using the .NET framework, focusing on building scalable backend services with ASP.NET Core. It includes implementation of RESTful APIs, integration with a SQL Server database, and application of MVC architecture for clean and maintainable code structure.', 10, '2025-07-03 16:35:20', 1, 'RWXKysImabs', 0, 0, 0, '[]'),
(10003, 'https://img.youtube.com/vi/EsUL2bfKKLc/hqdefault.jpg', 13, 2, 0, 'Full Stack Web Development (MERN)', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 30, '2025-07-03 19:30:20', 1, 'EsUL2bfKKLc', 1, 0, 2500, '[{\"name\":\"React\",\"icon\":\"assets/images/reactJS.png\"},{\"name\":\"Node.js\",\"icon\":\"assets/images/nodejs.png\"},{\"name\":\"NEXT.js\",\"icon\":\"assets/images/nextJS.png\"},{\"name\":\"JQuery\",\"icon\":\"assets/images/Jquery.png\"}]'),
(10004, 'https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg', 3, 6, 0, 'Web Development From Scratch', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 139, '2025-07-03 19:57:37', 1, 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w', 0, 0, 0, '[]'),
(10005, 'https://img.youtube.com/vi/7WRlYJFG7YI/hqdefault.jpg', 3, 20, 0, 'Data Science Full Course', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 14, '2025-07-03 20:02:52', 4, '7WRlYJFG7YI', 0, 0, 0, '[]'),
(10007, 'https://img.youtube.com/vi/-TkoO8Z07hI/hqdefault.jpg', 20, 3, 0, 'Learn C++ Language', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 40, '2025-07-03 20:10:33', 5, '-TkoO8Z07hI', 0, 0, 0, '[]'),
(10009, 'https://img.youtube.com/vi/MXlZCgh2M6A/hqdefault.jpg', 10, 8, 21, 'Ruby For Beginners', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 60, '2025-07-19 08:14:31', 5, 'MXlZCgh2M6A', 0, 0, 0, '[]'),
(10011, 'https://img.youtube.com/vi/GoXwIVyNvX0/hqdefault.jpg', 19, 4, 22, 'Learn Java Full Course', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 40, '2025-07-19 09:05:43', 5, 'GoXwIVyNvX0', 0, 0, 0, '[]'),
(10012, 'https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg', 2, 2, 17, 'Machine Learning Full Course', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 77, '2025-07-19 14:37:56', 2, 'GwIo3gDZCVQ', 1, 0, 5000, '[{\"name\":\"Python\",\"icon\":\"assets/images/python.jpg\"},{\"name\":\"Django\",\"icon\":\"assets/images/Django.png\"},{\"name\":\"Fast API\",\"icon\":\"assets/images/FastAPi.png\"},{\"name\":\"Flask\",\"icon\":\"assets/images/Flask.png\"}]'),
(10014, 'https://img.youtube.com/vi/C1NgOmoOszc/hqdefault.jpg', 3, 15, 10, 'Django Full Course', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 60, '2025-07-19 14:56:51', 1, 'PLjVLYmrlmjGcyt3m6rt21nfjhYSWP_Ue_', 0, 0, 0, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option_text` text NOT NULL,
  `option_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `question_id`, `option_text`, `option_index`) VALUES
(401, 101, 'module', 0),
(402, 101, 'module', 1),
(403, 101, 'object', 2),
(404, 101, 'module', 3),
(405, 102, 'module', 0),
(406, 102, 'module', 1),
(407, 102, 'object', 2),
(408, 102, 'module', 3),
(409, 103, 'module', 0),
(410, 103, 'module', 1),
(411, 103, 'object', 2),
(412, 103, 'module', 3),
(413, 104, 'module', 0),
(414, 104, 'module', 1),
(415, 104, 'object', 2),
(416, 104, 'module', 3),
(417, 105, 'module', 0),
(418, 105, 'module', 1),
(419, 105, 'object', 2),
(420, 105, 'module', 3),
(421, 106, 'module', 0),
(422, 106, 'module', 1),
(423, 106, 'object', 2),
(424, 106, 'module', 3),
(425, 107, 'module', 0),
(426, 107, 'module', 1),
(427, 107, 'object', 2),
(428, 107, 'module', 3),
(429, 108, 'module', 0),
(430, 108, 'module', 1),
(431, 108, 'object', 2),
(432, 108, 'module', 3),
(433, 109, 'module', 0),
(434, 109, 'module', 1),
(435, 109, 'object', 2),
(436, 109, 'module', 3),
(437, 110, 'module', 0),
(438, 110, 'module', 1),
(439, 110, 'object', 2),
(440, 110, 'module', 3);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `trxId` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `trxId`, `user_id`, `course_id`, `date`, `type`, `status`) VALUES
(2, '34565467476', 15, 10003, '2025-07-04', 'rocket', 'Completed'),
(3, '32554356346', 17, 10003, '2025-07-04', 'Nagad', 'Completed'),
(6, '34565467476', 17, 10001, '2025-07-18', 'bkash', 'Pending'),
(7, '4365475685', 14, 10003, '2025-07-18', 'rocket', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_text` text NOT NULL,
  `correct_answer_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `quiz_id`, `question_text`, `correct_answer_index`) VALUES
(101, 11, 'Which keyword is used to create a class in Ruby?', 3),
(102, 11, 'Which keyword is used to create a class in Ruby?', 2),
(103, 11, 'Which keyword is used to create a class in Ruby?', 1),
(104, 11, 'Which keyword is used to create a class in Ruby?', 2),
(105, 11, 'Which keyword is used to create a class in Ruby?', 1),
(106, 11, 'Which keyword is used to create a class in Ruby?', 0),
(107, 11, 'Which keyword is used to create a class in Ruby?', 3),
(108, 11, 'Which keyword is used to create a class in Ruby?', 0),
(109, 11, 'Which keyword is used to create a class in Ruby?', 1),
(110, 11, 'Which keyword is used to create a class in Ruby?', 3);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `course_id`) VALUES
(11, 10002);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_avatar` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `submissionDate` date NOT NULL DEFAULT current_timestamp(),
  `story` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `name`, `user_avatar`, `course_name`, `batch_no`, `submissionDate`, `story`, `status`) VALUES
(1, 'Rahul datta', 'RD', 'Web Development From Scratch', 3, '2025-07-03', 'This is the best course I have ever taken', 'accepted'),
(2, 'Junain Uddin', 'JU', 'Web Development From Scratch', 3, '2025-07-03', 'Just completed my Web Development course, and honestly, it was a game-changer for me. 💻✨\n\nI started with zero experience, but now I can build responsive websites, work with APIs, and even handle some backend! It boosted my confidence, gave me real-world s', 'accepted'),
(3, 'Asma Ul Hasna', 'AUH', 'Data Science Full Course', 3, '2025-07-03', 'Just wrapped up my Data Science course, and it truly changed how I look at data. 📊🔍\n\nFrom analyzing trends to building simple models — this course taught me to turn raw data into real insights. It sharpened my analytical thinking and gave me a new perspec', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `primaryNumber` varchar(255) DEFAULT NULL,
  `alternativeNumber` varchar(255) DEFAULT NULL,
  `countryCode` varchar(11) DEFAULT NULL,
  `joinDate` varchar(255) NOT NULL,
  `currentOccupation` varchar(255) DEFAULT NULL,
  `skillSector` varchar(255) DEFAULT NULL,
  `specificTopic` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `educationalBackground` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `rank` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `name`, `avatar`, `primaryNumber`, `alternativeNumber`, `countryCode`, `joinDate`, `currentOccupation`, `skillSector`, `specificTopic`, `gender`, `age`, `educationalBackground`, `subject`, `rank`, `points`) VALUES
(14, 'Kasem32', 'kasem@gmail.com', '13245', 'Kasem Malik', '/uploads/1751577378979.jpg', '01532647584', '8213214325', '+880', '2025-07-03', 'Professional', 'Machine Learning', 'ML Engineer', 'Male', 30, 'MSc', 'CSE', 0, 50),
(15, 'Junain40', 'kasem@gmail.com', '1234', 'Junain Uddin', '/uploads/1751577474411.jpg', '018345923452', '1958472513', '+880', '2025-07-03', 'Student', 'Web Development', 'Full Stack Development', 'Male', 23, 'BSc', 'CSE', 0, 0),
(16, 'Piash51', 'piash@gmail.com', '12344', 'Piash Islam', '/uploads/1751577760892.jpg', '01748593857', '18574960013', '+880', '2025-07-03', 'Student', 'DevOps', 'Frontend Development', 'Male', 22, 'BSc', 'CSE', 0, 0),
(17, 'Asma11', 'asma@gmail.com', '12342', 'Asma Ul Hasna', '/uploads/1751577957982.jpg', '01938472638', NULL, 'asma@gmail.', '2025-07-03', 'Student', 'Machine Learning', 'Data Scientist', 'Female', 21, 'BSc', 'CSE', 0, 70);

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`user_id`, `course_id`) VALUES
(14, 10002),
(15, 10003),
(15, 10004),
(15, 10007),
(16, 10001),
(16, 10004),
(16, 10005),
(17, 10002),
(17, 10003),
(17, 10005);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cate_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_cate` (`cate_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_course` (`course_id`),
  ADD KEY `payment_user` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `questions_ibfk_1` (`quiz_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`) USING BTREE;

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10015;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `foreign_cate` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`cate_id`);

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
