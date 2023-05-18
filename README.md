## API:  
1. POST /auth/create-employee - создание сотрудника  
2. POST /auth/authenticate - вход в систему  
3. GET /home/employees/search - поиск сотрудников с параметрами  
4. GET /home/employees - получение списка всех сотрудников  
5. POST /home/employees - запрос на рекдактирование пароля/номера телефона  
5. DELETE /home/employees/{id} - удаление сотрудника по id  
6. GET /home/employees/{id} - получение сотрудника по id  
7. GET /excel/export - получение excel файла (бета)  
8. GET/employees/{id}/image - получение фотограйии пользователя  

---
## Deployment:

1.	Установить maven и JRE для Java 19. Настроить переменные среды, в случае windows, создав переменные  
JAVA_HOME и MAVEN_HOME, в PATH добавить директории %JAVA_HOME%\bin и %MAVEN_HOME%\bin  
2.	Для запуска клиента необходимо установить node.js версии 18.14.2 или выше, поддерживающие данную  
версию, более низкие версии могут как работать, так и не работать.  
3.  В файле package.json в свойство "proxy" нужно вписать адрес сервера.
4.  Проверте, что node.js добавлен в перменные среды  
5.	Создайте базу данных в дистрибутиве Postgresql: мы использовали название magnit-db  
6.	В файле application.yml поменяйте название базы данных в переменной spring.datasource.url  
7.	Поставьте название вашего пользователя Postgresql в переменной spring.datasource.username  
8.	Поставьте пароль Postgresql в переменной spring.datasource.password  
9.	В корневой директории запустить команду mvn clean install. Скомпилируются приложение для клиента  
и бэкенда.  
10.	Для запуска приложения бэкенда выполните команду java -jar C:\Users\user\IdeaProjects\Spring\  
 magnit-phonenumber-database-service\target\magnit_phonenumber_database_service-0.0.1-SNAPSHOT.jar
11.	Для запуска приложения клиента перейдите в директорию frontend 
12. Оттуда выполните команду npm start run  


