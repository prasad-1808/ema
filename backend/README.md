# Django Backend Setup

## Prerequisites
```bash
# Install Python venv (Ubuntu/Debian)
sudo apt install python3.12-venv python3-pip

# Or use system Python with pip
sudo apt install python3-pip
```

## Installation

### 1. Create Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Create Django Project
```bash
django-admin startproject config .
```

### 4. Configure PostgreSQL
Create `.env` file in backend directory:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_NAME=eventapp_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_HOST=localhost
DATABASE_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### 5. Create Database
```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE eventapp_db;
CREATE USER eventapp_user WITH PASSWORD 'your-password';
ALTER ROLE eventapp_user SET client_encoding TO 'utf8';
ALTER ROLE eventapp_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE eventapp_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE eventapp_db TO eventapp_user;
\q
```

### 6. Run Migrations
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 7. Run Server
```bash
python manage.py runserver
```

## Project Structure
```
backend/
├── config/              # Project settings
│   ├── settings/       # Split settings (base, dev, prod)
│   ├── urls.py
│   └── wsgi.py
├── apps/               # Django apps
│   ├── events/        # Event management
│   ├── users/         # User management
│   └── core/          # Shared utilities
├── requirements.txt
├── .env
└── manage.py
```
