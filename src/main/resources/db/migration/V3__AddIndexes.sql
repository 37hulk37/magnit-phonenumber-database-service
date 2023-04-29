CREATE INDEX fio
    ON employees (name, surname);

CREATE INDEX boss
    ON employees (boss_id);

CREATE INDEX department
    ON employees (department);

CREATE INDEX phone_number
    ON employees (phonenumber);