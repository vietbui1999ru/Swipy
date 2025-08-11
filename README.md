# Swipy - Spotify Music Discovery App

## Project Overview
A full-stack music discovery application that implements a Tinder-like swiping interface for discovering new music through Spotify's API. Users can like/skip songs, create playlists, and discover music through social features and mood-based recommendations.

## Current Implementation Status
- ✅ Basic PKCE OAuth2.0 utilities (PKCE code generation)
- ✅ Spotify token access implementation
- 🔄 Initial project structure setup
- ❌ Frontend React app (not yet created)
- ❌ Database schema and ORM setup
- ❌ GraphQL API implementation
- ❌ AWS integration for user accounts

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Chainlift/LiftKit (Golden Ratio UI)
- **State Management**: React Context/Redux Toolkit (TBD)
- **Authentication**: PKCE OAuth2.0 with Spotify
- **Build Tool**: Vite (recommended)

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js or Fastify
- **GraphQL**: Apollo Server or Pothos GraphQL
- **Authentication**: JWT + Spotify OAuth2.0
- **File Upload**: Multer (for profile images)

### Database & ORM
- **Database**: PostgreSQL (recommended) or MongoDB
- **ORM Options**:
  - **Prisma** (recommended - excellent TypeScript support, migrations)
  - **TypeORM** (alternative - decorator-based)
  - **Drizzle** (lightweight, SQL-like)

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
├── packages/                      # Monorepo structure (optional)
│   ├── shared/                    # Shared types and utilities
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── utils/                 # Common utilities
│   │   └── constants/             # Shared constants
│   │
│   ├── frontend/                  # React frontend application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/        # Reusable UI components
│   │   │   ├── pages/             # Page components
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── services/          # API calls and external services
│   │   │   ├── context/           # React context providers
│   │   │   ├── utils/             # Frontend utilities
│   │   │   ├── types/             # TypeScript types
│   │   │   └── assets/            # Static assets
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── backend/                   # Node.js backend API
│       ├── src/
│       │   ├── resolvers/         # GraphQL resolvers
│       │   ├── schema/            # GraphQL schema definitions
│       │   ├── models/            # Database models
│       │   ├── services/          # Business logic services
│       │   ├── middleware/        # Express middleware
│       │   ├── utils/             # Backend utilities
│       │   ├── config/            # Configuration files
│       │   └── types/             # TypeScript types
│       ├── prisma/                # Database schema and migrations
│       ├── package.json
│       └── tsconfig.json
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
- [ ] Set up monorepo structure with proper tooling
- [ ] Configure TypeScript, ESLint, Prettier across packages
- [ ] Set up database with chosen ORM (Prisma recommended)
- [ ] Implement basic GraphQL schema and resolvers
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
   npm install
   
   # Setup environment variables
   cp .env.example .env
   # Fill in Spotify Client ID, Client Secret, etc.
   
   # Database setup
   npm run db:setup
   npm run db:migrate
   
   # Start development servers
   npm run dev # Runs both frontend and backend
   ```

2. **Environment Variables Required**:
   ```env
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
```typescript
// REST endpoints for OAuth flow
POST /auth/spotify/authorize     // Initiate Spotify OAuth
POST /auth/spotify/callback      // Handle OAuth callback
POST /auth/refresh               // Refresh JWT token
POST /auth/logout                // Logout user
```

#### GraphQL Schema (Core Types)
```graphql
type User {
  id: ID!
  spotifyId: String!
  username: String!
  displayName: String
  email: String!
  avatarUrl: String
  playlists: [Playlist!]!
  friends: [User!]!
  preferences: UserPreferences
}

type Song {
  id: ID!
  spotifyId: String!
  title: String!
  artist: String!
  album: String
  durationMs: Int!
  audioFeatures: AudioFeatures
}

type Playlist {
  id: ID!
  name: String!
  description: String
  isPublic: Boolean!
  isCollaborative: Boolean!
  songs: [Song!]!
  owner: User!
}

type AudioFeatures {
  danceability: Float!
  energy: Float!
  valence: Float!
  tempo: Float!
  acousticness: Float!
  instrumentalness: Float!
  speechiness: Float!
}
```

## Testing Strategy

### Unit Testing
- **Frontend**: Jest + React Testing Library
- **Backend**: Jest + Supertest for API testing
- **Database**: Test database with seed data

### Integration Testing
- **API Testing**: Test GraphQL resolvers with real database
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
- TypeScript for all new code
- ESLint + Prettier configuration
- Conventional commits for git messages
- Comprehensive JSDoc comments

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
- [GraphQL Documentation](https://graphql.org/learn)
- [Prisma Documentation](https://www.prisma.io/docs)
- [AWS Documentation](https://docs.aws.amazon.com)

---

*This document serves as the living specification for the Swipy project. Update it as requirements evolve and new features are planned.*
