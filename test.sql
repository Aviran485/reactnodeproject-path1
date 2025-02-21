-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: פברואר 21, 2025 בזמן 11:54 PM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `employees`
--

INSERT INTO `employees` (`id`, `username`, `password`) VALUES
(1, 'worker1', '$2a$10$exampleHashedPasswordHere'),
(3, 'worker3', '$2a$10$hashedPasswordForWorker3'),
(4, 'worker2', '$2a$10$nGlDKOh2/0SgfqYv4ty.H.ei6xjouej3UQEkIOR/TJ6FLFOEFn57y'),
(5, 'worker69', '$2a$10$.YZvfxO/TBV9.qQJqWsMUetEqQQgPrPiZ0eqI3UxsOt12LK.LHq9a'),
(6, 'worker50k', '$2a$10$q4QcmDyRNjSnjGtFYfYadOanaEvn7hZBafVOX3xAYZVJoQj5vaqyi');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` longblob DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('לא טופל','בטיפול','טופל') DEFAULT 'לא טופל'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `image`, `description`, `location`, `status`) VALUES
(18, 1, 0x696d6167652d313733393937393130333132362e706e67, 'asdasd', '32.0852999, 34.7817676', 'לא טופל'),
(19, 1, 0x696d6167652d313733393938323433393833342e6a7067, 'asdasd', '32.7780405, 35.0257261', 'לא טופל'),
(20, 1, 0x696d6167652d313733393938323734383930352e6a7067, 'sssssssssssss', '32.7762239, 35.0286538', 'לא טופל'),
(21, 1, 0x696d6167652d313733393938353930373238342e6a7067, 'bbbbbbbbbbbbb', '32.7780405, 35.0257261', 'לא טופל'),
(23, 1, 0x696d6167652d313733393938363832373334352e6a7067, '123', '32.7762246, 35.0286577', 'לא טופל'),
(24, 1, 0x696d6167652d313733393938373037303436352e6a7067, 'yyyyyyyyyyy', '32.7780405, 35.0257261', 'לא טופל'),
(25, 4, 0x696d6167652d313733393938373530303831312e6a7067, 'ayo bruv', '32.7762248, 35.0286538', 'לא טופל'),
(26, 4, 0x696d6167652d313733393938373933393735382e6a7067, 'rrrrrrrrrrrr', '32.7780405, 35.0257261', 'לא טופל');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- אינדקסים לטבלה `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
