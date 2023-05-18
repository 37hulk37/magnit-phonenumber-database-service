INSERT INTO employees (id, name, surname, role, email, password, department,  phonenumber)
    VALUES ('f4a7f6c0-b5f2-46a3-b024-71f9d3bc09d0', 'daemon', 'daemon', 'ADMIN', 'daemon@magnit.ru', '1234',
            'Admins', '+791112223344' ) ON CONFLICT (id) DO NOTHING;

-- password: 1234
