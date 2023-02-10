-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2023 at 08:56 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studrent`
--

-- --------------------------------------------------------

--
-- Table structure for table `adresa`
--

CREATE TABLE `adresa` (
  `id` int(11) NOT NULL,
  `grad_id` int(11) DEFAULT NULL,
  `ulica` varchar(255) DEFAULT NULL,
  `broj` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adresa`
--

INSERT INTO `adresa` (`id`, `grad_id`, `ulica`, `broj`) VALUES
(131, 1, '231', 231),
(132, 1, '231', 231),
(133, 1, 'noakoca', 34),
(134, 1, 'vukovarska', 34),
(135, 1, 'sportska', 34),
(136, 1, 'sportska', 34),
(137, 1, 'frankopanska', 34),
(138, 1, 'vukovarska', 18),
(139, 1, 'vukovarska', 18),
(140, 1, 'vukovarska', 18),
(141, 1, 'vukovarska', 18),
(142, 1, '123', 123),
(143, 1, '123', 123),
(144, 1, '123', 23),
(145, 1, '123', 23),
(146, 1, '1', 1),
(147, 1, '1', 1),
(148, 1, '1', 1),
(149, 1, '1', 1),
(150, 1, '1', 1),
(151, 1, '1', 1),
(152, 1, '1', 1),
(153, 1, '1', 1),
(154, 1, '1', 1),
(155, 1, '1', 1),
(156, 1, '1', 1),
(157, 1, '1', 1),
(158, 1, '1', 1),
(159, 1, '1', 1),
(160, 1, '1', 1),
(161, 1, '1', 1),
(162, 1, '1', 1),
(163, 1, '1', 1),
(164, 1, '1', 1),
(165, 1, '1', 1),
(166, 1, '1', 1),
(167, 1, 'Ul dr Ivana Novaka', 30),
(168, 1, 'proba', 34),
(169, 1, '123', 123);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `par_id` int(11) DEFAULT NULL,
  `poruka_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grad`
--

CREATE TABLE `grad` (
  `id` int(11) NOT NULL,
  `pbr` int(11) DEFAULT NULL,
  `naziv` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grad`
--

INSERT INTO `grad` (`id`, `pbr`, `naziv`) VALUES
(1, 9999, 'Zagreb'),
(2, 9999, 'Čakovec'),
(3, 9999, 'Varaždin'),
(4, 9999, 'Rijeka');

-- --------------------------------------------------------

--
-- Table structure for table `karakteristike`
--

CREATE TABLE `karakteristike` (
  `id` int(11) NOT NULL,
  `kvadratura` int(11) DEFAULT NULL,
  `broj_soba` int(11) DEFAULT NULL,
  `broj_kuhinja` int(11) DEFAULT NULL,
  `broj_kupaona` int(11) DEFAULT NULL,
  `klima` bit(1) DEFAULT NULL,
  `tv` bit(1) DEFAULT NULL,
  `ljubimci` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `karakteristike`
--

INSERT INTO `karakteristike` (`id`, `kvadratura`, `broj_soba`, `broj_kuhinja`, `broj_kupaona`, `klima`, `tv`, `ljubimci`) VALUES
(64, 1231, 0, 23, 1231, b'0', b'0', b'0'),
(65, 1231, 0, 231, 231, b'0', b'0', b'0'),
(66, 543, 0, 345, 345, b'1', b'1', b'0'),
(67, 543, 0, 345, 345, b'1', b'1', b'0'),
(68, 543, 0, 345, 345, b'1', b'1', b'0'),
(69, 543, 0, 345, 345, b'1', b'1', b'0'),
(70, 543, 0, 345, 345, b'1', b'1', b'0'),
(71, 543, 0, 345, 345, b'1', b'1', b'0'),
(72, 543, 4, 345, 345, b'1', b'1', b'0'),
(73, 543, 4, 345, 345, b'1', b'1', b'0'),
(74, 543, 4, 345, 345, b'1', b'1', b'0'),
(75, 123, 2, 312, 312, b'0', b'1', b'0'),
(76, 123, 2, 312, 312, b'0', b'1', b'0'),
(77, 123, 2, 123, 123, b'1', b'1', b'1'),
(78, 123, 2, 123, 123, b'1', b'1', b'1'),
(79, 1, 3, 1, 1, b'1', b'1', b'1'),
(80, 1, 3, 1, 1, b'1', b'1', b'1'),
(81, 1, 3, 1, 1, b'1', b'1', b'1'),
(82, 1, 3, 1, 1, b'1', b'1', b'1'),
(83, 1, 3, 1, 1, b'1', b'1', b'1'),
(84, 1, 3, 1, 1, b'1', b'1', b'1'),
(85, 1, 3, 1, 1, b'1', b'1', b'1'),
(86, 1, 3, 1, 1, b'1', b'1', b'1'),
(87, 1, 3, 1, 1, b'1', b'1', b'1'),
(88, 1, 3, 1, 1, b'1', b'1', b'1'),
(89, 1, 3, 1, 1, b'1', b'1', b'1'),
(90, 1, 3, 1, 1, b'1', b'1', b'1'),
(91, 1, 3, 1, 1, b'1', b'1', b'1'),
(92, 1, 3, 1, 1, b'1', b'1', b'1'),
(93, 1, 3, 1, 1, b'1', b'1', b'1'),
(94, 1, 3, 1, 1, b'1', b'1', b'1'),
(95, 1, 3, 1, 1, b'1', b'1', b'1'),
(96, 1, 3, 1, 1, b'1', b'1', b'1'),
(97, 1, 3, 1, 1, b'1', b'1', b'1'),
(98, 1, 3, 1, 1, b'1', b'1', b'1'),
(99, 1, 3, 1, 1, b'1', b'1', b'1'),
(100, 75, 0, 1, 1, b'1', b'1', b'0'),
(101, 123, 0, 123, 123, b'0', b'0', b'1'),
(102, 123, 0, 123, 123, b'0', b'0', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) DEFAULT NULL,
  `prezime` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `lozinka` varchar(32) DEFAULT NULL,
  `broj_telefona` varchar(32) DEFAULT NULL,
  `spol` bit(1) DEFAULT NULL,
  `datum_rodenja` date DEFAULT NULL,
  `skola_id` int(11) DEFAULT NULL,
  `profilna_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `ime`, `prezime`, `username`, `lozinka`, `broj_telefona`, `spol`, `datum_rodenja`, `skola_id`, `profilna_id`, `email`) VALUES
