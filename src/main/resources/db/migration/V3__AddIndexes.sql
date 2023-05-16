CREATE INDEX if not exists fio
    ON employees (name, surname);

CREATE INDEX if not exists boss
    ON employees (boss_id);

CREATE INDEX if not exists department
    ON employees (department);

CREATE INDEX if not exists phone_number
    ON employees (phonenumber);