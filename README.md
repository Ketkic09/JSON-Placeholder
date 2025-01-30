
# JSON Placeholder

JSONPlaceholder is an Open Source Online Mock REST API Service, designed for developers who need fake JSON data


## Features

- CRUD operations
- API failure Retries
- POSTMAN Collections


## Installation

Installation 


```bash
  install node packages: npm install (Node version used 18.18.2)
```
Launch Server
```bash
  nodemon index.js
```
How To Use?
```bash
  Import the environment and api collections 
  Hit the send on POSTMAN to see the results
```
## API Reference

#### Get all items

```http
  GET /fetch-users
```

  | Description                |
 | :------------------------- |
 | Gets all Users |


#### Create User
```http
  POST /post-user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Name of the user |
| `username`      | `string` | Username of the user |

#### Update User
```http
  UPDATE /update-user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Name of the user |
| `username`      | `string` | Username of the user |

#### Update User
```http
  DELETE /update-user/:id
```

 | Description                |
 | :------------------------- |
 | Deletes User of the passed ID |


