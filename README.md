# Swipy - Spotify Music Discovery App

## Project Overview
A full-stack music discovery application that implements a Tinder-like swiping interface for discovering new music through Spotify's API. Users can like/skip songs, create playlists, and discover music through social features and mood-based recommendations.

## Current Implementation Status
- ✅ Basic PKCE OAuth2.0 utilities (PKCE code generation)
- ✅ Spotify token access implementation
- 🔄 Initial project structure setup
- ❌ Frontend React app (not yet created)
- ❌ Django backend setup
- ❌ Database schema and Django models
- ❌ REST API implementation
- ❌ AWS integration for user accounts

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Chainlift/LiftKit (Golden Ratio UI)
- **State Management**: React Context/Redux Toolkit (TBD)
- **Authentication**: PKCE OAuth2.0 with Spotify
- **Build Tool**: Vite (recommended)

### Backend
- **Framework**: Django with Python
- **API**: Django REST Framework
- **Authentication**: JWT + Spotify OAuth2.0
- **File Upload**: Django's built-in file handling
- **Admin Interface**: Django Admin

### Database & ORM
- **Database**: PostgreSQL (recommended) or SQLite for development
- **ORM**: Django ORM (built-in)
- **Migrations**: Django's migration system

### Cloud & Infrastructure
- **Cloud Provider**: AWS
- **User Registration**: AWS Cognito or custom JWT
- **File Storage**: AWS S3 (profile images, playlist art)
- **Deployment**: AWS EC2/ECS or Vercel + Railway
- **Database Hosting**: AWS RDS or Supabase

### Additional Services
- **Spotify API**: Web API for music data and user playlists
- **Audio Analysis**: Spotify Audio Features API
- **Facial Recognition**: OpenCV.js or Face-api.js (stretch feature)
- **Real-time Features**: Socket.io (collaborative playlists)

## Core Features

### 1. Authentication & User Management
- [ ] Spotify OAuth2.0 PKCE flow implementation
- [ ] User account creation with AWS integration
- [ ] Profile management (username, avatar, preferences)
- [ ] Friend system (add/remove friends)

### 2. Music Discovery Engine
- [ ] Tinder-like swipe interface (like/skip)
- [ ] Song recommendation algorithm integration
- [ ] Mood-based music suggestions
- [ ] Genre and artist preference learning
- [ ] Skip history to avoid re-recommendations

### 3. Playlist Management
- [ ] Create and manage personal playlists
- [ ] Import/export playlists to/from Spotify
- [ ] Playlist privacy settings (private/public/collaborative)
- [ ] Collaborative playlists using Spotify Blend feature
- [ ] Share playlists with friends

### 4. Social Features
- [ ] Friend discovery and management
- [ ] Playlist sharing between friends
- [ ] Social music discovery based on friends' preferences
- [ ] Activity feed (friends' new playlists, liked songs)

### 5. Advanced Features
- [ ] Audio feature analysis and visualization
- [ ] Beautiful data visualization (audio features as art)
- [ ] Mood detection through facial expression analysis
- [ ] Personalized recommendation based on listening history
- [ ] Integration with Spotify's recommendation algorithm

## Project Structure

### Recommended Full-Stack Architecture
```
swipy/
├── .CLAUDE_PROMPT                 # This documentation file
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json                   # Root package.json for workspace
├── README.md
├── docker-compose.yml             # Local development setup
│
├── frontend/                      # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API calls and external services
│   │   ├── context/               # React context providers
│   │   ├── utils/                 # Frontend utilities
│   │   ├── types/                 # TypeScript types
│   │   └── assets/                # Static assets
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                       # Django backend API
    ├── swipy/                     # Django project directory
    │   ├── __init__.py
    │   ├── settings.py            # Django settings
    │   ├── urls.py                # URL routing
    │   └── wsgi.py
    ├── apps/                      # Django applications
    │   ├── users/                 # User management app
    │   │   ├── models.py
    │   │   ├── views.py
    │   │   ├── serializers.py
    │   │   └── urls.py
    │   ├── playlists/             # Playlist management app
    │   ├── songs/                 # Song data app
    │   └── social/                # Social features app
    ├── requirements.txt           # Python dependencies
    └── manage.py                  # Django management script
│
├── infrastructure/                # AWS/deployment configurations
│   ├── terraform/                 # Infrastructure as code
│   └── docker/                    # Docker configurations
│
└── docs/                          # Project documentation
    ├── api/                       # API documentation
    ├── database/                  # Database schema docs
    └── deployment/                # Deployment guides
```

## Database Schema (Suggested)

### Core Entities
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spotify_id VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  display_name VARCHAR,
  avatar_url VARCHAR,
  preferences JSONB, -- music preferences, mood settings
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Playlists table
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  spotify_playlist_id VARCHAR,
  name VARCHAR NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  is_collaborative BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Songs table (cache frequently accessed songs)
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spotify_id VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  artist VARCHAR NOT NULL,
  album VARCHAR,
  duration_ms INTEGER,
  audio_features JSONB, -- Spotify audio features
  created_at TIMESTAMP DEFAULT NOW()
);

