# Smart Job Parser Frontend

A modern frontend for the Smart Job Parser backend, built with Next.js, TypeScript, and Tailwind CSS. This application provides a beautiful interface for job searching and text processing capabilities.

## 🚀 Features

- **Job Search**: Search for relevant jobs using the Smart Job Parser backend
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Search**: Instant search results with loading states
- **TypeScript**: Full type safety throughout the application
- **API Routes**: Built-in backend communication with fallback support
- **Health Monitoring**: Backend connectivity monitoring
- **Component-based**: Reusable React components

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Backend**: Smart Job Parser (FastAPI)

## 📦 Installation & Setup

### Prerequisites

Make sure you have the Smart Job Parser backend running. The backend should be located at:
```
/Users/arjunsunil/Workspace/smart-job-parser
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd /Users/arjunsunil/Workspace/smart-job-parser-fe
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file if you need to change default settings
# Default backend URL is http://localhost:8000
```

### Running the Application

#### Option 1: Run Frontend and Backend Together (Recommended)
```bash
# This will start both frontend (port 3000) and backend (port 8000)
npm run dev:full
```

#### Option 2: Run Frontend Only
```bash
# Make sure backend is running separately
npm run dev
```

#### Option 3: Check Backend Status
```bash
# Check if backend is running
npm run backend:check

# Check overall health
npm run check-health
```

### Backend Setup (if needed)

1. Navigate to the backend directory:
```bash
cd /Users/arjunsunil/Workspace/smart-job-parser
```

2. Start the backend:
```bash
python src/main.py
```

The backend will be available at http://localhost:8000

## 🏗️ Project Structure

```
src/
  ├── app/
  │   ├── api/
  │   │   ├── search/
  │   │   │   └── route.ts          # Job search API endpoint
  │   │   └── health/
  │   │       └── route.ts          # Health check endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main search page
├── components/
│   ├── SearchBar.tsx             # Reusable search input
│   └── SearchResult.tsx          # Individual result component
└── lib/
    └── searchService.ts          # Job search service with backend integration
config.ts                         # Configuration file
config.example.ts                 # Configuration example/template
```

## 🔧 API Integration

### Job Search API

The frontend integrates with the Smart Job Parser backend to provide job search functionality:

```typescript
// Search for jobs
const jobResults = await SearchService.searchJobs("React developer", "US");
```



### Health Check

Monitor backend connectivity:

```typescript
// Check if backend is healthy
const isHealthy = await SearchService.checkBackendHealth();
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with these variables:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_PREFIX=/api/v1
NEXT_PUBLIC_API_TIMEOUT=10000

# Job Search Configuration
NEXT_PUBLIC_JOB_SEARCH_ENABLED=true
NEXT_PUBLIC_DEFAULT_COUNTRY=US



# Application Configuration
NEXT_PUBLIC_APP_NAME=Smart Job Parser Frontend
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend Configuration

The backend should be configured with the appropriate API keys and settings. Check the backend's `.env` file or configuration.

## 🚀 Available Scripts

```bash
# Development
npm run dev                 # Start frontend only
npm run dev:full           # Start both frontend and backend
npm run backend:dev        # Start backend only

# Building and Production
npm run build              # Build for production
npm run start              # Start production server

# Utilities
npm run lint               # Run ESLint
npm run backend:check      # Check backend status
npm run check-health       # Check overall health
npm run setup              # Install and setup environment
```

## 🔍 Features

### Current Features

- ✅ Job search with Smart Job Parser backend
- ✅ Real-time search with debouncing
- ✅ Backend health monitoring
- ✅ Fallback to mock data when backend unavailable
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ TypeScript support

### API Endpoints

- **GET/POST** `/api/search` - Job search
- **GET** `/api/health` - Health check

## 🔧 Troubleshooting

### Common Issues

1. **"Backend service is not available"**
   - Make sure the Smart Job Parser backend is running on port 8000
   - Check if you can access http://localhost:8000/health
   - Run `npm run backend:check` to verify

2. **"CORS errors"**
   - The backend is configured to allow CORS from all origins in development
   - Check backend logs for CORS configuration

3. **"Import errors in searchService.ts"**
   - Make sure `config.ts` exists (copy from `config.example.ts`)
   - Check that all dependencies are installed

4. **"Cannot connect to API"**
   - Verify the `NEXT_PUBLIC_API_BASE_URL` in your `.env.local`
   - Check network connectivity and firewall settings

### Development Tips

1. **Use the health endpoint** to monitor backend status:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Check browser console** for detailed error messages

3. **Use the fallback mode** - the app will work with mock data even if backend is down

## 🚀 Deployment

### Development
Both frontend and backend should be running for full functionality.

### Production
1. Deploy the backend (Smart Job Parser) to your production environment
2. Update `NEXT_PUBLIC_API_BASE_URL` to point to your production backend
3. Deploy the frontend to Vercel, Netlify, or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the backend running
5. Submit a pull request

## 📝 Notes

- This frontend is specifically designed to work with the Smart Job Parser backend for job searching
- The application includes fallback functionality when the backend is unavailable
- All configuration is handled through environment variables and the config system
- The search service automatically detects backend availability and adjusts functionality accordingly
- Focus is entirely on job search functionality - no text processing capabilities
