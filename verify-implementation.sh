#!/bin/bash

# 🔍 Verification Script - Check Implementation Status
# This script verifies all files are in place and ready for deployment

echo ""
echo "🔍 ================================== 🔍"
echo "   Implementation Verification"
echo "🔍 ================================== 🔍"
echo ""

# Colors
GREEN='[0;32m'
RED='[0;31m'
YELLOW='[1;33m'
BLUE='[0;34m'
NC='[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo "${GREEN}✅ $2${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ $2${NC}"
        ((FAILED++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "${GREEN}✅ $2${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ $2${NC}"
        ((FAILED++))
    fi
}

echo "${BLUE}📂 Checking Core Files...${NC}"
echo ""
check_file "package.json" "package.json exists"
check_file "hydrogen.config.js" "hydrogen.config.js exists"
check_file "vite.config.js" "vite.config.js exists"
check_file ".env" ".env file exists"
echo ""

echo "${BLUE}📄 Checking Application Files...${NC}"
echo ""
check_file "app/routes/_index.jsx" "Main homepage (index.jsx) exists"
check_dir "app/components" "Components directory exists"
check_dir "app/routes" "Routes directory exists"
echo ""

echo "${BLUE}📚 Checking Documentation...${NC}"
echo ""
check_file "DEPLOYMENT_GUIDE_VALENTINES.md" "Deployment guide exists"
check_file "SHOPIFY_MENU_SETUP.md" "Shopify menu setup guide exists"
check_file "IMPLEMENTATION_SUMMARY.md" "Implementation summary exists"
check_file "quick-deploy.sh" "Quick deploy script exists"
check_file "verify-implementation.sh" "This verification script exists"
echo ""

echo "${BLUE}📦 Checking Dependencies...${NC}"
echo ""
if [ -d "node_modules" ]; then
    echo "${GREEN}✅ node_modules directory exists${NC}"
    ((PASSED++))
    
    # Check key dependencies
    if [ -d "node_modules/@shopify/hydrogen" ]; then
        echo "${GREEN}✅ Shopify Hydrogen installed${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ Shopify Hydrogen NOT installed${NC}"
        ((FAILED++))
    fi
    
    if [ -d "node_modules/react" ]; then
        echo "${GREEN}✅ React installed${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ React NOT installed${NC}"
        ((FAILED++))
    fi
    
    if [ -d "node_modules/react-router" ]; then
        echo "${GREEN}✅ React Router installed${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ React Router NOT installed${NC}"
        ((FAILED++))
    fi
else
    echo "${RED}❌ node_modules directory NOT found${NC}"
    echo "${YELLOW}⚠️  Run: npm install${NC}"
    ((FAILED++))
fi
echo ""

echo "${BLUE}🔧 Checking Node.js Environment...${NC}"
echo ""
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
    ((PASSED++))
    
    # Check version
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 20 ]; then
        echo "${GREEN}✅ Node.js version is >= 20 (required)${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ Node.js version is < 20 (need upgrade)${NC}"
        ((FAILED++))
    fi
else
    echo "${RED}❌ Node.js NOT installed${NC}"
    ((FAILED++))
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "${GREEN}✅ npm installed: v$NPM_VERSION${NC}"
    ((PASSED++))
else
    echo "${RED}❌ npm NOT installed${NC}"
    ((FAILED++))
fi
echo ""

echo "${BLUE}🛍️ Checking Shopify Configuration...${NC}"
echo ""
if grep -q "uxst0j-qe.myshopify.com" hydrogen.config.js 2>/dev/null; then
    echo "${GREEN}✅ Shopify store domain configured${NC}"
    ((PASSED++))
else
    echo "${RED}❌ Shopify store domain NOT configured${NC}"
    ((FAILED++))
fi

if grep -q "storefrontToken" hydrogen.config.js 2>/dev/null; then
    echo "${GREEN}✅ Storefront API token configured${NC}"
    ((PASSED++))
else
    echo "${RED}❌ Storefront API token NOT configured${NC}"
    ((FAILED++))
fi
echo ""

echo "${BLUE}📝 Checking index.jsx Content...${NC}"
echo ""
if grep -q "Valentine" app/routes/_index.jsx 2>/dev/null; then
    echo "${GREEN}✅ Valentine's Day content found in index.jsx${NC}"
    ((PASSED++))
else
    echo "${RED}❌ Valentine's Day content NOT found in index.jsx${NC}"
    ((FAILED++))
fi

if grep -q "MAIN_MENU_QUERY" app/routes/_index.jsx 2>/dev/null; then
    echo "${GREEN}✅ Shopify menu query found${NC}"
    ((PASSED++))
else
    echo "${RED}❌ Shopify menu query NOT found${NC}"
    ((FAILED++))
fi

if grep -q "calculateValentinesCountdown" app/routes/_index.jsx 2>/dev/null; then
    echo "${GREEN}✅ Countdown function implemented${NC}"
    ((PASSED++))
else
    echo "${RED}❌ Countdown function NOT implemented${NC}"
    ((FAILED++))
fi
echo ""

# Final Summary
echo ""
echo "═══════════════════════════════════"
echo "           VERIFICATION SUMMARY"
echo "═══════════════════════════════════"
echo ""
echo "${GREEN}✅ Passed: $PASSED${NC}"
echo "${RED}❌ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "${GREEN}🎉 ================================== 🎉${NC}"
    echo "${GREEN}   ALL CHECKS PASSED!${NC}"
    echo "${GREEN}   Ready for deployment! 🚀${NC}"
    echo "${GREEN}🎉 ================================== 🎉${NC}"
    echo ""
    echo "${BLUE}Next steps:${NC}"
    echo "1. Run: ./quick-deploy.sh"
    echo "2. Select option 4 (Full workflow)"
    echo "3. Setup main menu in Shopify Admin"
    echo "4. Test the deployed site"
    echo ""
    exit 0
else
    echo "${YELLOW}⚠️  ================================== ⚠️${NC}"
    echo "${YELLOW}   SOME CHECKS FAILED${NC}"
    echo "${YELLOW}   Please address the issues above${NC}"
    echo "${YELLOW}⚠️  ================================== ⚠️${NC}"
    echo ""
    echo "${BLUE}Common fixes:${NC}"
    echo "1. Run: npm install (if dependencies missing)"
    echo "2. Check file paths are correct"
    echo "3. Verify Shopify configuration in hydrogen.config.js"
    echo "4. Ensure Node.js version >= 20"
    echo ""
    exit 1
fi

