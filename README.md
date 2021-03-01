# Conduit (Medium Clone based on [realworld.io](https://github.com/gothinkster/realworld))

## Technologies Used

1. NodeJS - Platform
2. Express - Framework
3. JavaScript - Programming Language
4. PostgreSQL - Database
5. Sequelize - ORM

## Database Setup

1. Enter 'psql' as admin'

2. Create new database and grant privilege

```psql
CREATE DATABASE CONDUIT;
CREATE USER conduit WITH ENCRYPTED PASSWORD 'conduit';
grant all privileges on database conduit to conduit;
```
