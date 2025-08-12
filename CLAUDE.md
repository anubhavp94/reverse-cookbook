# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

✅ **COMPLETE**: Full-stack Reverse Cookbook application implemented and functional.

## Project Overview

**Reverse Cookbook** is an AI-powered web application that generates recipe recommendations based on available ingredients and preferred cuisine types. Users input their ingredients, select a cuisine, and receive personalized recipe suggestions powered by Google Gemini AI.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Headless UI
- **Backend**: Node.js + Express + TypeScript + SQLite
- **AI**: Google Gemini API (Gemini 1.5 Flash model)
- **Deployment**: Local development setup
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
├── backend/               # Express API server
│   ├── src/
│   │   ├── controllers/   # Route handlers (recipe, ingredient)
│   │   ├── services/      # Business logic (AI, database, ingredients)
│   │   ├── middleware/    # Error handling and validation
│   │   └── routes/        # API route definitions
│   └── .env.example       # Environment configuration template
└── shared/                # Shared TypeScript types and utilities
    └── src/types.ts       # Common interfaces and types
```

## Development Commands

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev                 # Backend runs on http://localhost:3001

# Terminal 2 - Frontend  
cd frontend
npm install
npm start                   # Frontend runs on http://localhost:3000
```

### Root Level Commands
```bash
npm install                 # Install all dependencies
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
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
DB_PATH=./recipes.db
API_RATE_LIMIT=100
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:3001/api
```


### Gemini API Key Setup

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click "Get API key" in the left sidebar
4. Copy your API key and add it to the .env files above

## Key Features Implemented

1. **Ingredient Selector**: Multi-select component with search (34+ ingredients)
2. **Cuisine Selection**: Dropdown with 12+ international cuisines
3. **AI Recipe Generation**: Google Gemini API integration for fast recipe creation
4. **Recipe Display**: Modal with ingredients, instructions, cooking time
5. **Database Caching**: SQLite with intelligent recipe caching
6. **Responsive Design**: Mobile-first Tailwind CSS implementation
7. **Type Safety**: Full TypeScript coverage across all packages

## Architecture Patterns

- **Modular Services**: Clear separation between AI, database, and API layers
- **Shared Types**: Common interfaces prevent type mismatches
- **Error Boundaries**: Proper error handling and user feedback
- **Caching Strategy**: Ingredient-based recipe caching for performance
- **Simple Architecture**: Straightforward local development setup

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
- Gemini AI: Cloud-based (no local setup required)

## Troubleshooting

### Common Issues

1. **Recipe generation failing**: Invalid Gemini API key - get a valid key from [Google AI Studio](https://aistudio.google.com)
2. **Port conflicts**: Stop local services on ports 3000/3001
3. **Environment variables not loading**: Ensure .env files exist in backend/ directory
4. **TypeScript errors**: Run `npm run build` in shared package first

### Performance Notes

- Recipe generation: 1-3 seconds (cloud-based Gemini API)
- Cached recipes: <1 second response  
- No model downloads required (cloud-hosted)
- Gemini Free Tier: 15 RPM, 1M tokens/min, 1,500 requests/day

## Development Patterns

- Use shared types from `@reverse-cookbook/shared`
- Follow React hooks pattern for state management  
- Implement proper loading states and error boundaries
- Use Tailwind utility classes for consistent styling
- Follow RESTful API conventions for new endpoints

## Deployment

The application runs locally with:
- **Simple Setup**: Just `npm run dev` for backend and `npm start` for frontend
- **SQLite Database**: Local file-based database storage
- **Environment Variables**: Simple .env file configuration
- **Cloud-based AI**: No model hosting required (Google Gemini API)

### Quick Start:

```bash
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm start
```