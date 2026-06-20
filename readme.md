# DevPulse - Issue Tracking API

A robust backend API for managing issues and user authentication, built with TypeScript and Express.js. DevPulse enables teams to track bugs, feature requests, and development progress with role-based access control.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Author](#author)

---

## 🎯 Project Overview

**DevPulse** is a comprehensive issue tracking backend system designed for collaborative development teams. It provides secure user authentication, role-based authorization, and complete CRUD operations for issue management.

- **Version:** 1.0.0
<!-- - **License:** ISC -->

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js v5.2 |
| **Database** | PostgreSQL (Neon) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcryptjs |
| **Additional Tools** |  HTTP Status Codes |

---

## ✨ Features

- **User Authentication**
  - Secure signup with password hashing
  - Login with JWT token generation
  - Cookie-based session management

- **Issue Management**
  - Create, read, update, and delete issues
  - Support for two issue types: `bug` and `feature_request`
  - Track issue status: `open`, `in_progress`, `resolved`

- **Role-Based Access Control**
  - Two user roles: `contributor` and `maintainer`
  - Authentication middleware for protected routes
  - Authorization middleware for issue modifications and deletions
  - Only authorized users can modify/delete issues

- **Professional API Design**
  - RESTful API endpoints
  - Standardized response format
  - Error handling with HTTP status codes
  - Request validation and sanitization

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (Neon recommended)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DevPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DB_URL=postgresql://user:password@host:port/dbname
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will run with auto-reload on `http://localhost:5000`

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📡 API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Verify server status |

### User Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/signup` | Create new user account | ❌ |
| POST | `/api/auth/login` | Authenticate user and get JWT token | ❌ |

### Issues Management
| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---|---|
| POST | `/api/issues` | Create new issue | ✅ | — |
| GET | `/api/issues` | Retrieve all issues | ❌ | — |
| GET | `/api/issues/:id` | Get specific issue by ID | ❌ | — |
| PATCH | `/api/issues/:id` | Update issue details | ✅ | Maintainer (any issue) OR Contributor (own issue, only if status is open) |
| DELETE | `/api/issues/:id` | Delete an issue | ✅ | Maintainer |

#### Request/Response Examples

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**POST /api/issues** (Authenticated)
```json
{
  "title": "Login button not working",
  "description": "The login button on homepage is not responding to clicks",
  "type": "bug",
  "status": "open"
}
```

**PATCH /api/issues/:id** (Authenticated, Authorized)
```json
{
  "status": "in_progress",
  "description": "Updated issue description"
}
```

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'contributor' 
  CHECK (role IN ('contributor', 'maintainer')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Issues Table
```sql
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  type VARCHAR(50) NOT NULL 
  CHECK (type IN ('bug', 'feature_request')),

  status VARCHAR(50) DEFAULT 'open' 
  CHECK (status IN ('open', 'in_progress','resolved')),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Key Constraints
- **Users**: Email must be unique; role restricted to defined enum values
- **Issues**: Type and status fields use CHECK constraints; created_by references user ID
- **Timestamps**: Automatic tracking of creation and updates

---

## 📁 Project Structure

```
DevPulse/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── db.ts              # Database connection
│   │   └── env.ts             # Environment variables
│   ├── db/
│   │   └── index.ts           # Database utilities
│   ├── middleware/
│   │   ├── isAuthenticated.ts # JWT verification
│   │   ├── isAuthorizeForModify.ts  # Modify authorization
│   │   └── isAuthorizeForDelete.ts  # Delete authorization
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.controllers.ts  # User business logic
│   │   │   ├── user.interface.ts    # User types
│   │   │   ├── user.route.ts        # User endpoints
│   │   │   └── user.services.ts     # User database operations
│   │   └── Issues/
│   │       ├── issues.controllers.ts # Issue business logic
│   │       ├── issues.interface.ts   # Issue types
│   │       ├── issues.route.ts       # Issue endpoints
│   │       └── issues.services.ts    # Issue database operations
│   └── utility/
│       ├── sendResponse.ts    # Standardized response formatter
│       └── Token.ts           # JWT token utilities
├── package.json
├── tsconfig.json
└── readme.md
```

---

## 🔐 Security Features

- **Password Hashing**: Bcryptjs for secure password storage
- **JWT Authentication**: Token-based stateless authentication
- **Role-Based Authorization**: Middleware-enforced access control
- **Environment Variables**: Sensitive data stored in `.env` file
- **Input Validation**: Request validation in controllers
- **HTTP Status Codes**: Proper error reporting with standardized codes

---

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `jsonwebtoken` - JWT token generation and verification
- `bcryptjs` - Password hashing
- `pg` - PostgreSQL client
- `cookie-parser` - HTTP cookie parsing
- `dotenv` - Environment variable management
- `http-status-codes` - Standard HTTP status codes

### Development Dependencies
- `typescript` - Type safety and compilation
- `tsx` - TypeScript execution for development
- `@types/*` - TypeScript type definitions

---

## 👨‍💻 Author

**MD Fahad Sarker (Fahad moaj)**

---

## 📝 Notes

- All API responses follow a consistent JSON format
- Ensure `.env` file is in `.gitignore` for security
- Use HTTPS in production environment
- Implement rate limiting for production deployment
- Consider adding logging and monitoring services

---

**Last Updated:** June 2026
