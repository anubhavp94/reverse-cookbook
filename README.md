# 🍳 Reverse Cookbook

A modern web application that suggests recipes based on your available ingredients and preferred cuisine type, powered by open-source AI models.

## ✨ Features

- **Ingredient-Based Recipe Generation**: Input your available ingredients and get personalized recipe recommendations
- **Cuisine Selection**: Choose from 12+ international cuisines for tailored suggestions
- **AI-Powered**: Uses Ollama with Llama 3.1 for intelligent recipe generation
- **Recipe Storage**: SQLite database with caching for improved performance
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Modular Architecture**: Easily extensible and maintainable codebase
- **Docker Support**: One-command deployment with Docker Compose

## 🏗️ Architecture

```
reverse-cookbook/
├── frontend/          # React.js + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express API
├── shared/            # Shared TypeScript types and utilities
└── docker/            # Docker configuration files
```

### Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Headless UI
- **Backend**: Node.js, Express, TypeScript, SQLite
- **AI**: Ollama (Llama 3.1 8B model)
- **Deployment**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (recommended)
- OR **Node.js 18+** and **npm 9+** for local development

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reverse-cookbook
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Wait for model download** (first run only)
   ```bash
   docker-compose logs -f ollama-setup
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Ollama: http://localhost:11434

### Option 2: Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd reverse-cookbook
   npm install
   ```

2. **Set up Ollama locally**
   ```bash
   # Install Ollama (visit https://ollama.ai for instructions)
   ollama pull llama3.1:8b
   ollama serve
   ```

3. **Configure environment**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   echo "REACT_APP_API_URL=http://localhost:3001/api" > frontend/.env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

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
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
DB_PATH=./recipes.db
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

## 🐳 Docker Configuration

### Services

- **ollama**: AI model inference server
- **backend**: Express API server
- **frontend**: React app served by Nginx
- **ollama-setup**: One-time model download

### Volumes

- `ollama_data`: Persistent storage for AI models
- `backend_data`: SQLite database and uploads

## 🔧 Troubleshooting

### Common Issues

**Ollama Connection Failed**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/version

# Restart Ollama service
docker-compose restart ollama
```

**Frontend Can't Connect to Backend**
```bash
# Check backend health
curl http://localhost:3001/health

# Verify environment variables
docker-compose exec frontend env | grep REACT_APP
```

**Model Not Found**
```bash
# Re-download the model
docker-compose run --rm ollama-setup
```

### Performance Tips

- First recipe generation takes longer due to model initialization
- Subsequent requests are cached for better performance
- Consider using smaller models (e.g., `llama3.1:3b`) for faster inference on limited hardware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) for local AI model inference
- [Llama 3.1](https://llama.meta.com/) for the language model
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Headless UI](https://headlessui.com) for accessible components