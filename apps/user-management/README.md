
## 6. Main Application README

 
# User Management Application

Main Angular application that orchestrates all libraries and provides the user interface.

## Overview

This is the root application that:
- Configures the Angular application
- Sets up routing and navigation
- Provides the main app shell
- Integrates all feature libraries

## Architecture
user-management-app/
├── apps/user-management/ # This application
├── libs/
│ ├── data-access/ # Data models and services
│ ├── shared-state/ # NgRx state management
│ ├── auth-feature/ # Authentication features
│ ├── features-users/ # User management features
│ └── ui-components/ # Reusable UI components


## Features

- ✅ User authentication
- ✅ User management (CRUD)
- ✅ Responsive design
- ✅ State management with NgRx
- ✅ Form validation
- ✅ Route protection

## Configuration

### App Configuration
- Standalone components
- NgRx store setup
- Router configuration
- HTTP client setup

### Routing
```typescript
/               → Redirect to /users
/login          → Login page
/users          → User list
/users/new      → Create user
/users/:id/edit → Edit user