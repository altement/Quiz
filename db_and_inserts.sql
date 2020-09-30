-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Loomise aeg: Sept 30, 2020 kell 02:18 PM
-- Serveri versioon: 5.7.31-0ubuntu0.18.04.1
-- PHP versioon: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Andmebaas: `db_quiz`
--
CREATE DATABASE IF NOT EXISTS `db_quiz` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_quiz`;

-- --------------------------------------------------------

--
-- Tabeli struktuur tabelile `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quiz_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Andmete tõmmistamine tabelile `questions`
--

INSERT INTO `questions` (`id`, `name`, `image`, `description`, `quiz_id`) VALUES
(1, 'bmw', '	\r\ncontent/images/bmw.jpg', '', 1),
(2, 'audi', '	\r\ncontent/images/audi.jpg', '', 1),
(3, 'ford', '	\r\ncontent/images/ford.jpg', '', 1),
(4, 'benz', '	\r\ncontent/images/benz.jpg', '', 1),
(5, 'suzuki', '	\r\ncontent/images/suzuki.png', '', 1),
(6, 'škoda', '	\r\ncontent/images/skoda.png', '', 1),
(7, 'mitsubishi', '	\r\ncontent/images/mitsubishi.png', '', 1),
(8, 'volkswagen', '	\r\ncontent/images/volkswagen.png', '', 1),
(9, 'Aasnööbik', '	\r\ncontent/images/aasnoobik.jpg', '', 5),
(10, 'Aasšampinjon', '	\r\ncontent/images/aas-sampinjon.jpg', '', 5),
(11, 'Ahhaatriisikas', '	\r\ncontent/images/ahhaatriisikas.png', '', 5),
(12, 'Ametüstpilvik', '	\r\ncontent/images/ametuspilvik.jpg', '', 5),
(13, 'Austerservik', '	\r\ncontent/images/austerservik.jpg', '', 5),
(14, 'Areoolpilvik', ' \r\ncontent/images/areoolpilvik.jpg', '', 5),
(15, 'Alo Kurvits', 'content/images/kurvits.jpg', '', 9),
(16, 'Kirill Käro', 'content/images/karo.jpg', '', 9),
(17, 'Hannes Kaljujärv', 'content/images/kaljujarv.jpg', '', 9),
(18, 'Märt Avandi', 'content/images/avandi.jpg', '', 9),
(19, 'Jüri Aarma', 'content/images/aarma.jpg', '', 9),
(20, 'Kaljo Kiisk', 'content/images/kiisk.jpg', '', 9),
(21, 'Margus Tabor', 'content/images/tabor.jpg', '', 9);

-- --------------------------------------------------------

--
-- Tabeli struktuur tabelile `quizes`
--

CREATE TABLE `quizes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Andmete tõmmistamine tabelile `quizes`
--

INSERT INTO `quizes` (`id`, `name`, `image`) VALUES
(1, 'Automargid', '../content/images/suzuki.png'),
(2, 'Kassid', '../content/images/ameerika_shorthair.jpg'),
(3, 'Koerad', '../content/images/Belgia_Groenendael.jpg'),
(4, 'Taimed', '../content/images/bmw.jpg'),
(5, 'Seened', '../content/images/aniisilehtrik.jpg'),
(6, 'Muusikud', '../content/images/iff.jpg'),
(7, 'Firmad', '../content/images/nike.png'),
(8, 'Saatejuhid', '../content/images/libe.jpg'),
(9, 'Eesti näitlejad', '\r\n');

--
-- Indeksid tõmmistatud tabelitele
--

--
-- Indeksid tabelile `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indeksid tabelile `quizes`
--
ALTER TABLE `quizes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT tõmmistatud tabelitele
--

--
-- AUTO_INCREMENT tabelile `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT tabelile `quizes`
--
ALTER TABLE `quizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
