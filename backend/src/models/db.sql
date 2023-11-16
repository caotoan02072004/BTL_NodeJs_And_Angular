create database ql_cua_hang1;
use ql_cua_hang1;

create table account(
    id int primary key AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role varchar(50),
    creaed_at date DEFAULT NOW(),
    last_login datetime DEFAULT NOW()
);

create table category(
    id int primary key AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    status tinyint
);

create table product(
    id int primary key AUTO_INCREMENT,
    name varchar(120) NOT NULL,
    price float NOT NULL,
    sale_price float NULL DEFAULT 0,
    image varchar(200) NOT NULL,
    category_id int NOT NULL,
    status tinyint NULL DEFAULT 1,
    description text NOT NULL,
    creaed_at date DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

create table favourite(
    id int primary key AUTO_INCREMENT,
    account_id int NOT NULL,
    product_id int NOT NULL,
    creaed_at date DEFAULT NOW(),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

insert into account(name, email, password, role)values
(N'Nguyễn Văn A', 'a@gmail.com', '1234', 'user'),
(N'admin', 'admin@gmail.com', '123456', 'admin')