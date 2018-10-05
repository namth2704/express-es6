/*
SQLyog Professional v12.09 (64 bit)
MySQL - 10.1.26-MariaDB : Database - justanewproject
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`justanewproject` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `justanewproject`;

/*Table structure for table `favorite` */

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `StockID` varchar(10) NOT NULL,
  `UserID` int(11) NOT NULL,
  KEY `FK_FavoriteUser` (`UserID`),
  KEY `FK_FavoriteStock` (`StockID`),
  CONSTRAINT `FK_FavoriteStock` FOREIGN KEY (`StockID`) REFERENCES `stock` (`StockID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_FavoriteUser` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `price` */

DROP TABLE IF EXISTS `price`;

CREATE TABLE `price` (
  `StockID` varchar(10) NOT NULL,
  `Reference` float NOT NULL,
  `Ceil` float NOT NULL,
  `Floor` float NOT NULL,
  `TotalVolume` int(8) NOT NULL,
  `AveragePrice` float NOT NULL,
  `OpenPrice` float NOT NULL,
  `HighPrice` float NOT NULL,
  `LowPrice` float NOT NULL,
  `BoughtForeign` int(8) NOT NULL,
  `SoldForeign` int(8) NOT NULL,
  `RoomForeign` int(8) NOT NULL,
  `Date` date NOT NULL,
  KEY `FK_StockPrice` (`StockID`),
  CONSTRAINT `FK_StockPrice` FOREIGN KEY (`StockID`) REFERENCES `stock` (`StockID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `stock` */

DROP TABLE IF EXISTS `stock`;

CREATE TABLE `stock` (
  `StockID` varchar(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Type` varchar(5) NOT NULL DEFAULT 'HNX',
  PRIMARY KEY (`StockID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `transaction` */

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `StockID` varchar(10) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `BuyDate` datetime NOT NULL,
  KEY `FK_UserTransaction` (`UserID`),
  KEY `FK_StockTransaction` (`StockID`),
  CONSTRAINT `FK_StockTransaction` FOREIGN KEY (`StockID`) REFERENCES `stock` (`StockID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_UserTransaction` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `DateOfBirth` date NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
