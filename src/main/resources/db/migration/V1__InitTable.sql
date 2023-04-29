CREATE TABLE IF NOT EXISTS employees (
       id uuid NOT NULL,
       name varchar(32) NOT NULL,
       surname varchar(32) NOT NULL,
       boss_id uuid NOT NULL,
       role varchar(32) NOT NULL,
       email varchar(128) NOT NULL,
       password varchar(256) NOT NULL,
       department varchar(64) NOT NULL,
       phonenumber varchar(16) UNIQUE NOT NULL,

       CHECK (role IN ( 'ADMIN', 'USER' )),
       PRIMARY KEY(id)
);