# Contact API

## Create

Endpoint : POST api/contacts
Headers : 
- Authorization : (token)

Request body :
``` json
{
    "first_name" : "Reza",
    "last_name" : "Putra F",
    "email" : "rezapf@gmail.com",
    "phone" : "6287899887799"
}
```
Response body success :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Reza",
        "last_name" : "Putra F",
        "email" : "rezapf@gmail.com",
        "phone" : "6287899887799"
    }
}
```
Response body failed :
```json
{
    "errors" : "Email is invalid format"
}
```

## Update

Endpoint : PUT api/contacts/:id
Headers : 
- Authorization : (token)

Request body :
``` json
{
    "first_name" : "Reza",
    "last_name" : "Putra F",
    "email" : "rezapf@gmail.com",
    "phone" : "6287899887799"
}
```
Response body success :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Reza",
        "last_name" : "Putra F",
        "email" : "rezapf@gmail.com",
        "phone" : "6287899887799"
    }
}
```
Response body failed :
```json
{
    "errors" : "Email is invalid format"
}
```

## Get

Endpoint : GET api/contacts/:id
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Reza",
        "last_name" : "Putra F",
        "email" : "rezapf@gmail.com",
        "phone" : "6287899887799"
    }
}
```
Response body failed :
```json
{
    "errors" : "Contact is not found"
}
```

## Search

Endpoint : GET api/contacts
Headers : 
- Authorization : (token)

Query Params :
- Name : search by first_name or by last_name (opt)
- Email : search by email (opt)
- Phone : search by phone (opt)
- Page : number, default 1
- Size : number, default 10

Response body success :
```json
{
    "data" : [
        {
            "id" : 1,
            "first_name" : "Reza",
            "last_name" : "Putra F",
            "email" : "rezapf@gmail.com",
            "phone" : "6287899887799"
        },
        {
            "id" : 2,
            "first_name" : "Rio",
            "last_name" : "Putra A",
            "email" : "riopa@gmail.com",
            "phone" : "6287899880099"
        }
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 5,
        "total_item" : 25
    }
}
```
Response body failed :
```json
{
    "errors" : "Unauthorized"
}
```

## Delete

Endpoint : DELETE api/contacts/:id
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : "Contact has been deleted"
}
```
Response body failed :
```json
{
    "errors" : "Contact is not found"
}
```