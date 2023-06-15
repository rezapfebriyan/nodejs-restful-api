# User API

## Register

Endpoint : POST api/users

Request body :
``` json
{
    "username" : "rezapf",
    "password" : "persija1928",
    "name" : "Reza PF"
}
```
Response body success :
```json
{
    "data" : {
        "username" : "rezapf",
        "name" : "Reza PF"
    }
}
```
Response body failed :
```json
{
    "errors" : "Username already registered"
}
```

## Login

Endpoint : POST api/users/login

Request body :
```json
{
    "username" : "rezapf",
    "password" :  "persija1928"
}
```
Response body success :
```json
{
    "data" : "unique-token"
}
```
Response body failed :
```json
{
    "errors" : "Credential is invalid"
}
```

## Update

Endpoint : PATCH api/users/current
Headers : 
- Authorization : (token)

Request body :
```json
{
    "name" : "Reza PF", // opt
    "password" : "new_password" // opt
}
```
Response body success:
```json
{
    "data" : {
        "username" : "rezapf",
        "name" : "Reza PF"
    }
}
```
Response body failed :
```json
{
    "errors" : "Name length max 50"
}
```

## Get

Endpoint : GET api/users/current
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : {
        "username" : "rezapf",
        "name" : "Reza PF"
    }
}
```
Response body failed :
```json
{
    "errors" : "Unauthorized"
}
```

## Logout

Endpoint : DELETE api/users/logout
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : "Oke"
}
```
Response body failed :
```json
{
    "errors" : "Unauthorized"
}