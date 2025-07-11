-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 09:24 PM
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
(10001, 'https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg', 4, 18, 0, 'Learn Artificial Intelligence', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 20, '2025-06-29 20:10:17', 2, '5NgNicANyqM', 0, 0, 0, '[{\"name\":\"Python\",\"icon\":\"assets/images/python.jpg\"},{\"name\":\"AWS\",\"icon\":\"assets/images/aws-brands.svg\"},{\"name\":\"Docker\",\"icon\":\"assets/images/docker-brands.svg\"},{\"name\":\"Jenkins\",\"icon\":\"assets/images/jenkins-brands-solid.svg\"},{\"name\":\"Flask\",\"icon\":\"assets/images/Flask.png\"},{\"name\":\"MSSQL\",\"icon\":\"assets/images/MSSQL.png\"},{\"name\":\"Git\",\"icon\":\"assets/images/Git.png\"}]'),
(10002, 'https://img.youtube.com/vi/RWXKysImabs/hqdefault.jpg', 2, 2, 2, 'Learn Dot Net Development', 'This project showcases web application development using the .NET framework, focusing on building scalable backend services with ASP.NET Core. It includes implementation of RESTful APIs, integration with a SQL Server database, and application of MVC architecture for clean and maintainable code structure.', 10, '2025-07-03 16:35:20', 1, 'RWXKysImabs', 0, 0, 0, '[{\"name\":\"C#\",\"icon\":\"assets/images/c_Sharp.png\"},{\"name\":\"ASP.NET MVC\",\"icon\":\"assets/images/MVC_arch.png\"},{\"name\":\"OOP\",\"icon\":\"assets/images/oop.png\"},{\"name\":\"VS Code\",\"icon\":\"assets/images/VsCode.png\"}]'),
(10003, 'https://img.youtube.com/vi/EsUL2bfKKLc/hqdefault.jpg', 13, 2, 7, 'Full Stack Web Development (MERN)', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 30, '2025-07-03 19:30:20', 1, 'EsUL2bfKKLc', 1, 0, 2500, '[{\"name\":\"React\",\"icon\":\"assets/images/reactJS.png\"},{\"name\":\"Node.js\",\"icon\":\"assets/images/nodejs.png\"},{\"name\":\"NEXT.js\",\"icon\":\"assets/images/nextJS.png\"},{\"name\":\"JQuery\",\"icon\":\"assets/images/Jquery.png\"}]'),
(10004, 'https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg', 3, 8, 5, 'Web Development From Scratch', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 139, '2025-07-03 19:57:37', 1, 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w', 0, 0, 0, '[{\"name\":\"HTML\",\"icon\":\"assets/images/html.png\"},{\"name\":\"CSS\",\"icon\":\"assets/images/CSS.png\"},{\"nam\":\"JavaScript\",\"icon\":\"assets/images/JS.png\"},{\"name\":\"Rest API\",\"icon\":\"assets/images/REST_Api.png\"},{\"name\":\"MSSQL\",\"icon\":\"assets/images/MSSQL.png\"},{\"name\":\"Git\",\"icon\":\"assets/images/Git.png\"}]'),
(10005, 'https://img.youtube.com/vi/7WRlYJFG7YI/hqdefault.jpg', 3, 20, 2, 'Data Science Full Course', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 14, '2025-07-03 20:02:52', 4, '7WRlYJFG7YI', 0, 0, 0, '[{\"name\":\"Python\",\"icon\":\"assets/images/python.jpg\"},{\"name\":\"Django\",\"icon\":\"assets/images/Django.png\"},{\"name\":\"Fast API\",\"icon\":\"assets/images/FastAPi.png\"},{\"name\":\"Flask\",\"icon\":\"assets/images/Flask.png\"}]'),
(10006, 'https://img.youtube.com/vi/fNzpcB7ODxQ/hqdefault.jpg', 11, 4, 8, 'Learn Ethical Hacking', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 80, '2025-07-03 20:04:55', 3, 'fNzpcB7ODxQ', 0, 0, 0, '[]'),
(10007, 'https://img.youtube.com/vi/-TkoO8Z07hI/hqdefault.jpg', 20, 4, 5, 'Learn C++ Language', 'This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.', 40, '2025-07-03 20:10:33', 5, '-TkoO8Z07hI', 0, 0, 0, '[]');

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
(1, '4365436546', 13, 10003, '2025-07-04', 'bkash', 'Completed'),
(2, '34565467476', 15, 10003, '2025-07-04', 'rocket', 'Pending'),
(3, '32554356346', 17, 10003, '2025-07-04', 'Nagad', 'Completed');

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
  `rank` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `name`, `avatar`, `primaryNumber`, `alternativeNumber`, `countryCode`, `joinDate`, `currentOccupation`, `skillSector`, `specificTopic`, `gender`, `age`, `educationalBackground`, `subject`, `rank`, `points`) VALUES
(13, 'Rahul', 'rahuldatta484@gmail.com', '1234', 'Rahul Datta', '/uploads/1751225005000.jpeg', '01834538573', '1743857271', '+880', '2025-06-29', 'Student', 'Mobile Development', 'Full Stack Development', 'Male', 23, 'BSc', 'CSE', NULL, NULL),
(14, 'Kasem32', 'kasem@gmail.com', '13245', 'Kasem Malik', '/uploads/1751577378979.jpg', '01532647584', '8213214325', '+880', '2025-07-03', 'Professional', 'Machine Learning', 'ML Engineer', 'Male', 30, 'MSc', 'CSE', NULL, NULL),
(15, 'Junain40', 'kasem@gmail.com', '1234', 'Junain Uddin', '/uploads/1751577474411.jpg', '018345923452', '1958472513', '+880', '2025-07-03', 'Student', 'Web Development', 'Full Stack Development', 'Male', 23, 'BSc', 'CSE', NULL, NULL),
(16, 'Piash51', 'piash@gmail.com', '12344', 'Piash Islam', '/uploads/1751577760892.jpg', '01748593857', '18574960013', '+880', '2025-07-03', 'Student', 'DevOps', 'Frontend Development', 'Male', 22, 'BSc', 'CSE', NULL, NULL),
(17, 'Asma11', 'asma@gmail.com', '12342', 'Asma Ul Hasna', '/uploads/1751577957982.jpg', '01938472638', NULL, 'asma@gmail.', '2025-07-03', 'Student', 'Machine Learning', 'Data Scientist', 'Female', 21, 'BSc', 'CSE', NULL, NULL);

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
(13, 10001),
(13, 10003),
(13, 10004),
(13, 10007),
(15, 10004),
(15, 10007),
(16, 10001),
(16, 10005),
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
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_user` (`user_id`),
  ADD KEY `payment_course` (`course_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10008;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `foreign_cate` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`cate_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payment_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `payment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`);

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
