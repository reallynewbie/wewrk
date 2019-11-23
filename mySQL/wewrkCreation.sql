-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema wewrk
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wewrk
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wewrk` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `wewrk` ;

-- -----------------------------------------------------
-- Table `wewrk`.`postings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wewrk`.`postings` (
  `posting_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(2000) NOT NULL,
  `text` MEDIUMTEXT NULL DEFAULT NULL COMMENT 'Description from posting page in plaintext.',
  `html` MEDIUMTEXT NULL DEFAULT NULL COMMENT 'Description from posting in html.',
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `company` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`posting_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2047
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
