#!/bin/bash

# Smart Job Parser Frontend Setup Script

echo "🚀 Setting up Smart Job Parser Frontend..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if backend directory exists
BACKEND_DIR="../smart-job-parser"
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Backend directory not found at $BACKEND_DIR"
    echo "Please ensure the Smart Job Parser backend is located at $BACKEND_DIR"
    exit 1
fi

echo "✅ Backend directory found"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Smart Job Parser Frontend - Local Environment Variables

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

# Development Settings
NODE_ENV=development
EOF
    echo "✅ .env.local file created"
else
    echo "✅ .env.local file already exists"
fi

# Check if Python is available (for backend)
if command -v python &> /dev/null || command -v python3 &> /dev/null; then
    echo "✅ Python found"
    
    # Check if backend requirements can be satisfied
    if [ -f "$BACKEND_DIR/requirements.txt" ]; then
        echo "✅ Backend requirements.txt found"
    fi
else
    echo "⚠️  Python not found. You'll need Python to run the backend."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  npm run dev:full    # Start both frontend and backend"
echo "  npm run dev         # Start frontend only"
echo ""
echo "To check health:"
echo "  npm run backend:check  # Check backend status"
echo "  npm run check-health   # Check overall health"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:8000" 