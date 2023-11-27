DROP SCHEMA IF EXISTS create_app;

-- updated by croftd, Nov. 26, 2023
-- Model: New Model    Version: 1.6
-- Based on MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema create_app
-- -----------------------------------------------------
-- Database schema created for CREATE App 2024 by WMD class 2023
-- Note I've removed the foreign key integrity constraints as they were 
-- causing issues many places, see this article from Nathan to support this:
-- https://planetscale.com/docs/learn/operating-without-foreign-key-constraints

-- -----------------------------------------------------
-- Schema create_app
--
-- Database schema created for CREATE App 2024 by WMD class 2023
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `create_app` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `create_app` ;

-- -----------------------------------------------------
-- Table `create_app`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `theme` VARCHAR(255) NULL,
  `course_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email_address` VARCHAR(45) NOT NULL,
  `is_participant` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`user_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`user_project` (
  `UserId` INT NOT NULL,
  `ProjectId` INT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`UserId`, `ProjectId`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`user_role` (
  `UserId` INT NOT NULL,
  `RoleId` INT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`UserId`, `RoleId`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`project_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`project_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`rubric`
-- Each rubric can have many criteria
-- Each rubric can have one project_type_id
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`rubric` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ProjectTypeId` INT NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`project_rubric`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`project_rubric` (
  `ProjectId` INT NOT NULL,
  `RubricId` INT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`ProjectId`, `RubricId`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`rubric_criteria`
-- Each rubric can have many rubric_criteria, but 
-- each rubric_criteria is for only one rubric
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`rubric_criteria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `RubricId` INT NOT NULL,
  `description` TEXT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `create_app`.`vote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`vote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vote_time` DATETIME NULL,
  `uuid` VARCHAR(45) NULL,
  `ProjectId` INT NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_virtual` TINYINT NULL COMMENT 'Determines if this event is virtual',
  `event_description` VARCHAR(255) NOT NULL,
  `event_location` VARCHAR(255) NOT NULL COMMENT 'Location of the event - e.g. Upper Cafeteria, Theatre, Twitter',
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `capacity` INT(1) NULL COMMENT 'determines how many participants can present at this event (e.g. the cafeteria has space for 50 poster presentation)',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`event_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`event_project` (
  `EventId` INT NOT NULL,
  `ProjectId` INT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`EventId`, `ProjectId`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`project_has_project_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`project_has_project_type` (
  `ProjectId` INT NOT NULL,
  `ProjectTypeId` INT NOT NULL,
  PRIMARY KEY (`ProjectId`, `ProjectTypeId`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`participant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`participant` (
  `id` INT NOT NULL COMMENT 'This should be the id of the user (a participant is a type of user) however I have included a separate UserId just in case we need it for Sequelize',
  `is_undergrad` TINYINT NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `campus` VARCHAR(45) NOT NULL,
  `course_code` VARCHAR(45) NOT NULL,
  `viu_advisor` VARCHAR(45) NOT NULL,
  `UserId` INT NOT NULL,
  `group_member1_name` VARCHAR(255) NULL COMMENT 'The group_member fields were added to store the names of group members - these will be null if it is an individual project',
  `group_member2_name` VARCHAR(255) NULL,
  `group_member3_name` VARCHAR(255) NULL,
  `group_member4_name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `create_app`.`mark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`mark` (
  `score` INT NOT NULL,
  `CriteriaId` INT NOT NULL,
  `ProjectId` INT NOT NULL,
  PRIMARY KEY (`CriteriaId`, `ProjectId`)
  )
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `create_app`.`rubric_nomination`
-- Joins Rubric to Adjudimentor UserId
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`rubric_nomination` (
  `RubricId` INT NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`RubricId`, `UserId`)
  )
ENGINE = INNODB;

-- -----------------------------------------------------
-- Table `create_app`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `RubricId` INT NOT NULL,
  `comment_text` TEXT,
  `comment_type` INT NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB


-- -----------------------------------------------------
-- Table `create_app`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `create_app`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `EventId` INT NOT NULL,
  `ProjectId` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`EventId`) REFERENCES `create_app`.`event` (`id`),
  FOREIGN KEY (`ProjectId`) REFERENCES `create_app`.`project` (`id`)
) ENGINE=InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;