-- User interactions with songs
CREATE TABLE user_song_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  song_id UUID REFERENCES songs(id),
  interaction_type VARCHAR NOT NULL, -- 'like', 'skip', 'save'
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, song_id, interaction_type)
);

-- Friend relationships
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id),
  addressee_id UUID REFERENCES users(id),
  status VARCHAR DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id)
);
```

## Implementation Roadmap

### Phase 1: Foundation Setup (Weeks 1-2)
- [ ] Set up Django project structure
- [ ] Configure Django settings and environment
- [ ] Set up database with Django ORM
- [ ] Implement Django REST API endpoints
- [ ] Create React app with routing and basic UI components
- [ ] Set up Spotify OAuth2.0 PKCE flow (enhance existing implementation)

### Phase 2: Core Features (Weeks 3-5)
- [ ] Implement user authentication and profile management
- [ ] Build swipe interface for music discovery
- [ ] Integrate Spotify Web API for song data
- [ ] Implement playlist creation and management
- [ ] Add song like/skip functionality with database persistence

### Phase 3: Social Features (Weeks 6-7)
- [ ] Implement friend system
- [ ] Add playlist sharing functionality
- [ ] Create social discovery features
- [ ] Build activity feed and notifications

### Phase 4: Advanced Features (Weeks 8-10)
- [ ] Implement audio feature analysis
- [ ] Create data visualization for audio features
- [ ] Add mood-based recommendation system
- [ ] Integrate collaborative playlist features

### Phase 5: Stretch Features (Weeks 11+)
- [ ] Implement facial expression analysis for mood detection
- [ ] Create beautiful audio feature visualizations as art
- [ ] Add advanced recommendation algorithms
- [ ] Implement real-time collaborative features

## Development Workflow

### Local Development Setup
1. **Environment Setup**:
   ```bash
   # Clone and setup
   git clone <repo-url>
   cd swipy
   
   # Backend setup
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Setup environment variables
   cp .env.example .env
   # Fill in Spotify Client ID, Client Secret, etc.
   
   # Database setup
   python manage.py migrate
   python manage.py createsuperuser
   
   # Frontend setup
   cd ../frontend
   npm install
   
   # Start development servers
   # Backend: python manage.py runserver
   # Frontend: npm run dev
   ```

2. **Environment Variables Required**:
   ```env
   # Django
   DEBUG=True
   SECRET_KEY=your_django_secret_key
   
   # Spotify API
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/swipy
   
   # JWT
   JWT_SECRET=your_jwt_secret
   
   # AWS (for production)
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_S3_BUCKET=your_s3_bucket
   ```

### API Endpoints Design

#### Authentication Endpoints
```python
# Django REST API endpoints
POST /api/auth/spotify/authorize/     # Initiate Spotify OAuth
POST /api/auth/spotify/callback/      # Handle OAuth callback
POST /api/auth/refresh/               # Refresh JWT token
POST /api/auth/logout/                # Logout user
```

#### Django Models (Core Types)
```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    spotify_id = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100, blank=True)
    avatar_url = models.URLField(blank=True)
    preferences = models.JSONField(default=dict)
    
