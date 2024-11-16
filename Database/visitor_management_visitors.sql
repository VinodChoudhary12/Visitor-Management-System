-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: visitor_management
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `meeting_time` datetime DEFAULT NULL,
  `status` enum('PENDING','APPROVED','CHECKED_IN','CHECKED_OUT','REJECTED','CANCELED') DEFAULT 'PENDING',
  `qr_code` text,
  `entry_time` datetime DEFAULT NULL,
  `exit_time` datetime DEFAULT NULL,
  `meetingTo` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `view_By_user` tinyint(1) DEFAULT '0',
  `remark_By_User` varchar(255) DEFAULT NULL,
  `view_By_Visitor` tinyint(1) DEFAULT '0',
  `meetingToName` varchar(255) DEFAULT NULL,
  `visitorCompany` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
INSERT INTO `visitors` VALUES (1,'Sagar','sagar@gmail.com','123','2024-11-14 19:15:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKvSURBVO3BQW7sWAwEwUxC979yjZdcPUCQuv3NYYT5wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw+pfFMSOpWTJHQqXRJOVL4pCU8Ua5RijVKsUS5eloQ3qbwpCZ1Kl4STJLxJ5U3FGqVYoxRrlIsPU7kjCW9SOUnCEyp3JOGTijVKsUYp1igXf1wSTlS6JHQqXRL+smKNUqxRijXKxR+n0iWhS0KnMlmxRinWKMUa5eLDkvBJSehUTpLwpiT8S4o1SrFGKdYoFy9T+SaVLgmdyolKl4QTlX9ZsUYp1ijFGsX8YBCVLgn/J8UapVijFGuUi4dUuiScqHyTykkSOpUuCScqXRI6lTuS8ESxRinWKMUa5eLDVLoknKh0SehUuiR0Kneo3KFyotIl4UTlTcUapVijFGuUi4eS8IRKl4ROpUtCp3KShE7lJAl3JKFT+U3FGqVYoxRrFPODL1LpkvAmlZMkdCpvSsJvKtYoxRqlWKNcvEylS8KJyh1JeELlk1ROktCpdEl4olijFGuUYo1ifvCHqdyRhE7ljiTcoXJHEp4o1ijFGqVYo1w8pPJNSbgjCZ1Kl4Q3qZwk4ZOKNUqxRinWKBcvS8KbVO5IQqfSJeEOlS4JJ0noVE5UuiQ8UaxRijVKsUa5+DCVO5LwhMoTKneodEn4TcUapVijFGuUi2GScIfKHSp3JOEkCW8q1ijFGqVYo1z8cUnoVLokdCp3JKFTOVHpktCpnCThiWKNUqxRijXKxYcl4ZuS0KnckYQ7ktCpnCShU3lTsUYp1ijFGuXiZSrfpHKShBOVTqVLwolKl4RO5SQJbyrWKMUapVijmB+sMYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijfIfzd37+o8YnKQAAAAASUVORK5CYII=',NULL,NULL,'vinod@gmail.com','I am from dewas plant and i want to meet vinod for making a website for Kriti india oil \n',1,NULL,1,'Vinod',NULL),(2,'Vinod','v@gmail.com','123','2024-11-14 21:18:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALUSURBVO3BQW7gSAwEwSxC//9yro88NSBIMsZcRsQfrDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1y8VASfpPKHUk4UTlJwm9SeaJYoxRrlGKNcvEylTcl4SQJncqJyhMqb0rCm4o1SrFGKdYoFx9Lwh0qd6h0SehUuiScqNyRhDtUvlSsUYo1SrFGKdYoxRqlWKMUa5SLPy4JJ0noVLokTFKsUYo1SrFGufiYypdUTpLwJZV/SbFGKdYoxRrl4mVJ+E1J6FS+lIR/WbFGKdYoxRol/uB/JAknKn9ZsUYp1ijFGuXioSR0Kl0SOpUuCZ1Kl4RO5Y4knKg8kYRO5SQJncqbijVKsUYp1igXL0tCp9Il4SQJncodSehUnkhCp9KpnCThNxVrlGKNUqxR4g8+lIROpUvCl1ROktCp3JGETuWOJHQqTxRrlGKNUqxR4g8eSMKJSpeEE5WTJJyodEnoVO5IQqdyRxJOVN5UrFGKNUqxRrl4SOUOlTuScKJyonKShE7ljiR0KicqXyrWKMUapVijXPzjVE6S8IRKl4ROpUtCp9IloVPpktCpvKlYoxRrlGKNcvFQEn6TSqdyRxLuSMITSThJQqfyRLFGKdYoxRrl4mUqb0rCHUm4IwknKl0SuiScqHRJ6FTeVKxRijVKsUa5+FgS7lC5IwknKl0SOpUuCV0STlS6JHRJ6FS6JHQqTxRrlGKNUqxRLv44lS4JXRI6lROVLgmdyolKl4QuCZ3Km4o1SrFGKdYoF39cEjqVO5LQqXQqJ0noVDqVkyR0Kk8Ua5RijVKsUS4+pvIllZMkdCqdykkSOpVO5SQJnUqn8qZijVKsUYo1ysXLkvCbknCicpKETuWOJHQqdyShU3miWKMUa5RijRJ/sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKf5GjJfLno0aCAAAAAElFTkSuQmCC',NULL,NULL,'vinod@gmail.com','I am from pithampur and i want meet vinod for making api that insert data in database',1,'I am from pithampur and i want meet vinod for making api that insert data in database  Status :  PENDING  Meeting To : Vinod  View',1,'Vinod',NULL),(3,'Vinod','v@gmail.com','123','2024-11-14 20:26:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKlSURBVO3BQW7sWAwEwUxC979yjZdcPUCQuv3NYYT5wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw+pfFMSOpUuCZ3KHUnoVL4pCU8Ua5RijVKsUS5eloQ3qdyh0iWhU3kiCW9SeVOxRinWKMUa5eLDVO5Iwjcl4QmVO5LwScUapVijFGuUiz8uCScq/yfFGqVYoxRrlIs/TuUJlS4Jf1mxRinWKMUa5eLDkvBJSehUTpLwpiT8S4o1SrFGKdYoFy9T+SaVLgmdyolKl4QTlX9ZsUYp1ijFGsX8YBCVkyRMVqxRijVKsUa5eEilS8KJyicl4USlS0Kn0iXhRKVLQqdyRxKeKNYoxRqlWKNcvEzlJAknKl0STlQ6lS4JJyp3qJyodEk4UXlTsUYp1ijFGuXioSScqNyRhE7lJAmdSqdyRxLuSEKn8puKNUqxRinWKOYHL1I5SUKn0iXhTSpdEjqVNyXhNxVrlGKNUqxRzA8eUOmScKLSJaFTeSIJJyq/KQmfVKxRijVKsUYxP/jDVE6ScKJyRxLuULkjCU8Ua5RijVKsUS4eUvmmJDyh0iXhTSonSfikYo1SrFGKNcrFy5LwJpUnVLok3KHSJeEkCZ3KiUqXhCeKNUqxRinWKBcfpnJHEp5IQqdyh8odKl0SflOxRinWKMUa5WK4JJyo3KFyRxJOkvCmYo1SrFGKNcrFH5eETqVLQqdyRxI6lROVLgmdykkSnijWKMUapVijXHxYEn6Tyh1JuCMJncpJEjqVNxVrlGKNUqxRLl6m8k0qdyShU+lUuiScqHRJ6FROkvCmYo1SrFGKNYr5wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYo/wFPePD/3UhDKwAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','I am from pithampur and i want meet vinod for making api that insert data in database',1,NULL,1,'Vinod',NULL),(4,'Vinod','v@gmail.com','123','2024-11-14 20:27:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALVSURBVO3BQa7jSAwFwXyE7n/lnL/kqgBBsqdNMCL+YY1RrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUi4eS8E0qb0pCp9Il4ZtUnijWKMUapVijXLxM5U1JOElCp3KHyh0qb0rCm4o1SrFGKdYoFx+WhDtU7lDpktCpdEk4UbkjCXeofFKxRinWKMUapVijFGuUYo1SrFEuflwSTpLQqXRJmKRYoxRrlGKNcvFhKp+k8n9S+ZcUa5RijVKsUS5eloRvSkKn0iWhU3kiCf+yYo1SrFGKNUr8wyBJeELllxVrlGKNUqxRLh5KQqfSJaFT6ZLQqXRJ6FROVLoknKg8kYRO5SQJncqbijVKsUYp1igXD6m8KQmdyptU7khCp9KpnCThm4o1SrFGKdYoFw8l4U0qXRLuULkjCZ1Kp3KShE6lUzlJQqfyRLFGKdYoxRol/uGBJHQqXRJOVJ5IQqfypiR0Knck4UTlTcUapVijFGuUi5cloVPpktAl4Q6VTuUkCZ1Kl4RO5Y4kdConKl0SOpUnijVKsUYp1ijxDz8sCZ1Kl4QTlS4JnUqXhE6lS0Kn8k3FGqVYoxRrlIuHkvBNKp3KJyXhiSTcofJEsUYp1ijFGuXiZSpvSsIdSehUuiR0SThR6ZLQJeFEpUtCp/KmYo1SrFGKNcrFhyXhDpU7ktCpdEk4UemS0CXhRKVLQpeETqVLQqfyRLFGKdYoxRrl4sepdEnoVO5Q6ZLQqZyodEnoktCpvKlYoxRrlGKNcvHjktCp3JGETqVTOUlCp9KpnCShU3miWKMUa5RijXLxYSqfpHKShE6lUzlJQqfSqZwkoVPpVN5UrFGKNUqxRrl4WRK+KQknKidJ6FTuSEKnckcSOpUnijVKsUYp1ijxD2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/Ac1IjHgnVc3VAAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','I am from pithampur and i want meet vinod for making api that insert data in database',1,NULL,1,'Vinod',NULL),(5,'Vinod','v@gmail.com','123','2024-11-14 21:09:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKlSURBVO3BQY7cQAwEwSxC//9yeo88NSBoNF7TjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKHUk4UTlJwjepPFGsUYo1SrFGufgwlU9KwpuS0KmcqHxSEj6pWKMUa5RijXLxsiTcoXJHEp5QeSIJd6i8qVijFGuUYo1yMZxKl4TJijVKsUYp1igXwyWhU+mS0Kn8y4o1SrFGKdYoFy9T+SaVLgldEjqVJ1R+k2KNUqxRijXKxYcl4TdT6ZLQqZwk4Tcr1ijFGqVYo8Qf/MOScKLyPynWKMUapVijXDyUhE6lS8InqXQqJ0k4UTlJwiepvKlYoxRrlGKNcvGQyh0qXRJOVO5IQqfSJaFLwh0qJ0noVL6pWKMUa5RijRJ/8EASTlSeSMIdKnckoVPpknCi8psUa5RijVKsUeIPvigJd6h0SehUuiS8SeUkCZ3KNxVrlGKNUqxR4g9elIRO5SQJd6g8kYRO5SQJncpJEk5UPqlYoxRrlGKNcvEylTtU7kjCicr/pFijFGuUYo1y8VASvkmlU+mScJKETqVLQqfSqXRJ+E2KNUqxRinWKBcfpvJJSThJQqfSJaFTOVE5ScKJSpeETuVNxRqlWKMUa5SLlyXhDpUnktCpdEnoVLokdCqdSpeELgl/U7FGKdYoxRrl4j+XhJMkdCqdSpeETuWbijVKsUYp1igXwyWhU+mS0Kl0SeiS0Kl0Kn9TsUYp1ijFGuXiZSpvUjlJQpeEkyScqJwkoVPpktCpfFKxRinWKMUa5eLDkvBNSThROUlCp3KShE6lU+mS0Km8qVijFGuUYo0Sf7DGKNYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1yh+4fgXtc7T4cwAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','e',1,NULL,1,'Vinod',NULL),(6,'Vinod','v@gmail.com','123','2024-11-14 22:10:00','PENDING','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK2SURBVO3BQW7sWAwEwSxC979yjpdcPUBoqe3hZ0T8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFx9KwjepfFMSvknlE8UapVijFGuUi4epPCkJb0pCp3Ki8qQkPKlYoxRrlGKNcvGyJNyhckcSOpWTJDwpCXeovKlYoxRrlGKNcjFMEjqVf0mxRinWKMUa5WK4JHQqXRImKdYoxRqlWKNcvEzlm1ROktCpfELlLynWKMUapVijXDwsCX9JEjqVLgmdykkS/rJijVKsUYo1SvzB/1gSTlT+JcUapVijFGuUiw8loVPpkvAklU7lJAknKidJeJLKm4o1SrFGKdYoF1+m0iWhU7kjCZ1Kp9IloUvCHSonSehUvqlYoxRrlGKNcvGwJHQqXRLuSEKncpKEE5UuCZ1Kl4QuCZ1Kp/KbijVKsUYp1ijxB78oCScqXRLuUOmS8AmVkyR0Kt9UrFGKNUqxRrl4WRI6lTuScKJykoROpUtCp3KShE6lU+mS0Kl0SehUPlGsUYo1SrFGuXiZyonKJ5LQqXQqf0kSOpUnFWuUYo1SrFEuPpSEb1LpVLokdCpdEjqVLgmdSqfSJeEvKdYoxRqlWKNcPEzlSUk4SUKncqJyonKShBOVLgmdypuKNUqxRinWKBcvS8IdKm9KQqfSJaFT6VS6JHRJ+E3FGqVYoxRrlIthktCpnCThJAmdSqfSJaFT+aZijVKsUYo1ysVwSehUuiR0Kl0SuiR0Kp3KbyrWKMUapVijXLxM5U0qXRJOknCShBOVkyR0Kl0SOpUnFWuUYo1SrFEuHpaEb0pCp3JHEjqVkyR0Kp1Kl4RO5U3FGqVYoxRrlPiDNUaxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFH+AxfCD/h1ZijpAAAAAElFTkSuQmCC',NULL,NULL,'vinod@gmail.com','s',1,NULL,1,'Vinod',NULL),(7,'Vinod','v@gmail.com','123','2024-11-14 21:16:00','PENDING','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALESURBVO3BQW7kQAwEwSxC//9yro88CWhIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKiSScUOmS8E0qTxRrlGKNUqxRLl6m8qYk3ElCp3JC5YTKm5LwpmKNUqxRijXKxYcl4YTKCZX/KQknVD6pWKMUa5RijXIxTBI6lS4JkxVrlGKNUqxRLv64JNxJQqfSJaFT+cuKNUqxRinWKBcfpvJJKneS8Ekqv0mxRinWKMUa5eJlSfimJHQqn5SE36xYoxRrlGKNEn8wSBKeUPnLijVKsUYp1igXDyWhU+mS0Kl0SehUuiR0KndUuiTcUXkiCZ3KnSR0Km8q1ijFGqVYo1z8cip3knBC5UQSOpVO5U4SvqlYoxRrlGKNEn/wQBKeULmThE6lS8IdlTtJ6FROJKFTOZGETuWJYo1SrFGKNUr8wQNJ6FS6JHQq35SETuVEEjqVE0m4o/KmYo1SrFGKNcrFy5LQqXRJ6FS6JNxROaFyJwmdyokkdCr/U7FGKdYoxRol/uAPS8ITKl0SOpUuCZ1Kl4RO5ZuKNUqxRinWKBcPJeGbVDqVO0l4IglPJOGEyhPFGqVYoxRrlIuXqbwpCSeScCIJd1S6JHRJuKPSJaFTeVOxRinWKMUa5eLDknBC5UQSnlDpktAl4Y5Kl4QuCZ1Kl4RO5YlijVKsUYo1ysUfp9IloVM5odIloVO5o9IloUtCp/KmYo1SrFGKNcrFH5eETuVEEjqVTuVOEjqVTuVOEjqVJ4o1SrFGKdYoFx+m8kkqXRLuqHQqd5LQqXQqd5LQqXQqbyrWKMUapVijXLwsCd+UhE7lRBI6lRNJ6FROJKFTeaJYoxRrlGKNEn+wxijWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNco/ei0d6mnVp0oAAAAASUVORK5CYII=',NULL,NULL,'vinod@gmail.com','sa',1,NULL,1,'Vinod',NULL),(8,'Vinod','v@gmail.com','123','2024-11-23 17:12:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK9SURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKSRI6lSeS8E0qTxRrlGKNUqxRLl6m8qYkPJGEO1ROVN6UhDcVa5RijVKsUS4+LAl3qNyRhE7ljiQ8kYQ7VD6pWKMUa5RijXIxTBI6lS4JncokxRqlWKMUa5SLYVROVLokdCp/WbFGKdYoxRrl4sNUvikJd6g8ofKbFGuUYo1SrFEuXpaE/0mlS0Kn0iWhUzlJwm9WrFGKNUqxRrl4SOUvUzlR+UuKNUqxRinWKBcPJaFT6ZLwJpVOpUtCp9IloVM5ScKbVD6pWKMUa5RijXLxZSpPJKFTeSIJd6icJKFT+aZijVKsUYo1SvzBi5LQqZwkoVPpktCpdEm4Q6VLQqfSJeFE5Tcp1ijFGqVYo1z8MknoVE5UuiR0Kl0STpJwonKShE7lm4o1SrFGKdYoFw8l4Y4kdConSehUTlS6JHQqXRI6lZMkdCqdSpeETuWTijVKsUYp1igXD6ncoXKHykkSOpW/JAmdyhPFGqVYoxRrlPiDB5LwTSonSbhDpUtCp3KShCdU3lSsUYo1SrFGuXiZypuScJKETqVLQqdyonKShBOVLgmdyicVa5RijVKsUS4+LAl3qHxSEjqVLgmdSqfSJaFLwv9UrFGKNUqxRrkYJgl3JOEkCZ1Kp9IloVP5pmKNUqxRijXKxTAqXRI6lS4JnUqXhC4JnUqn8j8Va5RijVKsUS4+TOWTVLoknCThJAknKidJ6FS6JHQqbyrWKMUapVijXLwsCd+UhBOVkyR0KidJ6FQ6lS4JnconFWuUYo1SrFHiD9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+Qcp1RvpdQQStAAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','s',1,'c',0,'Vinod',NULL),(9,'a','a@gmail.com','1','2024-11-14 21:34:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK6SURBVO3BQY7cQAwEwSxC//9y2jfz1IAgzXiXYET8izVGsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRLh5KwjepdEk4UemScKLSJeGbVJ4o1ijFGqVYo1y8TOVNSThR+SaVNyXhTcUapVijFGuUiw9Lwh0qTyThm5Jwh8onFWuUYo1SrFEufrkkrH+KNUqxRinWKBfDqHRJ6FS6JExSrFGKNUqxRrn4MJX/SaVLQqfyhMpPUqxRijVKsUa5eFkSfpIkdCpdEjqVkyT8ZMUapVijFGuUi4dUfpMk3KHymxRrlGKNUqxRLh5KQqdyRxI6lS4JdyThDpUuCW9SOUlCp/JEsUYp1ijFGuXiIZU7ktCpdEnoVLokvCkJncpJEjqVLgknSfikYo1SrFGKNcrFQ0k4UXkiCZ3KE0noVE6ScJKEkyR0Kp9UrFGKNUqxRrl4mUqXhE6lS0KnckcSOpUTlZMknKh0SehUuiR8U7FGKdYoxRrl4iGVLgl3qJwkoVPpVE6S0Kl0SXhC5YkkdCpPFGuUYo1SrFEuXqbyJpWTJHQqncpPkoRO5U3FGqVYoxRrlIuHkvBNKidJ6FSeUHlCpUvCJxVrlGKNUqxRLl6m8qYknKh0SeiScIfKSRI6lS4JnUqn8knFGqVYoxRrlIsPS8IdKnck4QmVkyScJOEkCXeoPFGsUYo1SrFGufjlVE6ScJKETqVT6ZLQqXRJ6FS6JHxSsUYp1ijFGuViOJUuCZ3KSRJOknCShE7lk4o1SrFGKdYoFx+m8k1J6FQ6lZMknKh0SehUuiR0SehU3lSsUYo1SrFGuXhZEr4pCSdJ6FS6JDyh8kQSOpUnijVKsUYp1ijxL9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+QMrqv8J0w/NZwAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','I ',1,NULL,1,'Vinod','aCompony'),(10,'a','a@gmail.com','1','2024-11-15 17:42:00','CANCELED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALkSURBVO3BQY7DVgwFwX6E7n/ljpdcfUCQ7GQYVsUP1hjFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUa5eCgJv6TypiR0Kl0SfknliWKNUqxRijXKxctU3pSEkyTcodKp3KHypiS8qVijFGuUYo1y8WVJuEPlDpUuCSdJOFG5Iwl3qHxTsUYp1ijFGuViGJUuCScqkxRrlGKNUqxRLv64JHQqnUqXhC4JncpfVqxRijVKsUa5+DKVb1LpktCpnKg8ofJfUqxRijVKsUa5eFkSfikJnUqXhE6lS0KncpKE/7JijVKsUYo1SvxgkCR0Kv8nxRqlWKMUa5SLh5LQqXRJ6FS6JHQqXRI6lROVLgmdSpeETuWOJHQqJ0noVN5UrFGKNUqxRrl4SOVEpUtCp9IloVO5IwmdSpeETqVLQqfSJaFT6ZLQqfxSsUYp1ijFGuXiZUnoVDqVLgmdSpeEO1TelIQ7VLokdCpdEjqVJ4o1SrFGKdYo8YMHkvCEyi8l4Q6VLgl3qPxSsUYp1ijFGuXiZSpdEk6S8IRKl4RO5USlS0KXhBOVkyTcofJEsUYp1ijFGiV+8IcloVPpktCp3JGETuWOJJyovKlYoxRrlGKNEj94IAm/pHKShBOVLgmdyh1J6FT+TcUapVijFGuUi5epvCkJd6h0SThROUlCp9KpnCThROVNxRqlWKMUa5SLL0vCHSp3JOFE5SQJncodSehUTlS6JHQqTxRrlGKNUqxRLv44lTuS0Kl0SehUuiR0Kl0SOpUuCZ3Km4o1SrFGKdYoF39cEk5UnkjCE0noVLokdCpPFGuUYo1SrFEuvkzlm1ROknCShBOVLgldEk5UTlTeVKxRijVKsUa5eFkSfikJncodKl0SuiScqHRJ6JLQqXRJ6FSeKNYoxRqlWKPED9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+QcOET7eXi3fuwAAAABJRU5ErkJggg==','2024-11-15 09:53:13',NULL,'vinod@gmail.com','ss',1,'cd',1,'Vinod','aCompony'),(11,'Vinod','v@gmail.com','123','2024-11-15 15:43:00','APPROVED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKjSURBVO3BQW7sWAwEwSxC979yjpdcPUCQusfmZ0T8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4ZtUTpLQqTyRhG9SeaJYoxRrlGKNcvEylTcl4YkkdCpdEjqVE5U3JeFNxRqlWKMUa5SLD0vCHSp3JKFTOUlCp/JEEu5Q+aRijVKsUYo1SrFGKdYoxRqlWKNc/OOS0Kn8ZcUapVijFGuUiw9T+T8loVPpkvCEym9SrFGKNUqxRrl4WRImS8JvVqxRijVKsUa5eEjlN1PpknCHyl9SrFGKNUqxRrl4KAmdSpeEN6l0KidJ6FS6JJwk4U0qn1SsUYo1SrFGuXhI5Q6VkyR0Kl0SOpUuCZ3KEypdEjqVkyR8U7FGKdYoxRrl4qEkdConSThR6ZJwh8pJEjqVLgmdSqfSJaFTuSMJncoTxRqlWKMUa5SLh1Q+SeUkCZ1Kl4RO5UTlJAlPJKFTeVOxRinWKMUa5eJlSehUnkjCicodSehUuiR0Kp1Kl4TfpFijFGuUYo0Sf/CHJaFTOUnCEyonSehUvqlYoxRrlGKNEn/wQBK+SeUkCZ3KSRI6lS4JJypPJKFTeaJYoxRrlGKNcvEylTcl4SQJJ0m4IwknKidJ6FROVN5UrFGKNUqxRrn4sCTcofImlZMkdConSehUOpUuCZ3KJxVrlGKNUqxRLoZLQqcyWbFGKdYoxRrlYhiVkyR0Kl0SOpVOpUvCb1KsUYo1SrFGufgwlU9SuUPlROUkCScqXRK6JHQqbyrWKMUapVijXLwsCd+UhCdUuiR0Kp1Kl4QuCScqn1SsUYo1SrFGiT9YYxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGuU/96kG6szihHEAAAAASUVORK5CYII=',NULL,NULL,'vinod@gmail.com','I am V from infoTech i want to meet to for making a website for animal resque ',1,'fff',0,'Vinod',NULL),(12,'a','a@gmail.com','1','2024-11-15 15:40:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALRSURBVO3BQY7DVgwFwW5C97/yi5dcfUCQ7GQYVpkP1hjFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUa5eEjll5LwSyq/lIQnijVKsUYp1igXL0vCm1ROVE6S0KmcJOEkCW9SeVOxRinWKMUa5eLLVO5Iwh1J6FTuSMITKnck4ZuKNUqxRinWKBf/M0mYrFijFGuUYo1y8cepdEk4UTlJwl9WrFGKNUqxRrn4siR8UxI6lS4JJ0l4Ign/JcUapVijFGuUi5ep/JJKl4ROpUtCp9Il4UTlv6xYoxRrlGKNYj4YROUkCZMVa5RijVKsUS4eUumS0Kl0SehUuiR0Kl0STpLQqZyodEm4Q6VLwolKl4Q3FWuUYo1SrFEuHkrCSRLuUOmS0Kk8odIloVPpktCpdEnoVLok/FKxRinWKMUa5eIhlZMkdCp3qHRJ6FROktCp3KFyRxI6lS4JnUqXhCeKNUqxRinWKBdfpnKShCeS8ITKSRI6lU7lJAmdyjcVa5RijVKsUS5eloRO5QmVJ5JwkoROpVM5ScKJyi8Va5RijVKsUcwHf5jKHUm4Q6VLwh0qJ0l4U7FGKdYoxRrFfPCAyi8l4Q6VLgmdSpeEO1S6JPybijVKsUYp1igXL0vCm1TuULkjCScqXRK6JJyonCThTcUapVijFGuUiy9TuSMJd6h0SbhDpUvCHSpdEk6S0Kl0SXiiWKMUa5RijXLxxyWhU+mS0Kl0SehUuiR0Kl0SOpUuCZ1Kl4Q3FWuUYo1SrFEu/jiVb1J5QqVLQqfSJeGJYo1SrFGKNYr54AGVLglvUumScKLypiR0Knck4ZeKNUqxRinWKBcvU/kllS4JJypdEjqVTuUkCZ1Kp9IloVPpkvBEsUYp1ijFGsV8sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKP0f0Hf9w4B5rAAAAAElFTkSuQmCC',NULL,NULL,'vinod@gmail.com','I am V from infoTech i want to meet to for making a website for animal resque ',1,'Reject',1,'Vinod','aCompony'),(13,'a','a@gmail.com','1','2024-11-15 12:54:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALTSURBVO3BQY7cWAwFwUxC97/yc++Gqw8IUtW4aUaYH6wxijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNcvGQyjcl4Q6VLgmdSpeETuWbkvBEsUYp1ijFGuXiZUl4k8qJykkS3pSEN6m8qVijFGuUYo1y8WEqdyThjiR0Kicqb1K5IwmfVKxRijVKsUa5GE7lX1KsUYo1SrFGufjlVNZ/ijVKsUYp1igXH5aET0rCicpJEp5Iwt+kWKMUa5RijXLxMpVvUumScJKETqVLwonK36xYoxRrlGKNYn4wmEqXhMmKNUqxRinWKBcPqXRJ6FS6JHQqXRI6lS4JJypdEk5UuiTcodIl4USlS8KbijVKsUYp1igXL1M5UbkjCZ3KHSonSehUuiR0Kl0SOpUuCd9UrFGKNUqxRrl4KAl3qHRJ6FROktCpdEnoVJ5QuSMJnUqXhE8q1ijFGqVYo1w8pPKEykkSOpU3qZwkoVPpVE6S0KmcJOGJYo1SrFGKNYr5wYtU7khCp3JHEjqVLgmdSpeETuWOJJyo3JGEJ4o1SrFGKdYo5ge/mMpJEp5Q6ZJwh8pJEt5UrFGKNUqxRjE/eEDlm5JwonKShE6lS8IdKl0S/k/FGqVYoxRrlIuXJeFNKnckoVM5ScKJSpeELgknKidJeFOxRinWKMUa5eLDVO5Iwh0qT6h0SbhDpUvCSRI6lS4JTxRrlGKNUqxRLn65JJyodCpdEjqVLgmdSpeETqVLQqfSJeFNxRqlWKMUa5SLX07lk1SeUOmS0Kl0SXiiWKMUa5RijXLxYUn4pCR0Kl0SOpVO5SQJnUqncpKEkyS8qVijFGuUYo1y8TKVb1LpktCpnCShU+lUTpLQqXQqXRI6lS4JTxRrlGKNUqxRzA/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRvkDxPIVFD6J798AAAAASUVORK5CYII=','2024-11-15 12:05:07',NULL,'vinod@gmail.com','abc',1,'a',0,'Vinod','aCompony'),(14,'a','a@gmail.com','1','2024-11-15 12:54:00','CHECKED_IN','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALZSURBVO3BQY7DVgwFwX6E7n/ljnfh6gOCZCdDsCp+sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUNJ+CWVJ5LQqZwk4ZdUnijWKMUapVijXLxM5U1JOElCp3JHEjqVE5U3JeFNxRqlWKMUa5SLL0vCHSp3qHRJOFF5UxLuUPmmYo1SrFGKNcrFMConSThR+cuKNUqxRinWKBd/XBLWv4o1SrFGKdYoF1+m8k0qJ0k4UXlC5f+kWKMUa5RijXLxsiT8UhI6lROVLgmdykkS/s+KNUqxRinWKPGDQZJwojJZsUYp1ijFGuXioSR0Kl0SOpUuCZ1Kl4RO5Q6VkyR0KnckoVM5SUKn8qZijVKsUYo1ysXLktCpdEk4SUKncpKETqVLwolKl4ROpUtCp9IloVP5pWKNUqxRijXKxUMqJ0m4Q6VLwonKNyXhDpUuCZ1Kl4RO5YlijVKsUYo1SvzggSR0Kl0STlTuSMKJykkS7lDpknCHykkSOpUnijVKsUYp1ijxgxcl4QmVLgmdSpeEE5UuCZ1Kl4Q7VE6ScIfKE8UapVijFGuU+MEfloQ7VO5IQqdyRxJOVN5UrFGKNUqxRokfPJCEX1I5SUKncpKETuWOJHQq/6VijVKsUYo1ysXLVN6UhCeS0Kl0KidJ6FQ6lZMknKi8qVijFGuUYo1y8WVJuEPljiQ8kYRO5Y4kdConKl0SOpUnijVKsUYp1igXf5zKSRK6JHQqXRI6lS4JnUqXhE6lS0Kn8qZijVKsUYo1ysUfl4QTlS4JdyThiSR0Kl0SOpUnijVKsUYp1igXX6byTSpdEu5IwolKl4QuCScqJypvKtYoxRqlWKNcvCwJv5SEJ1S6JHRJOFHpktAloVPpktCpPFGsUYo1SrFGiR+sMYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijfIPz1cq74WUTJoAAAAASUVORK5CYII=',NULL,NULL,'vinod@gmail.com','frf',1,'d',1,'Vinod','aCompony'),(15,'Sagar','sagar@gmail.com','1234','2024-11-15 17:36:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALUSURBVO3BQa7jSAwFwXyE7n/lHC+5KkCQ7OlPMCJ+sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUNJ+CWVO5Jwh0qXhF9SeaJYoxRrlGKNcvEylTcl4SQJnUqncpKEO1TelIQ3FWuUYo1SrFEuviwJd6jcodIl4UTlTUm4Q+WbijVKsUYp1igXw6h0SThRmaRYoxRrlGKNcvHHJaFT6VS6JJyo/GXFGqVYoxRrlIsvU/kmlS4JncqJyhMq/5JijVKsUYo1ysXLkvBLSehUuiR0Kl0SOpWTJPzLijVKsUYp1ijxg8GS0KlMVqxRijVKsUa5eCgJnUqXhE6lS0Kn0iWhU3lTEjqVO5LQqZwkoVN5U7FGKdYoxRrl4iGVb1I5SUKncpKETqVLQqfSJaFT6ZLQqfxSsUYp1ijFGuXioSTckYRO5SQJJypdEjqVLgl3JOEOlS4Jnco3FWuUYo1SrFHiBw8koVPpkvCEyhNJeEKlS8IdKidJ6FSeKNYoxRqlWKNc/OOS0KmcJKFT6ZLQqXRJ6JJwonKShF8q1ijFGqVYo8QP/rAknKg8kYRO5Y4knKi8qVijFGuUYo0SP3ggCb+k8qYkdCp3JKFT+T8Va5RijVKsUS5epvKmJDyRhE6lUzlJQqfSqZwk4UTlTcUapVijFGuUiy9Lwh0qdyShU+lUTpLQqdyRhE7lRKVLQqfyRLFGKdYoxRrl4o9T6ZLQqXRJ6FS6JHQqXRI6lS4JnUqXhE7lTcUapVijFGuUiz8uCSdJeCIJTyShU+mS0Kk8UaxRijVKsUa5+DKVb1LpknBHEk5UuiR0SThROVF5U7FGKdYoxRrl4mVJ+KUkPKHSJaFLwolKl4QuCZ1Kl4RO5YlijVKsUYo1SvxgjVGsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5T/AMLQJvM93H9aAAAAAElFTkSuQmCC',NULL,NULL,'vinod@gmail.com','Test',1,'hh',0,'Vinod',NULL),(16,'a','a@gmail.com','1','2024-11-15 19:37:00','CHECKED_IN','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALSSURBVO3BQY7cQAwEwSxC//9yeo88NSBIM/bSjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKHUnoVLokdCpdEr5J5YlijVKsUYo1ysXLVN6UhJMkdCqdSpeETuUOlTcl4U3FGqVYoxRrlIsPS8IdKneonCShU3lTEu5Q+aRijVKsUYo1ysUwSfifFWuUYo1SrFEufrkk3JGEE5XfrFijFGuUYo1y8WEqn6RyRxI6lSdU/iXFGqVYoxRrlIuXJeGbktCpdEnoVLokdConSfiXFWuUYo1SrFHiDwZJQqfyPynWKMUapVijXDyUhE6lS0Kn0iWhU+mS0Km8KQmdyh1J6FROktCpvKlYoxRrlGKNcvGQSpeETuVE5USlS8ITSehUuiR0Kl0SOpUuCZ3KNxVrlGKNUqxRLh5KQqfSJeFEpUvCHSqflIQ7VLokdCpdEjqVJ4o1SrFGKdYoF1+mcqJykoQ7knCShBOVLgldEk5UuiR0Km8q1ijFGqVYo8QfvCgJn6RykoQ7VLok3KFykoRO5ZOKNUqxRinWKPEHv1gS7lC5Iwmdyh1JOFF5U7FGKdYoxRol/uCBJHyTypuS0KnckYRO5W8q1ijFGqVYo1y8TOVNSfgklZMkdCqdykkSTlTeVKxRijVKsUa5+LAk3KFyRxLuUOmS0KnckYRO5USlS0Kn8kSxRinWKMUa5eKXU+mScJKETqVLQqfSJaFT6ZLQqXRJ6FTeVKxRijVKsUa5+OWScKLSJeGOJDyRhE6lS0Kn8kSxRinWKMUa5eLDVD5JpUvCHUk4UemS0CXhROVE5U3FGqVYoxRrlIuXJeGbktCpdEk4UemS0CXhRKVLQpeETqVLQqfyRLFGKdYoxRol/mCNUaxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlD9aeSD555JuRgAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','rty',1,NULL,1,'Vinod Choudhary','aCompony'),(17,'a','a@gmail.com','1','2024-11-15 21:48:00','REJECTED','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKpSURBVO3BQa7jSAwFwUxC97/yGy+5KkCQ/KdNMMJ8sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUMqfykJncpJEjqVLgknKn8pCU8Ua5RijVKsUS5eloQ3qXyTSpeEkyS8SeVNxRqlWKMUa5SLL1O5IwlvUumS0Kk8oXJHEr6pWKMUa5RijXLx45JwonKShEmKNUqxRinWKBc/TuUJlS4Jv6xYoxRrlGKNcvFlSfimJNyh8qYk/EuKNUqxRinWKBcvU/lLKl0SOpUuCZ3KHSr/smKNUqxRijWK+WAQlS4JncpJEn5ZsUYp1ijFGsV88IBKl4QTlf9TEjqVkyScqHRJ6FTuSMITxRqlWKMUa5SLh5LQqXRJ6JLQqXRJeJPKHUnoVLokPJGETuVNxRqlWKMUaxTzwYtUTpJwh8pJEt6kcpKETuWOJHxTsUYp1ijFGsV88CKVO5LQqXRJ6FTelIQ3qZwk4ZuKNUqxRinWKBcPqdyRhE7lROWOJHQqXRLuUOmS8IRKl4Q3FWuUYo1SrFHMBz9MpUvCicpJEk5UuiR0Kl0SOpWTJDxRrFGKNUqxRrl4SOUvJeGJJHQqncodKl0S/k/FGqVYoxRrlIuXJeFNKk+oPJGETuVEpUtCl4RO5U3FGqVYoxRrlIsvU7kjCU+oPJGETuUkCZ1Kp9Il4ZuKNUqxRinWKBfrKAknKk8k4U3FGqVYoxRrlIsfl4QTlS4Jd6h0SeiScKLSqZwk4YlijVKsUYo1ysWXJeGXqNyh0iXhJAmdypuKNUqxRinWKOaDB1T+UhI6lZMkdCpdEt6kckcS3lSsUYo1SrFGMR+sMYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijfIftNQB9LzId3wAAAAASUVORK5CYII=',NULL,NULL,'vinod@gmail.com','d',1,'qsw',0,'Vinod','aCompony'),(18,'a','a@gmail.com','1','2024-11-15 18:48:00','PENDING','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKrSURBVO3BQY7gRgwEwSxC//9yem7mqQFB0niXZkT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4TepdEk4UemScKLSJeE3qTxRrFGKNUqxRrl4mcqbknCHyh0qd6i8KQlvKtYoxRqlWKNcfCwJd6jcofJEEjqVO5Jwh8qXijVKsUYp1igXf7kkdCpdEjqVyYo1SrFGKdYoF385lfWvYo1SrFGKNcrFx1T+SypfUvmTFGuUYo1SrFEuXpaE35SETqVLQqfSJaFTOUnCn6xYoxRrlGKNEn/wF0tCp/J/VqxRijVKsUa5eCgJnUqXhBOVLgl3qJwkoVO5IwmdykkSOpUuCScqTxRrlGKNUqxR4g9elIROpUtCp9IloVPpknCickcSOpWTJHQqJ0noVL5UrFGKNUqxRok/eCAJJypdEp5Q6ZJwonKShC+pnCShU3miWKMUa5RijXLxsSQ8ofJfUvmSypuKNUqxRinWKBcvU7kjCSdJuEPlJAmdSpeEO5LQqXRJ6FS6JHQqTxRrlGKNUqxRLh5SeULliSScJKFTeSIJncqfpFijFGuUYo1y8VASfpPKSRLelIROpUtCp3KShC8Va5RijVKsUS5epvKmJNyhcpKEN6l0SehUflOxRinWKMUa5eJjSbhD5Q6VkyScqJwk4UtJ6FSeKNYoxRqlWKNc/OWScIfKSRI6lZMkdConSehU3lSsUYo1SrFGuRhGpUtCl4RO5U1JOFH5UrFGKdYoxRrl4mMqX1J5IgmdSpeETuUOlS4JJypPFGuUYo1SrFEuXpaE35SEL6l0SehUuiTcofKmYo1SrFGKNUr8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYo/wCgcQfr/Z0YnwAAAABJRU5ErkJggg==',NULL,NULL,'vinod@gmail.com','f',1,NULL,1,'Vinod','aCompony');
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 15:35:07
