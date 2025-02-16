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

# Driver Registration Endpoint

## Endpoint
**POST** `/drivers/register`

## Description
This endpoint allows a new driver to register by providing their full name, email, password, and vehicle details. Upon successful registration, a JSON Web Token (JWT) is generated for the driver.

## Required Data
The request body must be a JSON object containing the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the driver's first name (minimum 3 characters).
  - `lastName`: A string representing the driver's last name.
- `email`: A string representing the driver's email address (must be a valid email format).
- `password`: A string representing the driver's password (minimum 6 characters).
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color (minimum 3 characters).
  - `plate`: A string representing the vehicle's plate (minimum 3 characters).
  - `capacity`: A number representing the vehicle's capacity (minimum 1).
  - `vehicleType`: A string representing the vehicle type (must be one of "scooter", "bike", "cycle").

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 2,
    "vehicleType": "bike"
  }
}

### Example Response Body
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IyM2M5N2IzYTljY2I2OTBmMjRhYmQiLCJlbWFpbCI6ImRldmJoYXR0YWNoYXJ5YTI3NUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk3MzQxNjcsImV4cCI6MTczOTgyMDU2N30.MruYMPy6jmFBfGrn2UWl364uBlUellU92XJJA6GVY78",
    "driver": {
        "fullName": {
            "firstName": "Devam",
            "lastName": "Bhattacharya"
        },
        "email": "devbhattacharya275@gmail.com",
        "password": "$2b$10$VBFLDw6Re1lpkDawTOn3POXzESKoGRvhvFIuwTRl2xjiNdHD0raN6",
        "status": "inactive",
        "vehicle": {
            "color": "Orange",
            "plate": "MP 04 XY 6204",
            "capacity": 2,
            "vehicleType": "scooter"
        },
        "_id": "67b23c97b3a9ccb690f24abd",
        "__v": 0
    }
}