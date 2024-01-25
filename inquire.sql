-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 02:56 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inquire`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(0, 'All Categories', 'All Categories'),
(1, 'Toys', 'Insert Toy Image'),
(2, 'Elephants', 'Insert Elephant Image'),
(3, 'paper', 'just normal paper'),
(5, 'Book', 'Book'),
(6, 'Book1', 'Book'),
(7, 'shirt', 'Book'),
(8, 'Book12', 'Book'),
(9, 'wer', 'wer');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `inquiry_id` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `attachments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attachments`)),
  `inquirer_email` varchar(255) NOT NULL,
  `inquirer_mobile` text NOT NULL,
  `inquirer_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`inquiry_id`, `body`, `attachments`, `inquirer_email`, `inquirer_mobile`, `inquirer_name`, `created_at`, `disabled`) VALUES
('1', 'I need an elephant toy', '{\"images\":[], \"files\":[]}', 'arsawant@gmail.com', '8369961686', 'Adzz', '2024-01-07 14:20:40', 0),
('3Oh5SDDZzO', 'asd', '{\"images\":[{\"url\":\"/inquiry/1eebb323-be11-4dd7-aec5-08d7937a52b8-1706177404373.jpg\",\"originalName\":\"IMG-20240125-WA0009.jpg\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/445da261-9071-46c3-92f3-d11ab7617735-1706177404398.jpg\",\"originalName\":\"IMG-20240125-WA0010.jpg\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/991b3011-08d1-4830-bdd7-4317e22aff4b-1706177404427.jpg\",\"originalName\":\"IMG-20240125-WA0011.jpg\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/05b20b0f-7a19-4c47-8c4e-6d280c3de652-1706177404458.jpg\",\"originalName\":\"IMG-20240125-WA0016.jpg\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/38e7d6cb-5ce4-4bc9-9cb7-2e766c0ee5d7-1706177404491.jpg\",\"originalName\":\"IMG-20240125-WA0017.jpg\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/76e856ba-8255-4a92-b103-f3f00009d4ea-1706177404518.jpg\",\"originalName\":\"IMG-20240125-WA0018.jpg\",\"type\":\"image/jpeg\"}],\"files\":[{\"url\":\"/inquiry/d46ec57c-3830-4647-9e48-56af33e97cf0-1706177404222.pdf\",\"originalName\":\"CSI-IV Permission.pdf\",\"type\":\"application/pdf\"},{\"url\":\"/inquiry/362611c6-7264-4414-bab0-f281f22b2297-1706177404285.pdf\",\"originalName\":\"Dell\'Orto India pvt ltd.pdf\",\"type\":\"application/pdf\"},{\"url\":\"/inquiry/df859f3b-4c80-4ce0-915a-dd570c583ff0-1706177404312.pdf\",\"originalName\":\"Delphi Automotive Systems.pdf\",\"type\":\"application/pdf\"},{\"url\":\"/inquiry/999de5d9-d091-4294-9d3e-709a0eab032f-1706177404345.pdf\",\"originalName\":\"GE India Industrial.pdf\",\"type\":\"application/pdf\"},{\"url\":\"/inquiry/ebd07d25-d758-4cf7-b0ad-ffcfd9979011-1706177404551.pdf\",\"originalName\":\"Volkswagen Motosport.pdf\",\"type\":\"application/pdf\"}]}', 'qwe@g.com', '7894561234', 'asd', '2024-01-25 10:10:04', 0),
('813eab49-8ad6-4371-a9bb-cca27b36441f', 'qwe', '{\"images\":[],\"files\":[{\"url\":\"/inquiry/05718589-af75-489a-a7d7-6f02a07288e3-1705923887685.pdf\", \"originalName\":\"SomeName.pdf\", \"type\":\"application/pdf\"}]}', 'qwe@g.com', 'qwe', 'qwe', '2024-01-22 11:44:47', 0),
('HnNqKxt77Z', 'This is the Body', '{\"images\":[{\"url\":\"/inquiry/a1534271-3fc8-4584-8bf7-e491dc462efb-1706174326335.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/be03d34a-ed58-4ebd-a5ed-10b8ee1cc8d7-1706174326730.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/20f53f25-486a-421a-a273-398e4969d1ce-1706174326751.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/cd407039-404b-42ab-b8e1-58ee696359fd-1706174326785.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/b8308600-1008-418a-9dbf-a044702dae5b-1706174326810.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/d87d4a5a-2ebb-4b07-8ed9-015556c5c65d-1706174326848.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/f151764d-cc2e-467d-8507-87cb53109774-1706174326877.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/8eea9326-ceac-47f2-978f-1820206fdb54-1706174326911.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/e109d741-9219-4898-819f-65a30007e355-1706174326941.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"},{\"url\":\"/inquiry/39f77d87-99bf-437a-aa37-583245ebf79b-1706174326964.jpg\",\"originalName\":\"\",\"type\":\"image/jpeg\"}],\"files\":[]}', 'adzz@g.com', '123456780', 'Adzzzzz', '2024-01-25 09:18:47', 0);

-- --------------------------------------------------------

--
-- Table structure for table `inquiry_categories`
--

CREATE TABLE `inquiry_categories` (
  `inquiry_id` varchar(255) NOT NULL,
  `category_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inquiry_categories`
--

INSERT INTO `inquiry_categories` (`inquiry_id`, `category_id`) VALUES
('1', 1),
('1', 2),
('3Oh5SDDZzO', 0),
('813eab49-8ad6-4371-a9bb-cca27b36441f', 0),
('HnNqKxt77Z', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `user_id` varchar(255) NOT NULL,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`user_id`, `user_first_name`, `user_last_name`) VALUES
('d94f8e54-7434-4dab-9649-bf04bd0a1a4b', 'Aditya', 'Super Admin'),
('8b598a20-8fc8-4977-a5f3-578a2311c50e', 'Aditya', 'Non Vendor');

-- --------------------------------------------------------

--
-- Table structure for table `user_auth`
--

CREATE TABLE `user_auth` (
  `user_id` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_hash` varchar(255) NOT NULL,
  `user_role_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_auth`
--

INSERT INTO `user_auth` (`user_id`, `user_email`, `user_hash`, `user_role_id`, `created_at`) VALUES
('8b598a20-8fc8-4977-a5f3-578a2311c50e', 'arsawant0912@gmail.com', '$2a$10$RJfzW6gTXiCE6LpOifpmqu2qj4EikwJgnbgmT0HNelc5rxHcfG6Ey', 2, '2024-01-23 22:03:12'),
('d94f8e54-7434-4dab-9649-bf04bd0a1a4b', 'arsawant09@gmail.com', '$2a$10$gReQk2uP/Yl/dslseRsk3.d4x00gityslBzCwd9.Hji8VPrLy7AVu', 0, '2024-01-22 19:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `role_id` int(255) NOT NULL,
  `role_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`role_id`, `role_description`) VALUES
(0, 'Super User'),
(1, 'Admin'),
(2, 'Vendors'),
(3, 'Non Verified');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`inquiry_id`);

--
-- Indexes for table `inquiry_categories`
--
ALTER TABLE `inquiry_categories`
  ADD PRIMARY KEY (`inquiry_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inquiry_categories`
--
ALTER TABLE `inquiry_categories`
  ADD CONSTRAINT `inquiry_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `inquiry_categories_ibfk_3` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries` (`inquiry_id`);

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `user_account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`user_id`);

--
-- Constraints for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD CONSTRAINT `user_auth_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
