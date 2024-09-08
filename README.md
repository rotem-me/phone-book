# Phone Book

A simple phone book API that allows you to manage contacts. This API provides functionality to create, update, delete, and search contacts in the phone book.

## Setup & Run

```
cd phone-book
docker compose up --build
```

## Test

```
docker compose up test
```

## Postman

Project Postman collection: `Phone Book.postman_collection.json`

## APIS

### Get Contacts

Retrieves all contacts in the phone book, with optional pagination using limit and skip.

#### Endpoint: `/api/contacts`

#### Method: `GET`

#### Example Request: `GET /api/contacts?limit=10&skip=0`
#### Example Response: 
```
{
  "contacts": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "phone_number": "1234567890",
      "address": "123 Main St"
    },
    {
      "first_name": "Jane",
      "last_name": "Doe",
      "phone_number": "0987654321",
      "address": "456 Main St"
    }
  ]
}
```
***
### Search Contacts

Retrieves all contacts in the phone book using a search term, with optional pagination using limit and skip.

#### Endpoint: `/api/contacts/search`

#### Method: `GET`

#### Example Request: `GET /api/contacts/search?term=r&limit=10&skip=0`
#### Example Response: 
```
{
  "contacts": [
    {
      "first_name": "Roi",
      "last_name": "Doe",
      "phone_number": "1234567890",
      "address": "123 Main St"
    },
    {
      "first_name": "Jane",
      "last_name": "Rabinovich",
      "phone_number": "0987654321",
      "address": "456 Main St"
    }
  ]
}

```
***
### Create Contact

Creates contact.

#### Endpoint: `/api/contacts`

#### Method: `PUT`

#### Body:
```
{
    first_name?: string,
    last_name?: string,
    address?: string,
    phone_number: string
}
```

#### Example Request: 
```
PUT /api/contacts

{
    "first_name": "exampli",
    "last_name": "examplo",
    "phone_number": "05066686966"
}
```

#### Example Response:
```
{
  "contactId": "66dc9aacf5a9bfcccbb3fe33
}
```
***

### Update Contact
Updates contact.

#### Endpoint: `/api/contacts/<contactId>`

#### Method: `POST`

#### Body:
```
{
    first_name?: string,
    last_name?: string,
    address?: string,
    phone_number?: string
}
```

#### Example Request:
```
POST /api/contacts/66dc1c7f1cefe68741d02b8e
{
    "first_name": "updated example",
}
```
***

### Delete Contact
Deletes contact.

#### Endpoint: `/api/contacts/<contactId>`

#### Method: `DELETE`

#### Example Request:
```
DELETE /api/contacts/66dc1c7f1cefe68741d02b8e
```
***
