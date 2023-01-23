-- Use the GameDB database
USE GenshinToolDB
GO

SET IDENTITY_INSERT TypeStat ON;
INSERT INTO TypeStat (Id,Name)
VALUES
(1,'Flat'),
(2,'Percentage')
SET IDENTITY_INSERT TypeStat OFF;

SET IDENTITY_INSERT Stats ON;
INSERT INTO Stats (Id,Label,TypeStatId)
VALUES
(1,'HP',1),(2,'ATK',1),(3,'DEF',1),(4,'EM',1),(5,'ER',1),
(6,'Crit Rate',1),(7,'Crit DMG',1),
(8,'Healing Bonus',1),(9,'Shield Bonus',1),
(10,'Anemo DMG',1),(11,'Cryo DMG',1),
(12,'Pyro DMG',1),(13,'Electro DMG',1),(14,'Hydro DMG',1),
(17,'Geo DMG',1),(18,'Dendro DMG',1),(19,'Physical DMG',1),
(20,'HP%',2),(21,'ATK%',2),(22,'DEF%',2)
SET IDENTITY_INSERT Stats OFF;

SET IDENTITY_INSERT PIECE ON;
INSERT INTO PIECE (Id,Name)
VALUES
(1,'Plume'),
(2,'Flower'),
(3,'Sand'),
(4,'Goblet'),
(5,'Circlet')
SET IDENTITY_INSERT PIECE OFF;