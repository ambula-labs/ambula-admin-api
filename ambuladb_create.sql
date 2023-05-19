CREATE TABLE IF NOT EXISTS ambuladb.CHAIN 
(
    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    status TINYINT NOT NULL,
    dateStatusChanged TIMESTAMP DEFAULT current_timestamp,
)

CREATE TABLE IF NOT EXISTS ambuladb.ACTIVITY 
(
    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    message VARCHAR(200) NOT NULL,
    date TIMESTAMP DEFAULT current_timestamp,
)

CREATE TABLE IF NOT EXISTS ambuladb.NOEUD 
(
    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    ip VARCHAR(50) NOT NULL,
    dateStatusChanged TIMESTAMP DEFAULT current_timestamp,
    status ENUM ('offline', 'not known', 'online'),
)