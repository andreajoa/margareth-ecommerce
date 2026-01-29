#!/bin/bash
set -e

echo '🚀 BrinqueTEAndo - Auto Deploy Script'
echo '======================================'
echo ''

cd /Users/andrealmeida/Desktop/gueth-ecommerce

# Ensure we're on main branch
echo '📍 Checking branch...'
git checkout main

# Add all changes
echo '📝 Adding changes...'
git add .

# Commit
echo '💾 Committing...'
git commit -m "fix: Correct Hydrogen configuration and dependencies" || echo "Nothing to commit"

# Push to trigger deployment
echo '📤 Pushing to GitHub...'
git push origin main

echo ''
echo '✅ Deploy triggered! Check GitHub Actions:'
echo 'https://github.com/andreajoa/margareth-ecommerce/actions'
echo ''
