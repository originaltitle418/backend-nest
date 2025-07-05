
CREATE DATABASE IF NOT EXISTS dev;
USE dev;

CREATE TABLE IF NOT EXISTS restaurant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    category ENUM('한식', '일식', '중식') NOT NULL,
    description TEXT,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    phone_number VARCHAR(20),
    headcount INT NOT NULL,
    customer_id INT,
    restaurant_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservation_menu (
    reservation_id INT NOT NULL,
    menu_id INT NOT NULL,
    PRIMARY KEY (reservation_id, menu_id),
    FOREIGN KEY (reservation_id) REFERENCES reservation(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);
