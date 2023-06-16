# Address API

## Create

Endpoint : POST api/contacts/:contactId/addresses
Headers : 
- Authorization : (token)

Request body :
``` json
{
    "street" : "Jl terserah",
    "city" : "Bekasi",
    "province" : "Jawa Barat",
    "country" : "Indonesia",
    "postal_code" : "17136"
}
```
Response body success :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl terserah",
        "city" : "Bekasi",
        "province" : "Jawa Barat",
        "country" : "Indonesia",
        "postal_code" : "17136"
    }
}
```
Response body failed :
```json
{
    "errors" : "Contry is required"
}
```

## Update

Endpoint : PUT api/contacts/:contactId/addresses/:addressesId
Headers : 
- Authorization : (token)

Request body :
``` json
{
    "street" : "Jl terserah",
    "city" : "Bekasi",
    "province" : "Jawa Barat",
    "country" : "Indonesia",
    "postal_code" : "17136"
}
```
Response body success :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl terserah",
        "city" : "Bekasi",
        "province" : "Jawa Barat",
        "country" : "Indonesia",
        "postal_code" : "17136"
    }
}
```
Response body failed :
```json
{
    "errors" : "Country is required"
}
```

## Get

Endpoint : GET api/contacts/:contactId/addresses/:addressesId
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl terserah",
        "city" : "Bekasi",
        "province" : "Jawa Barat",
        "country" : "Indonesia",
        "postal_code" : "17136"
    }
}
```
Response body failed :
```json
{
    "errors" : "Contact is not found"
}
```

## List

Endpoint : GET api/contacts/:contactId/addresses
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "Jl terserah",
            "city" : "Bekasi",
            "province" : "Jawa Barat",
            "country" : "Indonesia",
            "postal_code" : "17136"
        }
    ]
}
```
Response body failed :
```json
{
    "errors" : "Contact is not found"
}
```

## Delete

Endpoint : DELETE api/contacts/:contactId/addresses/:addressesId
Headers : 
- Authorization : (token)

Response body success :
```json
{
    "data" : "Address has been deleted"
}
```
Response body failed :
```json
{
    "errors" : "Address is not found"
}
```