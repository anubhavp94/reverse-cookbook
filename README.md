# 🍳 Reverse Cookbook

A modern web application that suggests recipes based on your available ingredients and preferred cuisine type, powered by Google Gemini AI.

> ⚡ **Lightning Fast**: Get recipe suggestions in 1-3 seconds (vs 20-60 seconds with local models)  
> 🚀 **No Setup Hassles**: No large model downloads or GPU requirements  
> 🆓 **Free Tier**: 1,500 requests/day with Google Gemini's generous free tier

## ✨ Features

- **Ingredient-Based Recipe Generation**: Input your available ingredients and get personalized recipe recommendations
- **Cuisine Selection**: Choose from 12+ international cuisines for tailored suggestions
- **AI-Powered**: Uses Google Gemini API for fast, intelligent recipe generation
- **Recipe Storage**: SQLite database with caching for improved performance
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Modular Architecture**: Easily extensible and maintainable codebase
- **Simple Deployment**: Easy local development setup

## 🏗️ Architecture

```
reverse-cookbook/
├── frontend/          # React.js + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express API
└── shared/            # Shared TypeScript types and utilities
```

### Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Headless UI
- **Backend**: Node.js, Express, TypeScript, SQLite
- **AI**: Google Gemini API (Gemini 1.5 Flash model)
- **Deployment**: Local development

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **npm 9+**
- **Google Gemini API Key** (free from [Google AI Studio](https://aistudio.google.com))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/anubhavp94/reverse-cookbook.git
   cd reverse-cookbook
   ```

2. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com)
   - Sign in with your Google account
   - Click "Get API key" in the left sidebar
   - Copy your API key

3. **Set up environment variables**
   ```bash
   # Create backend .env file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env and add your API key:
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Install dependencies and start services**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm install
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm install
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📖 Usage

1. **Select Ingredients**: Use the search interface to find and select your available ingredients
2. **Choose Cuisine**: Pick your preferred cuisine type from the dropdown
3. **Generate Recipes**: Click "Generate Recipes" to get AI-powered recommendations
4. **View Details**: Click on any recipe card to see full instructions and ingredients

## 🛠️ Development

### Project Structure

```
src/
├── components/        # Reusable React components
│   ├── IngredientSelector.tsx
│   ├── CuisineSelector.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeModal.tsx
│   └── RecipeGrid.tsx
├── hooks/            # Custom React hooks
│   ├── useIngredients.ts
│   └── useRecipes.ts
├── services/         # API communication
│   └── api.ts
└── shared/           # Shared types and utilities
    └── types.ts
```

### Available Scripts

```bash
# Development
npm run dev              # Start all services in development mode
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build            # Build all packages
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Testing
npm test                 # Run all tests
```

### API Endpoints

#### Recipes
- `POST /api/recipes/generate` - Generate recipes from ingredients
- `GET /api/recipes/search` - Search existing recipes
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/favorites` - Get favorite recipes

#### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `GET /api/ingredients/categories` - Get ingredients by category
- `GET /api/ingredients/search` - Search ingredients

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
DB_PATH=./recipes.db
API_RATE_LIMIT=100
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```


### Customization

#### Adding New Cuisines
1. Update `CuisineType` in `shared/src/types.ts`
2. Add descriptions in `frontend/src/components/CuisineSelector.tsx`

#### Adding New Ingredients
1. Update the ingredients array in `backend/src/services/ingredientService.ts`
2. Or implement dynamic ingredient loading from an external API


## 🔧 Troubleshooting

### Common Issues

**Recipe Generation Failing**
```bash
# Check if backend is running
curl http://localhost:3001/health

# Verify API key is valid
# Error: "API key not valid" means you need to get a new key from Google AI Studio
```

**Frontend Can't Connect to Backend**
```bash
# Check backend health
curl http://localhost:3001/health

# Verify environment variables
cat backend/.env | grep GEMINI_API_KEY
```

**Environment Variables Not Loading**
```bash
# Ensure .env file exists in backend directory
ls -la backend/.env
```

### Performance Tips

- Recipe generation: **1-3 seconds** with Gemini API (vs 20-60 seconds with local models)
- Cached recipes: **<1 second** response
- No model downloads or GPU requirements
- **Gemini Free Tier**: 15 requests/minute, 1M tokens/minute, 1,500 requests/day

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev) for fast, cloud-based AI inference
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Headless UI](https://headlessui.com) for accessible components
- [React](https://react.dev) for the frontend framework