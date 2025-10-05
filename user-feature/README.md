
## 4. Users Feature Library README
 
# Users Feature Library

This library provides user management functionality including listing, creating, and editing users.

## Overview

The Users Feature library contains:
- User list component with data table
- User form component for create/edit operations
- Complete CRUD operations
- Responsive user interface

## Components

### UserListComponent
Displays users in a Material table with:
- Sortable and responsive table
- Action buttons (edit/delete)
- Loading states
- Empty state handling

#### Features
- Material Data Table
- NgRx state integration
- Responsive design
- Delete confirmation

### UserFormComponent
Handles user creation and editing with:
- Reactive form with validation
- Job role selection
- Create/update operations
- Cancel functionality

#### Features
- Form validation (username, email, job role)
- Support for create and edit modes
- Material form controls
- Error handling

## Templates

### User List Template
- Material card layout
- Data table with columns: ID, Username, Email, Job Role, Actions
- Loading spinner
- Empty state message

### User Form Template
- Material card layout
- Reactive form with validation
- Form controls for all user fields
- Action buttons (Cancel, Save)

## Services

Integrated with:
- UserService from data-access library
- NgRx store from shared-state library

## Usage

