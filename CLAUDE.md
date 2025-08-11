# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

✅ **COMPLETE**: Full-stack Reverse Cookbook application implemented and functional.

## Project Overview

**Reverse Cookbook** is an AI-powered web application that generates recipe recommendations based on available ingredients and preferred cuisine types. Users input their ingredients, select a cuisine, and receive personalized recipe suggestions powered by open-source LLM models.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Headless UI
- **Backend**: Node.js + Express + TypeScript + SQLite
- **AI**: Ollama + Llama 3.1 8B model (local inference)
- **Deployment**: Docker + Docker Compose
- **Architecture**: Monorepo with shared TypeScript types

## Project Structure

```
reverse-cookbook/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # UI components (selectors, cards, modals)
│   │   ├── hooks/         # Custom React hooks (useIngredients, useRecipes)
│   │   ├── services/      # API communication layer
│   │   └── utils/         # Frontend utilities
│   ├── Dockerfile         # Multi-stage build for production
│   └── nginx.conf         # Production nginx configuration
├── backend/               # Express API server
│   ├── src/
│   │   ├── controllers/   # Route handlers (recipe, ingredient)
│   │   ├── services/      # Business logic (AI, database, ingredients)
│   │   ├── middleware/    # Error handling and validation
│   │   └── routes/        # API route definitions
│   ├── Dockerfile         # Backend containerization
│   └── .env.example       # Environment configuration template
├── shared/                # Shared TypeScript types and utilities
│   └── src/types.ts       # Common interfaces and types
└── docker-compose.yml     # Multi-service orchestration
```

## Development Commands

### Quick Start (Docker - Recommended)
```bash
docker-compose up -d        # Start all services
docker-compose ps           # Check service status
docker-compose logs -f      # View logs
docker-compose down         # Stop all services
```

### Local Development
```bash
npm install                 # Install dependencies
npm run dev                 # Start both frontend and backend
npm run dev:frontend        # Frontend only (React dev server)
npm run dev:backend         # Backend only (Express with nodemon)
npm run build              # Build all packages for production
```

### Individual Package Commands
```bash
cd shared && npm run build  # Build shared types
cd backend && npm run dev   # Backend development
cd frontend && npm start    # Frontend development
```

## API Endpoints

### Ingredients
- `GET /api/ingredients` - Get all available ingredients
- `GET /api/ingredients/categories` - Get ingredients grouped by category
- `GET /api/ingredients/search?q=query` - Search ingredients
- `GET /api/ingredients/:id` - Get specific ingredient

### Recipes
- `POST /api/recipes/generate` - Generate AI recipes from ingredients
- `GET /api/recipes/search?q=query&cuisine=type` - Search existing recipes
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/favorites` - Get favorite recipes

### Health Check
- `GET /health` - Service health status

## Configuration

### Environment Variables

**Backend (.env)**:
```env
NODE_ENV=development
PORT=3001
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
DB_PATH=./recipes.db
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Key Features Implemented

1. **Ingredient Selector**: Multi-select component with search (34+ ingredients)
2. **Cuisine Selection**: Dropdown with 12+ international cuisines
3. **AI Recipe Generation**: Ollama integration for recipe creation
4. **Recipe Display**: Modal with ingredients, instructions, cooking time
5. **Database Caching**: SQLite with intelligent recipe caching
6. **Responsive Design**: Mobile-first Tailwind CSS implementation
7. **Type Safety**: Full TypeScript coverage across all packages

## Architecture Patterns

- **Modular Services**: Clear separation between AI, database, and API layers
- **Shared Types**: Common interfaces prevent type mismatches
- **Error Boundaries**: Proper error handling and user feedback
- **Caching Strategy**: Ingredient-based recipe caching for performance
- **Container Architecture**: Multi-service Docker setup with health checks

## Testing & Validation

### API Testing
```bash
curl http://localhost:3001/health                    # Health check
curl http://localhost:3001/api/ingredients           # Get ingredients
curl -X POST http://localhost:3001/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["chicken","garlic"],"cuisine":"Italian"}'
```

### Service URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Ollama AI: http://localhost:11434

## Troubleshooting

### Common Issues

1. **Recipe generation slow/failing**: AI model still downloading (~4.9GB)
2. **Port conflicts**: Stop local services on ports 3000/3001/11434
3. **Docker build fails**: Ensure sufficient disk space for images
4. **TypeScript errors**: Run `npm run build` in shared package first

### Performance Notes

- First recipe generation: 20-60 seconds (model cold start)
- Subsequent generations: 5-15 seconds (warm model)
- Cached recipes: <1 second response
- Model download time: 5-20 minutes (first run only)

## Development Patterns

- Use shared types from `@reverse-cookbook/shared`
- Follow React hooks pattern for state management  
- Implement proper loading states and error boundaries
- Use Tailwind utility classes for consistent styling
- Follow RESTful API conventions for new endpoints

## Deployment

The application is production-ready with:
- Multi-stage Docker builds for optimization
- Nginx configuration for frontend serving
- Health checks for all services
- Persistent volumes for AI models and database
- Security headers and CORS configuration

Run `docker-compose up -d` for complete deployment.