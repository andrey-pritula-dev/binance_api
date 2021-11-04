#Установка
Поднятие MongoDB + RabbitMQ
```
cd microservices
docker-compose up
```
------------------
Запуск API + слушателя рэбита
```
cd api
npm i
npm run start:dev
```
------------------
Запуск микросервиса который слушает бинанс апи и шлет в очередь RabbitMQ
```
cd websoketConnector
npm i
npm run start
```
#RabbitMQ
localhost:15673
- login: guest
- password: guest
#Mongo GUI
http://localhost:8888/