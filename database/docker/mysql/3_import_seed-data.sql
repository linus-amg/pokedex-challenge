LOAD DATA INFILE '/var/lib/mysql-files/pokemon.csv'
  INTO TABLE pokemon
  FIELDS TERMINATED BY ','
  ENCLOSED BY ''
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, name, type1, type2, total, healthpoints, attack, defense, special_attack, special_defense, speed, generation, @legendary)
  SET legendary = IF(@legendary = 'True', 1, 0);
  