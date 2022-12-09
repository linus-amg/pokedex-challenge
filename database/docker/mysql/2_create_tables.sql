DROP TABLE IF EXISTS `pokemon`;

CREATE TABLE `pokemon` (
  `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `original_id` INT(10) unsigned NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type1` VARCHAR(255) DEFAULT NULL,
  `type2` VARCHAR(255) DEFAULT NULL,
  `total` SMALLINT DEFAULT NULL,
  `healthpoints` SMALLINT DEFAULT NULL,
  `attack` SMALLINT DEFAULT NULL,
  `defense` SMALLINT DEFAULT NULL,
  `special_attack` SMALLINT DEFAULT NULL,
  `special_defense` SMALLINT DEFAULT NULL,
  `speed` SMALLINT DEFAULT NULL,
  `generation` SMALLINT DEFAULT NULL,
  `legendary` boolean DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
