# Sparkpost Project

A simple api that uses NestJs and MongoDB

https://nestjs.com/

---

## Requirements

For development, you will need Docker, NodeJs, and the Nest cli

    $ npm i -g @nestjs/cli

## Install

    $ npm install

## Testing

    $ npm test

## Linting

    $ npm run lint

## Building the project

    $ docker-compose build

## Running the project

    $ docker-compose up

## Example requests

### Create

#### POST http://localhost:3000/sparkpost

```javascript
{
	"name": "michael",
	"age": 25
}
```

### Find by name

#### GET http://localhost:3000/sparkpost/michael

### Update age

#### PUT http://localhost:3000/sparkpost

```javascript
{
	"name": "michael",
	"age": 26
}
```
