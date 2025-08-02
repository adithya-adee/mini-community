# Mini Community API Documentation

## Overview

This is a Node.js/Express backend for a mini community social media platform with MongoDB and JWT authentication.

## Models

### User Model

```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  bio: String (max 500 chars, default: ''),
  profilePicture: String (default: ''),
  joinedAt: Date (default: now),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Post Model

```javascript
{
  content: String (required, 1-1000 chars),
  author: ObjectId (ref: User, required),
  likes: [{
    user: ObjectId (ref: User),
    likedAt: Date (default: now)
  }],
  likesCount: Number (default: 0, auto-calculated),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## API Endpoints

### Authentication Routes (`/auth`)

#### POST `/auth/register`

- **Description**: Register a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "bio": "Hello world!",
    "profilePicture": "image_url"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Hello world!",
      "profilePicture": "image_url",
      "joinedAt": "2025-08-02T...",
      "isActive": true,
      "createdAt": "2025-08-02T...",
      "updatedAt": "2025-08-02T..."
    }
  }
  ```

#### POST `/auth/login`

- **Description**: Login existing user
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Same as register

### User Routes (`/users`) - All require JWT token

#### GET `/users`

- **Description**: Get all active users
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**: Array of user objects

#### GET `/users/:id`

- **Description**: Get specific user by ID
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**: User object

#### PATCH `/users/:id`

- **Description**: Update user profile (own profile only)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "bio": "Updated bio",
    "profilePicture": "new_image_url"
  }
  ```
- **Response**: Updated user object

### Post Routes (`/posts`) - All require JWT token

#### GET `/posts`

- **Description**: Get feed posts with pagination
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Query Parameters**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Response**:
  ```json
  {
    "posts": [
      {
        "_id": "post_id",
        "content": "Post content",
        "author": {
          "_id": "user_id",
          "name": "Author Name",
          "profilePicture": "image_url"
        },
        "likes": [...],
        "likesCount": 5,
        "isActive": true,
        "createdAt": "2025-08-02T...",
        "updatedAt": "2025-08-02T..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50
    }
  }
  ```

#### GET `/posts/user/:userId`

- **Description**: Get posts by specific user with pagination
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Query Parameters**: Same as feed posts
- **Response**: Same structure as feed posts

#### POST `/posts`

- **Description**: Create a new post
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "content": "This is my new post!"
  }
  ```
- **Response**: Created post object with populated author

#### PATCH `/posts/:id/like`

- **Description**: Toggle like on a post
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**: Updated post object with populated author

#### DELETE `/posts/:id`

- **Description**: Delete own post (soft delete)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

## Authentication

- Uses JWT (JSON Web Tokens)
- Include token in Authorization header: `Bearer <token>`
- Token contains user ID for identifying requests

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Error response format:

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## Environment Variables

Create a `.env` file with:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

## Running the Server

```bash
npm install
npm start        # Production
npm run dev      # Development with nodemon
```

The server runs on `http://localhost:3001` by default.
