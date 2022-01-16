CREATE DATABASE  IF NOT EXISTS `innovarte` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `innovarte`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: innovarte
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (9,1,2,1,'2022-01-10 21:10:03','2022-01-10 21:10:03'),(10,1,1,1,'2022-01-10 21:10:58','2022-01-10 21:10:58'),(11,1,2,1,'2022-01-10 21:11:00','2022-01-10 21:11:00');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'oficina','2021-12-21 00:57:31',NULL),(2,'escolar','2021-12-21 00:57:31',NULL),(3,'arte','2021-12-21 00:57:31',NULL),(4,'kids','2021-12-21 00:57:31',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (16,'Tinta gel',7,'2021-12-21 00:57:33','2021-12-21 00:57:33'),(17,'Punta de 1 mm',7,'2021-12-21 00:57:33','2021-12-21 00:57:33'),(18,'Capuchón ventilado',7,'2021-12-21 00:57:33','2021-12-21 00:57:33'),(23,'20 colores intensos, incluye gama completa de pasteles ',1,'2021-12-21 01:14:32','2021-12-21 01:14:32'),(24,' Punta pincel de 4 mm de diámetro ',1,'2021-12-21 01:14:32','2021-12-21 01:14:32'),(25,' Extra suave y ultra flexible ',1,'2021-12-21 01:14:32','2021-12-21 01:14:32'),(26,' Ideales para lettering ',1,'2021-12-21 01:14:32','2021-12-21 01:14:32'),(27,'Cuaderno Universitario Tapa Flexible ',2,'2021-12-21 01:14:40','2021-12-21 01:14:40'),(28,' x 80 Hojas ',2,'2021-12-21 01:14:40','2021-12-21 01:14:40'),(29,' Rayado y Cuadriculado ',2,'2021-12-21 01:14:40','2021-12-21 01:14:40'),(30,'Contiene 12 lápices negros cuerpo paste ',3,'2021-12-21 01:14:52','2021-12-21 01:14:52'),(31,' Cuerpo ergonómico ',3,'2021-12-21 01:14:52','2021-12-21 01:14:52'),(32,'12 crayones compactos de excelente calidad ',4,'2021-12-21 01:15:00','2021-12-21 01:15:00'),(33,' Mejores crayones del mercado ',4,'2021-12-21 01:15:00','2021-12-21 01:15:00'),(34,'Pinceles profesionales de origen aleman ',5,'2021-12-21 01:15:07','2021-12-21 01:15:07'),(35,'Corrector liquido ',6,'2021-12-21 01:15:15','2021-12-21 01:15:15'),(36,' Contenido 7ml ',6,'2021-12-21 01:15:15','2021-12-21 01:15:15'),(37,' Punta metalica ',6,'2021-12-21 01:15:15','2021-12-21 01:15:15'),(39,'500 Hojas ',11,'2021-12-21 11:17:04','2021-12-21 11:17:04'),(40,' Papel de fibra de azúcar ',11,'2021-12-21 11:17:04','2021-12-21 11:17:04'),(41,' Marca AUTOR',11,'2021-12-21 11:17:04','2021-12-21 11:17:04'),(42,'Marca: HP ',10,'2021-12-21 11:17:51','2021-12-21 11:17:51'),(43,' Línea: Advantage ',10,'2021-12-21 11:17:51','2021-12-21 11:17:51'),(44,' Modelo: HP 664 Original ',10,'2021-12-21 11:17:51','2021-12-21 11:17:51'),(45,'Tipo de calculadora: Científica ',12,'2021-12-21 11:21:59','2021-12-21 11:21:59'),(46,' Cantidad de funciones: 240 ',12,'2021-12-21 11:21:59','2021-12-21 11:21:59'),(47,' Peso: 120 g ',12,'2021-12-21 11:21:59','2021-12-21 11:21:59'),(48,' Altura x Ancho: 156 mm x 85 mm ',12,'2021-12-21 11:21:59','2021-12-21 11:21:59'),(49,' Tipo de alimentación: Pila',12,'2021-12-21 11:21:59','2021-12-21 11:21:59'),(50,'Tipo: Pinza ',13,'2021-12-21 11:26:23','2021-12-21 11:26:23'),(51,' Marca: Mapped',13,'2021-12-21 11:26:23','2021-12-21 11:26:23'),(52,'Unidades: 10 ',14,'2021-12-21 11:29:26','2021-12-21 11:29:26'),(53,' Tipo: Pack',14,'2021-12-21 11:29:26','2021-12-21 11:29:26'),(54,'Marca: Kolke ',15,'2021-12-21 11:31:47','2021-12-21 11:31:47'),(55,' Color: Negro',15,'2021-12-21 11:31:47','2021-12-21 11:31:47');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(300) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Marcadores Trabí','Marcadores de excelente calidad, diseño y adaptabilidad a la vida cotidiana. Son los mejores del mercado',320.00,'producto-trabi.jpg',0,2,'2021-12-21 00:57:32','2021-12-21 01:14:32',NULL),(2,'Cuaderno AVON universitario','El mejor del mercado a la hora de tomar apuntes y realizar tus actividades y tareas',240.00,'cuaderno-avon-universitario.jpg',0,2,'2021-12-21 00:57:32','2021-12-21 01:14:40',NULL),(3,'Lápices de Grafito Cuerpo Pastel','Los lapiceros de grafito son el útil más básico y fundamental de tu equipo de dibujo, son un producto económico y muy versátil que puede generar desde dibujos técnicos a dibujos artísticos con grandes escalas tonales, nunca está de más saber un poco más de tal útil y modesta herramienta.',150.00,'lapices-de-color.jpeg',0,3,'2021-12-21 00:57:32','2021-12-21 01:14:52',NULL),(4,'Crayones Jumbo Simball','Entrada Carpaccio de salmón con cítricos',220.00,'crayones.jpg',0,4,'2021-12-21 00:57:32','2021-12-21 01:15:00',NULL),(5,'Pincel escolar chato N°1','Entrada Carpaccio de salmón con cítricos',250.00,'pincel.jpg',0,3,'2021-12-21 00:57:32','2021-12-21 01:15:07',NULL),(6,'Corrector Liquid Paper','Entrada Carpaccio de salmón con cítricos',180.00,'corrector-liquid-paper.jpg',0,2,'2021-12-21 00:57:32','2021-12-21 01:15:14',NULL),(7,'Bolígrafo Simball Power Gel Classic Fluo','Entrada Carpaccio de salmón con cítricos',660.00,'SIMBALL_Power Gel_Classic_Fluo.jpg',0,2,'2021-12-21 00:57:32',NULL,NULL),(10,'Cartuchos Hp 664 Negro','Cartucho Original HP 664 Negro o Color\r\nImpresoras compatibles:\r\nHP 1115 2135 2675 3635 3778 4535 4536 4538 4675 4676 4678',1490.00,'img-product-1640085218408.webp',0,1,'2021-12-21 11:13:38','2021-12-21 11:17:50',NULL),(11,'Resma Autor A4 500 Hojas Para Impresora','RESMA AUTOR\r\nPapel de fibra de caña de azúcar\r\nA4 210 x 297mm\r\n500 hojas\r\n75g/m2\r\nMultifunción: Ideal para todo tipo de impresoras',799.00,'img-product-1640085424478.webp',0,1,'2021-12-21 11:17:04','2021-12-21 11:17:04',NULL),(12,'Calculadora Científica Casio Fx-82ms','CALCULADORA MARCA CASIO FX-82MS ORIGINAL',2500.00,'img-product-1640085719297.webp',0,1,'2021-12-21 11:21:59','2021-12-21 11:21:59',NULL),(13,'Abrochadora Maped Essential','Abrochadora Maped Essential Metal Chica 24/6 26/6',358.00,'img-product-1640085982850.webp',0,1,'2021-12-21 11:26:22','2021-12-21 11:26:22',NULL),(14,'Carpetas Presentacion Base Opaca A4','Carpetas Presentación Base Opaca A4 Tapa Transparente X12 Unidades del mismo color',615.00,'img-product-1640086165932.webp',0,1,'2021-12-21 11:29:25','2021-12-21 11:29:25',NULL),(15,'Mouse Pad Kolke Ideal para Home-Office','Es tan fácil deslizar el mouse. Con tu Kolke KED149 podrás llenar la pantalla de tu ordenador de clicks. Su elaborada superficie le dará precisión y comodidad a tus movimientos.',450.00,'img-product-1640086307758.webp',0,1,'2021-12-21 11:31:47','2021-12-21 11:31:47',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'user','2021-12-21 00:57:31','2021-12-21 00:57:31'),(2,'admin','2021-12-21 00:57:31','2021-12-21 00:57:31');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211101175911-create-category.js'),('20211101181139-create-rol.js'),('20211101181152-create-user.js'),('20211101181231-create-product.js'),('20211101181233-create-feature.js'),('20211102114816-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(255) NOT NULL DEFAULT 'foto-default.jpg',
  `rolId` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin2','admin@innovarte.com','$2a$10$UcEKPxObq9tv9rXLNrX43.YTv50GKXK/LLPfu5RJ07qk7LciAen0a','foto-default.jpg',2,'2021-12-21 00:57:31','2021-12-21 00:57:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'innovarte'
--

--
-- Dumping routines for database 'innovarte'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-16 17:20:05
