# Docker Services

## Start Services
```bash
# If you get permission denied, add your user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Or run with sudo
sudo docker-compose up -d
```

## Stop Services
```bash
docker-compose down
```

## View Logs
```bash
docker-compose logs -f postgres
```

## PostgreSQL Access
```bash
# Connect to database
docker exec -it eventapp_postgres psql -U eventapp_user -d eventapp_db

# Or from host
psql -h localhost -U eventapp_user -d eventapp_db
```

## Services

### PostgreSQL
- **Port**: 5432
- **Database**: eventapp_db
- **User**: eventapp_user
- **Password**: eventapp_pass
- **Data**: Persisted in Docker volume `postgres_data`

## Backend Configuration

The backend `.env` is already configured to connect to the Docker PostgreSQL instance.

## Quick Start

1. Start services:
   ```bash
   docker-compose up -d
   ```

2. Setup backend:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

3. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```
