#!/bin/bash

# 🚀 Quick Deployment Script for Valentine's Day Promotional Header
# Usage: ./quick-deploy.sh

set -e

echo ""
echo "🎀 ================================== 🎀"
echo "   Valentine's Day Deployment Script"
echo "🎀 ================================== 🎀"
echo ""

# Color codes
RED='[0;31m'
GREEN='[0;32m'
YELLOW='[1;33m'
NC='[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "${RED}❌ Error: package.json not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "${GREEN}✅ Project directory verified${NC}"
echo ""

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "${RED}❌ Error: Node.js version must be >= 20.0.0${NC}"
    echo "Current version: $(node --version)"
    exit 1
fi

echo "${GREEN}✅ Node.js version check passed: $(node --version)${NC}"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo "${GREEN}✅ Dependencies installed${NC}"
    echo ""
else
    echo "${GREEN}✅ Dependencies already installed${NC}"
    echo ""
fi

# Ask user what they want to do
echo "${YELLOW}What would you like to do?${NC}"
echo ""
echo "1) Test locally (dev server)"
echo "2) Build for production"
echo "3) Deploy to Oxygen"
echo "4) Full workflow (build + deploy)"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "${GREEN}🚀 Starting development server...${NC}"
        echo ""
        echo "${YELLOW}⏳ Server will be available at: http://localhost:3000${NC}"
        echo "${YELLOW}Press Ctrl+C to stop${NC}"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "${GREEN}🔨 Building for production...${NC}"
        echo ""
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "${GREEN}✅ Build completed successfully!${NC}"
            echo ""
            echo "${YELLOW}📁 Build files are in: ./dist${NC}"
            echo ""
            echo "To preview the build:"
            echo "  npm run preview"
            echo ""
        else
            echo ""
            echo "${RED}❌ Build failed!${NC}"
            echo "Please check the errors above."
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "${GREEN}🚀 Deploying to Shopify Oxygen...${NC}"
        echo ""
        echo "${YELLOW}⚠️  Make sure you're logged in to Shopify CLI${NC}"
        echo ""
        
        shopify hydrogen deploy
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "${GREEN}✅ Deployment completed successfully!${NC}"
            echo ""
            echo "${YELLOW}🌐 Your site should be live now!${NC}"
            echo ""
        else
            echo ""
            echo "${RED}❌ Deployment failed!${NC}"
            echo ""
            echo "Common issues:"
            echo "1. Not logged in to Shopify CLI (run: shopify auth login)"
            echo "2. Incorrect store permissions"
            echo "3. Network connection issues"
            echo ""
            exit 1
        fi
        ;;
    4)
        echo ""
        echo "${GREEN}🔨 Step 1: Building for production...${NC}"
        echo ""
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "${GREEN}✅ Build completed!${NC}"
            echo ""
            echo "${GREEN}🚀 Step 2: Deploying to Oxygen...${NC}"
            echo ""
            
            shopify hydrogen deploy
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "${GREEN}🎉 ================================== 🎉${NC}"
                echo "${GREEN}   DEPLOYMENT SUCCESSFUL!${NC}"
                echo "${GREEN}🎉 ================================== 🎉${NC}"
                echo ""
                echo "${YELLOW}Next steps:${NC}"
                echo "1. Visit your Shopify store to see the changes"
                echo "2. Verify the Valentine's countdown is working"
                echo "3. Check that the menu loaded correctly"
                echo "4. Test on mobile devices"
                echo ""
            else
                echo ""
                echo "${RED}❌ Deployment failed!${NC}"
                exit 1
            fi
        else
            echo ""
            echo "${RED}❌ Build failed!${NC}"
            echo "Cannot proceed with deployment."
            exit 1
        fi
        ;;
    *)
        echo ""
        echo "${RED}❌ Invalid choice!${NC}"
        exit 1
        ;;
esac

echo ""
echo "${GREEN}✨ Script completed! ✨${NC}"
echo ""

