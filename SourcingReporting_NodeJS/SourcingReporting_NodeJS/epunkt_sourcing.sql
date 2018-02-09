-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Feb 2018 um 12:04
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

INSERT INTO `candidate` (`id`, `firstname`, `lastname`, `source_id`, `source_text`, `eR`, `tracking`, `request`, `response`, `response_value`, `telnotice`, `intern`, `extern`, `hire`, `team_id`, `scoreboard`, `research`, `sourcer`, `infos`, `date`) VALUES
(1, 'Patrick', 'Prehl', 4, 'https://www.linkedin.com/in/patrick-prehl-00813ab4/', NULL, 0, 1, 1, 1, '2018-01-03', '0000-00-00', '0000-00-00', '0000-00-00', NULL, 0, '2018-01-02', 3, 'wir reden im August nochmal', '2018-01-24 15:09:59'),
(2, 'Viktoria', 'TestKandi2', 5, NULL, '#662255', 1, 1, 0, NULL, '2018-02-10', '0000-00-00', '0000-00-00', '0000-00-00', NULL, 0, '2018-02-06', 1, NULL, '2018-02-06 08:10:59');

-- --------------------------------------------------------

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

--
-- Daten für Tabelle `history`
--

INSERT INTO `history` (`ID`, `title`, `cand_id`, `user_id`, `date`, `important`, `text`) VALUES
(1, 'Erster History Eintrag', 1, 1, '2017-12-20', 1, 'Erster Testeintrag');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `projects`
--

INSERT INTO `projects` (`id`, `title`, `status`, `owner`, `start`, `end`, `type`) VALUES
(1, 'Test projekt', 1, 1, '2018-01-09', '2018-01-24', 1);

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
(10, 'StackOverflow', 0),
(11, 'GitHub', 0),
(12, 'Talentwunder', 1);

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
(7, 'WUT Linz', 1, 1),
(8, 'WUT Wien', 2, 1),
(9, 'WUT Graz', 3, 1),
(12, 'AÜ Graz', 3, 1),
(13, 'WuT Salzburg', 4, 1),
(14, 'Interne Services', 5, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `telnotiz`
--

CREATE TABLE `telnotiz` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `cand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `telnotiz`
--

INSERT INTO `telnotiz` (`id`, `date`, `user_id`, `cand_id`) VALUES
(1, '2017-12-19', 1, 1),
(2, '2017-12-20', 4, 1);

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
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `wig`
--

INSERT INTO `wig` (`id`, `name`, `start`, `end`, `goal`, `active`) VALUES
(1, 'Sourcing Heldenreise 2018', '2018-01-01', '2018-12-31', 444, 1);

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
-- Indizes für die Tabelle `telnotiz`
--
ALTER TABLE `telnotiz`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `telnotiz`
--
ALTER TABLE `telnotiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `wig`
--
ALTER TABLE `wig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
