CREATE INDEX IF NOT EXISTS fio
    ON employees (name, surname);

CREATE INDEX IF NOT EXISTS boss
    ON employees (boss_id);

CREATE INDEX IF NOT EXISTS department
    ON employees (department);

CREATE INDEX IF NOT EXISTS phone_number
    ON employees (phonenumber);