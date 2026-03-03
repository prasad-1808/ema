#!/bin/bash

# Backend Setup Script

echo "🚀 Setting up Django Backend..."

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your database credentials"
fi

echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your PostgreSQL credentials"
echo "2. Create PostgreSQL database: sudo -u postgres createdb eventapp_db"
echo "3. Run migrations: python manage.py migrate"
echo "4. Create superuser: python manage.py createsuperuser"
echo "5. Run server: python manage.py runserver"
