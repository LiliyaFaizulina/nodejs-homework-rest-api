# REST API

## Users Controllers

### _Реєстрація нового користувача_

### `POST` _api/users/register_

Request body <sup>(required)</sup> :

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

Code `201` (Created):

```json
{
  "user": {
    "name": "string",
    "email": "string",
    "subscription": "string",
    "avatarUrl": "string"
  }
}
```

Code `400` &mdash; Validation error

Code `409` &mdash; Email in use

---

### _Веріфікація поштової скриньки_

### `GET` <i>api/users/verify/:verificationToken</i>

Response:

Code `200`:

```json
{
  "message": "Verification successful"
}
```

Code `404` &mdash; User not found

---

### _Повторна відправка листа для веріфікації пошти_

### `POST` <i>api/users/verify</i>

Request body <sup>(required)</sup> :

```json
{
  "email": "string"
}
```

Response:

Code `200`:

```json
{
  "message": "Verification email sent"
}
```

Code `404` &mdash; Not found

Code `400` &mdash; Verification has already been passed

Code `400` &mdash; Validation error

---

### _Логін_

### `POST` <i>api/users/login</i>

Request body <sup>(required)</sup> :

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

Code `200`:

```json
{
    "token",
    "user": {
      "name": "string",
      "email": "string",
      "subscription": "string",
      "avatarUrl": "string",
    },
}
```

Code `400` &mdash; Email not verify

Code `401` &mdash; Email or password is wrong

Code `400` &mdash; Validation error

---

### _Логаут_

### `POST` <i>api/users/logout</i>

Response:

Code `204` &mdash; Logout success

Code `401` &mdash; Unauthorized

---

### _Запит даних поточного користувача_

### `GET` <i>api/users/current</i>

Responsee:

Code `200`:

```json
{
  "user": {
    "name": "string",
    "email": "string",
    "subscription": "string",
    "avatarUrl": "string"
  }
}
```

Code `401` &mdash; Unauthorized

---

### _Зміна підписки_

### `PATCH` <i>api/users</i>

Request body <sup>(required)</sup> :

```json
{
  "subscription": "string"
}
```

_Варіанти підписки: "starter", "pro", "business"_

Response:

Code `200`:

```json
{
  "user": {
    "email": "string",
    "subscription": "string"
  }
}
```

Code `401` &mdash; Unauthorized

---

## Contacts Controllers

### _Всі контакти юзера_

### `GET` _/api/contacts_

Response:

Code `200`:

```json
[
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "favorite": "boolean",
    "owner": "string"
  }
]
```

Code `401` &mdash; Unauthorized

---

### _Отримати контакт за айді_

### `GET` _/api/contacts/:contactId_

Response:

Code `200`:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "owner": "string"
}
```

Code `401` &mdash; Unauthorized

Code `404` &mdash; Not found

---

### _Додати новий контакт_

### `POST` _/api/contacts_

Request body <sup>(required)</sup> :

```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

Response:

Code `201`:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "owner": "string"
}
```

Code `401` &mdash; Unauthorized

Code `400` &mdash; Validation error

---

### _Видалити контакт за айді_

### `DELETE` _/api/contacts/:contactId_

Response:

Code `200`:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "owner": "string"
}
```

Code `401` &mdash; Unauthorized

Code `404` &mdash; Not found

---

### _Змінити контакт за айді_

### `PUT` _/api/contacts/:contactId_

Request body <sup>(required)</sup> :

```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

Response:

Code `200`:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "owner": "string"
}
```

Code `401` &mdash; Unauthorized

Code `404` &mdash; Not found

Code `400` &mdash; Validation error

---

### _Змінити статус контакту за айді_

### `PATCH` _/api/contacts/:contactId/favorite_

Request body <sup>(required)</sup> :

```json
{
  "favorite": "boolean"
}
```

Response:

Code `200`:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "owner": "string"
}
```

Code `401` &mdash; Unauthorized

Code `404` &mdash; Not found

Code `400` &mdash; Validation error

---
