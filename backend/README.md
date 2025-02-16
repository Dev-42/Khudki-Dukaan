# User Registration Endpoint

## Endpoint
POST /users/register

## Description
This endpoint allows a new user to register by providing their full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is generated for the user.

## Required Data
The request body must be a JSON object containing the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (minimum 3 characters).
  - `lastName`: A string representing the user's last name (minimum 5 characters).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request Body
{
  "fullName": {
    "firstName": "John",
    "lastName": "Dokhs"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

### Example Response Body
{
    "message": "User created successfully",
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Dokhs"
        },
        "email": "john.doe@example.com",
        "password": "$2b$10$a5Lmy8s6NLwsGLrFxnt2BOgN1ct2eE867sk2fmZGdQYosWtuo5MxG",
        "_id": "67b08ac93a9fd71ffbc8b73a",
        "__v": 0
    },
    "token": "JWT TOKEN"
}

## Status Codes
- `201 Created`: User registered successfully.
- `400 Bad Request`: Validation errors occurred (e.g., missing fields or invalid data). The response will include an array of error messages.


# User Login Endpoint

## Endpoint  
**POST** `/users/login`

---

## Description  
This endpoint allows registered users to log in by providing their email and password. Upon successful authentication, a JSON Web Token (JWT) is generated for the user.

---

## Required Data  
The request body must be a JSON object containing the following fields:

- **`email`**: A string representing the user's email address (must be in a valid email format).  
- **`password`**: A string representing the user's password (minimum 6 characters).  

---

### Example Request Body  
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

---

### Example Response Body
{
    "message": "Login successful",
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Dokhs"
        },
        "_id": "67b08ac93a9fd71ffbc8b73a",
        "email": "john.doe@example.com",
        "password": "$2b$10$a5Lmy8s6NLwsGLrFxnt2BOgN1ct2eE867sk2fmZGdQYosWtuo5MxG",
        "__v": 0
    }
}

## Status Codes
- `200 OK`: User successfully logged in.
- `400 Bad Request`: Validation errors occurred (e.g., missing fields or invalid data). The response will include an array of error messages.
- `401 Unauthorised` : Invalid email or password provided.Response message: "Invalid email" or "Invalid   password"

# User Profile Endpoint

## Endpoint
GET /users/profile

## Description
This endpoint allows authenticated users to retrieve their profile information.

## Authentication
This endpoint requires a valid JSON Web Token (JWT) to be provided in the request headers or cookies.

## Example Request
```
GET /users/profile
Authorization: Bearer <JWT_TOKEN>
```

## Example Response Body
```json
{
  "_id": "67b08ac93a9fd71ffbc8b73a",
  "fullName": {
    "firstName": "John",
    "lastName": "Dokhs"
  },
  "email": "john.doe@example.com",
  "__v": 0
}
```

## Status Codes
- `200 OK`: User profile retrieved successfully.
- `401 Unauthorized`: No token provided or token is invalid.

# User Logout Endpoint

## Endpoint
GET /users/logout

## Description
This endpoint allows authenticated users to log out by invalidating their JSON Web Token (JWT).

## Authentication
This endpoint requires a valid JSON Web Token (JWT) to be provided in the request headers or cookies.

## Example Request
```
GET /users/logout
Authorization: Bearer <JWT_TOKEN>
```

## Example Response Body
```json
{
  "message": "Logged out successfully"
}
```

## Status Codes
- `200 OK`: User logged out successfully.
- `401 Unauthorized`: No token provided or token is invalid.

