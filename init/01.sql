CREATE DATABASE IF NOT EXISTS `subspace-auth`;
CREATE DATABASE IF NOT EXISTS `subspace-comment`;
CREATE DATABASE IF NOT EXISTS `subspace-community`;
CREATE DATABASE IF NOT EXISTS `subspace-post`;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';