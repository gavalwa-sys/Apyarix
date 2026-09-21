CREATE DATABASE IF NOT EXISTS the_bee CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE the_bee;

CREATE TABLE brands (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 slug VARCHAR(100) UNIQUE NOT NULL,
 tagline VARCHAR(255) NOT NULL,
 description TEXT NOT NULL
);
INSERT INTO brands(name,slug,tagline,description) VALUES
('Apyarix','apyarix','NATURAL BEE PRODUCTS','Natural bee products with a focus on quality, purity and everyday wellness.');

CREATE TABLE categories (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 slug VARCHAR(100) UNIQUE NOT NULL
);
INSERT INTO categories(name,slug) VALUES
('Honey','honey'),('Beeswax','beeswax'),('Propolis','propolis'),('Pollen','pollen'),('Other Bee Products','other-bee-products');

CREATE TABLE products (
 id INT AUTO_INCREMENT PRIMARY KEY,
 brand_id INT NOT NULL,
 category_id INT NULL,
 name VARCHAR(180) NOT NULL,
 slug VARCHAR(180) NOT NULL,
 short_description VARCHAR(255) DEFAULT '',
 description TEXT,
 price DECIMAL(12,2) NOT NULL DEFAULT 0,
 stock INT NOT NULL DEFAULT 0,
 image VARCHAR(500) DEFAULT '',
 featured TINYINT(1) NOT NULL DEFAULT 0,
 status ENUM('active','inactive') NOT NULL DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
INSERT INTO products(brand_id,category_id,name,slug,short_description,description,price,stock,featured) VALUES
(1,1,'Pure Honey','pure-honey','Natural honey for everyday enjoyment.','A rich honey product presented by Apyarix. Contact Apyarix for availability and packaging options.',150,50,1),
(1,2,'Beeswax','beeswax','Versatile natural beeswax from the hive.','Natural beeswax for household, craft and other suitable uses.',120,30,1),
(1,3,'Propolis','propolis','A natural hive product from Apyarix.','Ask Apyarix about available propolis products and packaging.',180,25,0);

CREATE TABLE customers (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 email VARCHAR(190) UNIQUE NOT NULL,
 phone VARCHAR(60) DEFAULT '',
 password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
 id INT AUTO_INCREMENT PRIMARY KEY,
 customer_id INT NULL,
 customer_name VARCHAR(150) NOT NULL,
 customer_email VARCHAR(190) NOT NULL,
 customer_phone VARCHAR(60) DEFAULT '',
 delivery_address TEXT NOT NULL,
 total DECIMAL(12,2) NOT NULL DEFAULT 0,
 status ENUM('pending','confirmed','processing','ready','completed','cancelled') NOT NULL DEFAULT 'pending',
 payment_method VARCHAR(60) NOT NULL DEFAULT 'WhatsApp / Pay on arrangement',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE order_items (
 id INT AUTO_INCREMENT PRIMARY KEY,
 order_id INT NOT NULL,
 product_id INT NULL,
 product_name VARCHAR(180) NOT NULL,
 quantity INT NOT NULL,
 unit_price DECIMAL(12,2) NOT NULL,
 subtotal DECIMAL(12,2) NOT NULL,
 FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE enquiries (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 phone VARCHAR(60) DEFAULT '',
 message TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
 id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(80) UNIQUE NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 name VARCHAR(150) NOT NULL
);
-- Default: admin / admin123
INSERT INTO admins(username,password_hash,name) VALUES
('admin','$2y$10$X8QJ9k7K8H9w5c4x4v2l1u0o3ZJw9m9jZQ6e4W0F4dQ3KpY8b9x2K','Apyarix Administrator');