class Song(models.Model):
    spotify_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    album = models.CharField(max_length=200, blank=True)
    duration_ms = models.IntegerField()
    audio_features = models.JSONField(default=dict)
    
class Playlist(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_public = models.BooleanField(default=False)
    is_collaborative = models.BooleanField(default=False)
    songs = models.ManyToManyField(Song, through='PlaylistSong')
```

## Testing Strategy

### Unit Testing
- **Frontend**: Jest + React Testing Library
- **Backend**: Django's built-in testing framework + pytest
- **Database**: Django test database with fixtures

### Integration Testing
- **API Testing**: Test Django REST API endpoints with test database
- **Authentication Flow**: Test complete OAuth2.0 flow
- **Spotify Integration**: Mock Spotify API responses

### E2E Testing
- **Cypress** or **Playwright** for full user journey testing
- Test complete swipe-to-playlist workflow
- Test social sharing features

## Security Considerations

### Authentication & Authorization
- [ ] Secure JWT token storage and rotation
- [ ] PKCE implementation for OAuth2.0
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization

### Data Protection
- [ ] Encrypt sensitive user data
- [ ] Secure handling of Spotify tokens
- [ ] GDPR compliance for user data
- [ ] Secure file upload handling

## Performance Optimization

### Frontend Performance
- [ ] Code splitting and lazy loading
- [ ] Image optimization and CDN usage
- [ ] Efficient state management
- [ ] Memoization for expensive computations

### Backend Performance
- [ ] Database query optimization
- [ ] Caching strategy (Redis for session/frequently accessed data)
- [ ] GraphQL query complexity analysis
- [ ] Rate limiting and request throttling

## Deployment Strategy

### Development Environment
- Local development with Docker Compose
- Hot reloading for both frontend and backend
- Local PostgreSQL database

### Staging Environment
- AWS EC2 or containerized deployment
- Staging database with production-like data
- Automated testing pipeline

### Production Environment
- AWS ECS/EKS or Vercel + Railway
- AWS RDS for production database
- CDN for static assets
- Monitoring and logging (AWS CloudWatch)

## Monitoring & Analytics

### Application Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (APM tools)
- [ ] User analytics (privacy-compliant)
- [ ] API usage analytics

### Business Metrics
- [ ] User engagement metrics
- [ ] Playlist creation and sharing rates
- [ ] Song discovery success rates
- [ ] Feature usage analytics

## Future Enhancements

### AI/ML Integration
- [ ] Machine learning for better music recommendations
- [ ] Natural language processing for playlist descriptions
- [ ] Advanced mood detection algorithms
- [ ] Collaborative filtering for social recommendations

### Platform Expansion
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Integration with other music services
- [ ] API for third-party developers

## Contributing Guidelines

### Code Standards
- Python PEP 8 for backend code
- TypeScript for frontend code
- ESLint + Prettier configuration for frontend
- Black code formatter for Python
- Conventional commits for git messages
- Comprehensive docstrings for Python functions

### Pull Request Process
1. Feature branch from main
2. Implement feature with tests
3. Update documentation
4. Code review process
5. Automated testing pipeline
6. Merge to main after approval

## Resources & Documentation

### Spotify API Documentation
- [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api)
- [PKCE Authorization Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
- [Audio Features Documentation](https://developer.spotify.com/documentation/web-api/reference/get-audio-features)

### Technology Documentation
- [React Documentation](https://react.dev)
- [Django Documentation](https://docs.djangoproject.com)
- [Django REST Framework](https://www.django-rest-framework.org)
- [AWS Documentation](https://docs.aws.amazon.com)

---

*This document serves as the living specification for the Swipy project. Update it as requirements evolve and new features are planned.*
