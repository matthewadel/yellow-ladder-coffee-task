#!/bin/bash

# Yellow Ladder Coffee - Monorepo Setup Script
echo "🚀 Setting up Yellow Ladder Coffee monorepo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install web app dependencies
echo "📦 Installing web app dependencies..."
npm install --workspace=apps/web

# Install API dependencies
echo "📦 Installing API dependencies..."
npm install --workspace=apps/api

# Install mobile app dependencies
echo "📦 Installing mobile app dependencies..."
npm install --workspace=apps/mobile

# For React Native setup, we need to install additional tools
echo "📱 Setting up React Native environment..."
echo "⚠️  For React Native development, you'll need to install:"
echo "   - Xcode (for iOS development)"
echo "   - Android Studio (for Android development)"
echo "   - React Native CLI: npm install -g react-native-cli"
echo "   - CocoaPods (for iOS): sudo gem install cocoapods"

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. For web development:"
echo "   npm run dev:web"
echo ""
echo "2. For API development:"
echo "   npm run dev:api"
echo ""
echo "3. For mobile development:"
echo "   npm run dev:mobile"
echo "   # Then in another terminal:"
echo "   npx react-native run-ios    # for iOS"
echo "   npx react-native run-android # for Android"
echo ""
echo "4. Or run web + API together:"
echo "   npm run dev"
echo ""
echo "📚 Check the README.md for more detailed instructions."
