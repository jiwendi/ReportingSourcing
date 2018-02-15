-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Feb 2018 um 08:51
-- Server-Version: 10.1.25-MariaDB
-- PHP-Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `epunkt_sourcing`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `source_id` int(11) NOT NULL,
  `source_text` text,
  `eR` varchar(11) DEFAULT NULL,
  `tracking` int(11) NOT NULL,
  `request` int(11) NOT NULL,
  `response` int(11) NOT NULL,
  `response_value` int(11) DEFAULT NULL,
  `telnotice` date DEFAULT NULL,
  `intern` date DEFAULT NULL,
  `extern` date DEFAULT NULL,
  `hire` date DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `scoreboard` int(11) NOT NULL DEFAULT '0',
  `research` date NOT NULL,
  `sourcer` int(11) NOT NULL,
  `infos` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `candidate`
--

--
-- Tabellenstruktur für Tabelle `city_group`
--

CREATE TABLE `city_group` (
  `id` int(11) NOT NULL,
  `city` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `city_group`
--

INSERT INTO `city_group` (`id`, `city`) VALUES
(0, 'nicht zugeordnet'),
(1, 'Linz'),
(2, 'Wien'),
(3, 'Graz'),
(4, 'Salzburg'),
(5, 'Allgemein');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `history`
--

CREATE TABLE `history` (
  `ID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cand_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `important` int(11) NOT NULL DEFAULT '0',
  `text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sources`
--

CREATE TABLE `sources` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `sources`
--

INSERT INTO `sources` (`id`, `name`, `active`) VALUES
(1, 'AMS', 1),
(2, 'HTL-Listen', 1),
(3, 'karriere.at', 1),
(4, 'LinkedIn', 1),
(5, 'Lufties', 1),
(6, 'Messen', 1),
(7, 'Offline', 1),
(8, 'Vergiss-mein-nicht-Liste', 1),
(9, 'XING', 1),
(10, 'StackOverflow', 1),
(11, 'GitHub', 1),
(12, 'Talentwunder', 1),
(13, 'Sonstiges', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city_group` int(11) NOT NULL DEFAULT '0',
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`id`, `name`, `city_group`, `active`) VALUES
(0, 'nicht vermittelt', 0, 1),
(1, 'IT Linz', 1, 1),
(2, 'IT Wien', 2, 1),
(3, 'IT Graz', 3, 1),
(4, 'AÜ Linz', 1, 1),
(5, 'AÜ Wien', 2, 1),
(7, 'BT Linz', 1, 1),
(8, 'BT Wien', 2, 1),
(9, 'BT Graz', 3, 1),
(12, 'AÜ Graz', 3, 1),
(13, 'BT Salzburg', 4, 1),
(14, 'Interne Services', 5, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` int(11) NOT NULL DEFAULT '1',
  `admin` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `created_at`, `active`, `admin`) VALUES
(1, 'viktoria.jechsmayr@epunkt.com', 'QIDQp59Ksa3nO4mPVAari/YIecLs7BVBZCrvIo7E6s8=', 'Viktoria', 'Jechsmayr', '2017-11-20 14:43:32', 1, 1),
(2, 'michaela.moser@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Michaela', 'Moser', '2018-01-02 12:13:11', 1, 1),
(3, 'daniela.hoefler@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Daniela', 'Höfler', '2018-01-02 12:13:51', 1, 0),
(4, 'theresa.singer@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Theresa', 'Singer', '2018-01-02 12:13:28', 1, 0),
(5, 'maria.harvey@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Maria', 'Harvey', '2018-01-02 12:12:51', 1, 0),
(6, 'eric.wuestenberg@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Eric', 'Wüstenberg', '2018-01-02 12:15:03', 1, 0),
(7, 'vanessa.katzlberger@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Vanessa', 'Katzlberger', '2018-01-02 12:14:42', 1, 0),
(8, 'thomas.mayrhofer@epunkt.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', 'Thomas', 'Mayrhofer', '2018-01-02 12:15:24', 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wig`
--

CREATE TABLE `wig` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `goal` int(11) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `wig`
--

INSERT INTO `wig` (`id`, `name`, `start`, `end`, `goal`, `active`) VALUES
(1, 'Sourcing Heldenreise 2018', '2017-12-31', '2018-12-30', 444, 1),
(7, 'Jänner', '2017-12-31', '2018-01-30', 20, 0),
(8, 'Februar', '2018-02-01', '2018-02-28', 25, 0),
(9, 'März', '2018-03-01', '2018-03-31', 25, 0),
(10, 'April', '2018-04-01', '2018-04-30', 32, 0),
(11, 'Mai', '2018-05-01', '2018-05-31', 35, 0),
(12, 'Juni', '2018-06-01', '2018-06-30', 35, 0),
(13, 'Juli', '2018-07-01', '2018-07-31', 40, 0),
(14, 'August', '2018-08-01', '2018-08-31', 40, 0),
(15, 'September', '2018-09-01', '2018-09-30', 45, 0),
(16, 'Oktober', '2018-10-01', '2018-10-31', 45, 0),
(17, 'November', '2018-11-01', '2018-11-30', 50, 0),
(18, 'Dezember', '2018-12-01', '2018-12-31', 52, 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `city_group`
--
ALTER TABLE `city_group`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `sources`
--
ALTER TABLE `sources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indizes für die Tabelle `wig`
--
ALTER TABLE `wig`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `city_group`
--
ALTER TABLE `city_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `history`
--
ALTER TABLE `history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `sources`
--
ALTER TABLE `sources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `wig`
--
ALTER TABLE `wig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
