/*
 Navicat Premium Data Transfer

 Source Server         : MySQL - Localhost
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3306
 Source Schema         : test_p

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 22/09/2024 18:18:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Categories
-- ----------------------------
DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Categories
-- ----------------------------
BEGIN;
INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (21, 'Makanan', '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (22, 'Snack', '2024-09-22 11:14:33', '2024-09-22 11:14:33');
COMMIT;

-- ----------------------------
-- Table structure for ProductCategories
-- ----------------------------
DROP TABLE IF EXISTS `ProductCategories`;
CREATE TABLE `ProductCategories` (
  `productId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`),
  UNIQUE KEY `ProductCategories_productId_categoryId_unique` (`productId`,`categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `productcategories_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productcategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ProductCategories
-- ----------------------------
BEGIN;
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (29, 21, '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (30, 22, '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (31, 22, '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (33, 21, '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (34, 21, '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductCategories` (`productId`, `categoryId`, `createdAt`, `updatedAt`) VALUES (35, 21, '2024-09-22 11:15:19', '2024-09-22 11:15:19');
COMMIT;

-- ----------------------------
-- Table structure for ProductImages
-- ----------------------------
DROP TABLE IF EXISTS `ProductImages`;
CREATE TABLE `ProductImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ProductImages
-- ----------------------------
BEGIN;
INSERT INTO `ProductImages` (`id`, `productId`, `type`, `content`, `createdAt`, `updatedAt`) VALUES (6, 34, '6', '//portal.panelo.co/paneloresto/uploads/20/10/21102016032509585f8fab0e771b0.jpg', '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductImages` (`id`, `productId`, `type`, `content`, `createdAt`, `updatedAt`) VALUES (7, 29, '6', '//portal.panelo.co/paneloresto/uploads/20/10/21102016032509585f8fab0e771b0.jpg', '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductImages` (`id`, `productId`, `type`, `content`, `createdAt`, `updatedAt`) VALUES (8, 33, '6', '//portal.panelo.co/paneloresto/uploads/20/12/07122016073250025fcdd54a7e85b.jpg', '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductImages` (`id`, `productId`, `type`, `content`, `createdAt`, `updatedAt`) VALUES (9, 31, '6', '//portal.panelo.co/paneloresto/uploads/20/12/07122016073247255fcdd4354c14a.jpg', '2024-09-22 11:14:48', '2024-09-22 11:14:48');
INSERT INTO `ProductImages` (`id`, `productId`, `type`, `content`, `createdAt`, `updatedAt`) VALUES (10, 30, '6', '//portal.panelo.co/paneloresto/uploads/20/12/07122016073215155fcdc7ab18dd9.jpg', '2024-09-22 11:14:48', '2024-09-22 11:14:48');
COMMIT;

-- ----------------------------
-- Table structure for ProductPrices
-- ----------------------------
DROP TABLE IF EXISTS `ProductPrices`;
CREATE TABLE `ProductPrices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productprices_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ProductPrices
-- ----------------------------
BEGIN;
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (1, 34, 12000, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (2, 29, 15000, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (3, 33, 6000, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (4, 31, 2000, '2024-09-22 11:14:33', '2024-09-22 11:14:46');
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (5, 30, 2000, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `ProductPrices` (`id`, `productId`, `price`, `createdAt`, `updatedAt`) VALUES (6, 35, 10000, '2024-09-22 11:15:15', '2024-09-22 11:15:19');
COMMIT;

-- ----------------------------
-- Table structure for Products
-- ----------------------------
DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `lang` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Products
-- ----------------------------
BEGIN;
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (29, 18, 'Nasi Goreng Pedas Sekali', 'nasi-goreng', 'en', 1, 0, 1, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (30, 18, 'Beng Beng', 'beng-beng', 'en', 1, 0, 10, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (31, 18, 'Tahu', 'tahu', 'en', 1, 0, 20, '2024-09-22 11:14:33', '2024-09-22 11:14:48');
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (33, 18, 'Pop Mie kuah', 'pop-mie', 'en', 1, 0, 1, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (34, 18, 'nasi goreng', 'nasi-goreng', 'en', 1, 0, 10, '2024-09-22 11:14:33', '2024-09-22 11:14:33');
INSERT INTO `Products` (`id`, `userId`, `title`, `slug`, `lang`, `status`, `count`, `stock`, `createdAt`, `updatedAt`) VALUES (35, 18, 'New Product', 'new-product', 'en', 1, 0, 10, '2024-09-22 11:15:15', '2024-09-22 11:15:19');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
