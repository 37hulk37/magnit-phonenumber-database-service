CREATE TABLE IF NOT EXISTS employees (
       id uuid NOT NULL,
       name text NOT NULL,
       surname text NOT NULL,
       role text NOT NULL,
       department text NOT NULL,
       phonenumber varchar(12) UNIQUE NOT NULL,

       CHECK (role IN ( 'Admin', 'User' )),
       PRIMARY KEY(id)
);