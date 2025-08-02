# Mini Community - Full-Stack Social Media Platform

A modern social media platform built with Node.js, Express, MongoDB, Next.js, and shadcn/ui components.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)

- **User Authentication**: JWT-based registration and login
- **User Management**: Profile creation, updates, and user discovery
- **Post System**: Create, read, like/unlike, and delete posts
- **Real-time Feed**: Paginated posts with author information
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Password hashing with bcryptjs, JWT tokens

### Frontend (Next.js + TypeScript + shadcn/ui)

- **Modern UI**: Clean, responsive design with shadcn/ui components
- **Authentication Flow**: Login/Register forms with validation
- **Dashboard**: Post feed with infinite scroll and user interactions
- **Profile Pages**: View and edit user profiles
- **Real-time Updates**: Optimistic UI updates for likes and posts
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Lucide React** - Icon library
- **React Hook Form** - Form management

## 📁 Project Structure

```
mini-community/
├── backend/
│   ├── controllers/
│   │   ├── auth.js          # Authentication logic
│   │   ├── users.js         # User management
│   │   └── posts.js         # Post operations
│   ├── models/
│   │   ├── user.js          # User schema
│   │   └── post.js          # Post schema
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── users.js         # User routes
│   │   └── posts.js         # Post routes
│   ├── middlewares/
│   │   └── auth.js          # JWT verification
│   ├── index.js             # Server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx     # Home page
    │   │   ├── layout.tsx   # Root layout
    │   │   └── profile/[id]/page.tsx  # Profile pages
    │   ├── components/
    │   │   ├── ui/          # shadcn/ui components
    │   │   ├── auth/        # Authentication forms
    │   │   ├── posts/       # Post components
    │   │   └── layout/      # Layout components
    │   ├── contexts/
    │   │   └── AuthContext.tsx  # Auth state management
    │   ├── lib/
    │   │   ├── api.ts       # API functions
    │   │   └── utils.ts     # Utility functions
    │   └── types/
    │       └── index.ts     # TypeScript definitions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

4. Start the development server:
   ```bash
   ./node_modules/.bin/next dev
   ```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/auth/register`

Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Hello world!"
}
```

#### POST `/auth/login`

Login existing user

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### User Endpoints

#### GET `/users`

Get all active users (requires auth)

#### GET `/users/:id`

Get user by ID (requires auth)

#### PATCH `/users/:id`

Update user profile (requires auth, own profile only)

### Post Endpoints

#### GET `/posts`

Get feed posts with pagination (requires auth)

#### GET `/posts/user/:userId`

Get posts by specific user (requires auth)

#### POST `/posts`

Create a new post (requires auth)

#### PATCH `/posts/:id/like`

Toggle like on a post (requires auth)

#### DELETE `/posts/:id`

Delete own post (requires auth)

## 🎨 UI Components

### Authentication

- **LoginForm**: User login with email/password
- **RegisterForm**: User registration with validation
- **AuthContext**: Global authentication state

### Posts

- **CreatePost**: Post creation form
- **PostCard**: Individual post display
- **PostFeed**: Paginated posts list

### Layout

- **Navbar**: Navigation with user menu
- **Sidebar**: Navigation sidebar
- **DashboardLayout**: Main app layout wrapper

### UI Components (shadcn/ui)

- Button, Card, Input, Label, Textarea
- Avatar, Dialog, Dropdown Menu
- Custom styling with Tailwind CSS

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation
- **CORS Protection**: Configured for specific origins
- **SQL Injection Protection**: MongoDB with Mongoose

## 🎯 Key Features Implemented

### User Experience

- ✅ Responsive design for all screen sizes
- ✅ Real-time UI updates (optimistic updates)
- ✅ Infinite scroll pagination
- ✅ Form validation with error handling
- ✅ Loading states and skeleton screens

### Backend Architecture

- ✅ RESTful API design
- ✅ Modular controller/route structure
- ✅ Middleware for authentication
- ✅ MongoDB indexing for performance
- ✅ Error handling and validation

### Frontend Architecture

- ✅ TypeScript for type safety
- ✅ Context API for state management
- ✅ Component composition pattern
- ✅ API abstraction layer
- ✅ Modern React patterns (hooks, suspense)

## 🚀 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Build and deploy the Node.js application
3. Ensure MongoDB connection is accessible

### Frontend Deployment

1. Update `NEXT_PUBLIC_API_URL` to your backend URL
2. Build the Next.js application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platform

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow component composition patterns
- Implement error boundaries
- Use semantic HTML and accessibility features

### Git Workflow

- Feature branches for new functionality
- Pull requests for code review
- Conventional commit messages

### Testing (Recommended)

- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Failures**: Verify JWT secret and token storage
3. **Database Connection**: Ensure MongoDB is running and accessible
4. **Port Conflicts**: Change ports in environment variables

### Development Tips

- Use browser DevTools for debugging
- Check Network tab for API calls
- Monitor server logs for backend issues
- Use React DevTools for component debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide React** for the icon system
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the powerful React framework
