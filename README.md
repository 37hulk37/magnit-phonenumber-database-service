<h2>Deployment:</h2>
1.	Установить maven и JRE для Java 19. Настроить переменные среды, в случае windows, создав переменные JAVA_HOME и MAVEN_HOME, в PATH добавить директории %JAVA_HOME%\bin и %MAVEN_HOME%\bin
2.	Для запуска клиента необходимо установить node.js версии 18.14.2 или выше, поддерживающие данную версию, более низкие версии могут как работать, так и не работать.
3.  Проверте, что node.js добавлен в перменные среды
3.	Создайте базу данных в дистрибутиве Postgresql: мы использовали название magnit-db
4.	В файле application.yml поменяйте название базы данных в переменной spring.datasource.url
5.	Поставьте название вашего пользователя Postgresql в переменной spring.datasource.username
6.	Поставьте пароль Postgresql в переменной spring.datasource.password
7.	В корневой директории запустить команду mvn clean install. Скомпилируются приложение для клиента и бэкенда.
8.	Для запуска приложения бэкенда выполните команду java -jar C:\Users\user\IdeaProjects\Spring\magnit-phonenumber-database-service\target\magnit_phonenumber_database_service-0.0.1-SNAPSHOT.jar
9.	Для запуска приложения клиента перейдите в директорию frontend
10.	Оттуда выполните команду npm start run