(33, 'Vito', 'List', 'vitolist', '8aa87050051efe26091a13dbfdf901c6', '12345', b'1', '2005-11-07', 5, 0, NULL),
(34, 'Vito', 'lisr', 'vitoo', '8aa87050051efe26091a13dbfdf901c6', '2345', b'1', '2023-03-02', 5, 0, 'vito.list2005@gmail.com'),
(35, 'vito', 'list', 'mirko', '13592f2caf86af30572a825229a2a8dc', '12312', b'1', '2023-02-09', 5, 0, 'mrko');

-- --------------------------------------------------------

--
-- Table structure for table `lajkane`
--

CREATE TABLE `lajkane` (
  `id` int(11) NOT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `stan_id` int(11) DEFAULT NULL,
  `aktivno` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `najam`
--

CREATE TABLE `najam` (
  `id` int(11) NOT NULL,
  `stan_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `aktivno` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `najam`
--

INSERT INTO `najam` (`id`, `stan_id`, `korisnik_id`, `aktivno`) VALUES
(1, 67, 33, b'1'),
(2, 67, 33, b'1'),
(3, 67, 33, b'1'),
(4, 67, 33, b'1'),
(5, 0, 33, b'1'),
(6, 0, 33, b'1'),
(7, 0, 33, b'1'),
(8, 70, 33, b'1'),
(9, 67, 0, b'1'),
(10, 67, 35, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `par`
--

CREATE TABLE `par` (
  `id` int(11) NOT NULL,
  `posiljatelj_id` int(11) DEFAULT NULL,
  `primatelj_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `poruka`
--

CREATE TABLE `poruka` (
  `id` int(11) NOT NULL,
  `sadrzaj` varchar(1024) DEFAULT NULL,
  `vrijeme` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profilna`
--

CREATE TABLE `profilna` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profilna`
--

INSERT INTO `profilna` (`id`, `url`) VALUES
(1, 'url_proba');

-- --------------------------------------------------------

--
-- Table structure for table `skola`
--

CREATE TABLE `skola` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skola`
--

INSERT INTO `skola` (`id`, `naziv`) VALUES
(1, 'cakovec');

-- --------------------------------------------------------

--
-- Table structure for table `slike_stana`
--

CREATE TABLE `slike_stana` (
  `id` int(11) NOT NULL,
  `stan_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pocetna` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sobe`
--

CREATE TABLE `sobe` (
  `id` int(11) NOT NULL,
  `stan_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sobe`
--

INSERT INTO `sobe` (`id`, `stan_id`) VALUES
(77, 102),
(78, 102),
(79, 102);

-- --------------------------------------------------------

--
-- Table structure for table `stan`
--

CREATE TABLE `stan` (
  `id` int(11) NOT NULL,
  `adresa_id` int(11) DEFAULT NULL,
  `karakteristike_id` int(11) DEFAULT NULL,
  `aktivan` bit(1) DEFAULT NULL,
  `vrijeme_objave` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cijena` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stan`
--

INSERT INTO `stan` (`id`, `adresa_id`, `karakteristike_id`, `aktivan`, `vrijeme_objave`, `cijena`) VALUES
(67, 131, 64, b'1', '0000-00-00 00:00:00', 0.99),
(68, 132, 65, b'1', '0000-00-00 00:00:00', 0.99),
(69, 133, 66, b'1', '0000-00-00 00:00:00', 0.99),
(70, 134, 67, b'1', '0000-00-00 00:00:00', 0.99),
(71, 135, 68, b'1', '0000-00-00 00:00:00', 0.99),
(72, 136, 69, b'1', '0000-00-00 00:00:00', 0.99),
(73, 137, 70, b'1', '0000-00-00 00:00:00', 0.99),
(74, 138, 71, b'1', '0000-00-00 00:00:00', 0.99),
(75, 139, 72, b'1', '0000-00-00 00:00:00', 0.99),
(76, 140, 73, b'1', '0000-00-00 00:00:00', 0.99),
(77, 141, 74, b'1', '0000-00-00 00:00:00', 0.99),
(78, 142, 75, b'1', '0000-00-00 00:00:00', 0.99),
(79, 143, 76, b'1', '0000-00-00 00:00:00', 0.99),
(80, 144, 77, b'1', '0000-00-00 00:00:00', 0.99),
(81, 145, 78, b'1', '0000-00-00 00:00:00', 0.99),
(82, 146, 79, b'1', '0000-00-00 00:00:00', 0.99),
(83, 147, 80, b'1', '0000-00-00 00:00:00', 0.99),
(84, 148, 81, b'1', '0000-00-00 00:00:00', 0.99),
(85, 149, 82, b'1', '0000-00-00 00:00:00', 0.99),
(86, 150, 83, b'1', '0000-00-00 00:00:00', 0.99),
(87, 151, 84, b'1', '0000-00-00 00:00:00', 0.99),
(88, 152, 85, b'1', '0000-00-00 00:00:00', 0.99),
(89, 153, 86, b'1', '0000-00-00 00:00:00', 0.99),
(90, 154, 87, b'1', '0000-00-00 00:00:00', 0.99),
(91, 155, 88, b'1', '0000-00-00 00:00:00', 0.99),
(92, 156, 89, b'1', '0000-00-00 00:00:00', 0.99),
(93, 157, 90, b'1', '0000-00-00 00:00:00', 0.99),
(94, 158, 91, b'1', '0000-00-00 00:00:00', 0.99),
(95, 159, 92, b'1', '0000-00-00 00:00:00', 0.99),
(96, 160, 93, b'1', '0000-00-00 00:00:00', 0.99),
(97, 161, 94, b'1', '0000-00-00 00:00:00', 0.99),
(98, 162, 95, b'1', '0000-00-00 00:00:00', 0.99),
(99, 163, 96, b'1', '0000-00-00 00:00:00', 0.99),
(100, 164, 97, b'1', '0000-00-00 00:00:00', 0.99),
(101, 165, 98, b'1', '0000-00-00 00:00:00', 0.99),
(102, 166, 99, b'1', '0000-00-00 00:00:00', 0.99),
(103, 167, 100, b'1', '0000-00-00 00:00:00', 0.99),
(104, 168, 101, b'1', '0000-00-00 00:00:00', 0.99),
(105, 169, 102, b'1', '0000-00-00 00:00:00', 0.99);

-- --------------------------------------------------------

--
-- Table structure for table `stanari`
--

CREATE TABLE `stanari` (
  `id` int(11) NOT NULL,
  `soba_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tip_sobe`
--

CREATE TABLE `tip_sobe` (
  `id` int(11) NOT NULL,
  `soba_id` int(11) DEFAULT NULL,
  `kapacitet` int(11) DEFAULT NULL,
  `popunjenost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tip_sobe`
--

INSERT INTO `tip_sobe` (`id`, `soba_id`, `kapacitet`, `popunjenost`) VALUES
(64, 77, 1, 0),
(65, 78, 2, 0),
(66, 79, 14210, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vlasnistvo`
--

CREATE TABLE `vlasnistvo` (
  `id` int(11) NOT NULL,
  `stan_id` int(11) DEFAULT NULL,
  `vlasnik_id` int(11) DEFAULT NULL,
  `aktivno` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vlasnistvo`
--

INSERT INTO `vlasnistvo` (`id`, `stan_id`, `vlasnik_id`, `aktivno`) VALUES
(57, 67, 0, b'1'),
(58, 68, 33, b'1'),
(59, 69, 0, b'1'),
(60, 70, 0, b'1'),
(61, 71, 0, b'1'),
(62, 72, 0, b'1'),
(63, 73, 0, b'1'),
(64, 74, 0, b'1'),
(65, 75, 0, b'1'),
(66, 76, 0, b'1'),
(67, 77, 0, b'1'),
(68, 78, 33, b'1'),
(69, 79, 33, b'1'),
(70, 80, 33, b'1'),
(71, 81, 33, b'1'),
(72, 82, 33, b'1'),
(73, 83, 33, b'1'),
(74, 84, 33, b'1'),
(75, 85, 33, b'1'),
(76, 86, 33, b'1'),
(77, 87, 33, b'1'),
(78, 88, 33, b'1'),
(79, 89, 33, b'1'),
(80, 90, 33, b'1'),
(81, 91, 33, b'1'),
(82, 92, 33, b'1'),
(83, 93, 33, b'1'),
(84, 94, 33, b'1'),
(85, 95, 33, b'1'),
(86, 96, 33, b'1'),
(87, 97, 33, b'1'),
(88, 98, 33, b'1'),
(89, 99, 33, b'1'),
(90, 100, 33, b'1'),
(91, 101, 33, b'1'),
(92, 102, 33, b'1'),
(93, 103, 33, b'1'),
(94, 104, 33, b'1'),
(95, 105, 35, b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adresa`
--
ALTER TABLE `adresa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grad`
--
ALTER TABLE `grad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `karakteristike`
--
ALTER TABLE `karakteristike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lajkane`
--
ALTER TABLE `lajkane`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `najam`
--
ALTER TABLE `najam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par`
--
ALTER TABLE `par`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poruka`
--
ALTER TABLE `poruka`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profilna`
--
ALTER TABLE `profilna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skola`
--
ALTER TABLE `skola`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slike_stana`
--
ALTER TABLE `slike_stana`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sobe`
--
ALTER TABLE `sobe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stan`
--
ALTER TABLE `stan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stanari`
--
ALTER TABLE `stanari`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tip_sobe`
--
ALTER TABLE `tip_sobe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vlasnistvo`
--
ALTER TABLE `vlasnistvo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adresa`
--
ALTER TABLE `adresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grad`
--
ALTER TABLE `grad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `karakteristike`
--
ALTER TABLE `karakteristike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `lajkane`
--
ALTER TABLE `lajkane`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `najam`
--
ALTER TABLE `najam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `par`
--
ALTER TABLE `par`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poruka`
--
ALTER TABLE `poruka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profilna`
--
ALTER TABLE `profilna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skola`
--
ALTER TABLE `skola`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slike_stana`
--
ALTER TABLE `slike_stana`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sobe`
--
ALTER TABLE `sobe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `stan`
--
ALTER TABLE `stan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `stanari`
--
ALTER TABLE `stanari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tip_sobe`
--
ALTER TABLE `tip_sobe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `vlasnistvo`
--
ALTER TABLE `vlasnistvo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
