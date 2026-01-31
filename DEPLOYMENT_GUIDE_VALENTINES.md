# 🚀 DEPLOYMENT GUIDE - Valentine's Day Promotional Header

## ✅ What Was Implemented

### 1. **Valentine's Day Countdown Timer**
- Real-time countdown to February 14th
- Displays: Days, Hours, Minutes, Seconds
- Auto-updates every second
- Automatically rolls over to next year after Valentine's Day

### 2. **Promotional Marquee Banner**
- Animated scrolling text: "THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER"
- Smooth infinite scroll animation
- Pause on hover functionality

### 3. **Benefits Bar**
- Valentine's Watch Privileges
- Unwrap Luxury messaging
- 1 Year Warranty guarantee
- $20 Gift Card per $100 spent promotion

### 4. **Promotional Code Section**
- Promo code: **VDAY25** for 25% OFF
- Limited time offer messaging
- Clear call-to-action styling

### 5. **Shopify Menu Integration**
- Fetches main menu from Shopify backend
- Dynamic menu rendering
- Fully integrated with Shopify Hydrogen

### 6. **Navigation Components**
- Main navigation with logo (VASTARA)
- Search, Account, Cart icons
- Secondary benefits bar
- Fully responsive design

---

## 📋 Files Modified

### `/app/routes/_index.jsx`
- **Complete rewrite** focusing on promotional header
- Removed: Old homepage content (collections, products, testimonials)
- Added: Valentine's Day countdown and promotional elements
- Integrated: Shopify main menu query

---

## 🔧 Shopify Backend Setup Required

### Step 1: Create Main Menu in Shopify Admin

1. Go to Shopify Admin > **Online Store** > **Navigation**
2. Click **Add menu**
3. Set **Handle** to: `main-menu` (IMPORTANT!)
4. Add menu items:
   - HOME PAGE
   - BY CATEGORY
   - BY GENDER
   - 📖 WATCH GUIDES
   - BY BRANDS
   - BY STYLE
   - BY PRICE
   - SUPPORT
   - OUR STORY

### Step 2: Configure Menu URLs
For each menu item, set the appropriate URL or collection link from your Shopify store.

---

## 🚀 Deployment Steps for Oxygen

### Prerequisites
```bash
# Ensure you're in the project directory
cd /Users/andrealmeida/Desktop/gueth-ecommerce

# Check Node.js version (must be >= 20.0.0)
node --version
```

### Step 1: Install Dependencies (if needed)
```bash
npm install
```

### Step 2: Test Locally
```bash
npm run dev
```
Visit: http://localhost:3000 to verify the changes

### Step 3: Build for Production
```bash
npm run build
```

### Step 4: Deploy to Shopify Oxygen
```bash
npm run deploy
```

**OR using Shopify CLI:**
```bash
shopify hydrogen deploy
```

### Step 5: Connect to Shopify Store
When prompted:
- Select your store: **uxst0j-qe.myshopify.com**
- Confirm deployment environment
- Wait for build to complete

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Valentine's Day countdown is showing correct time
- [ ] Countdown updates every second
- [ ] Marquee banner is scrolling smoothly
- [ ] Promo code "VDAY25" is visible
- [ ] Benefits bar displays all 4 benefit items
- [ ] Main navigation loads from Shopify menu
- [ ] All menu items are clickable and functional
- [ ] Mobile responsiveness works correctly
- [ ] Free shipping banner is visible
- [ ] Confidence section displays 3 guarantee items

---

## 🎨 Design Features

### Color Scheme
- Primary Red: `#B91C1C` (red-700)
- Secondary Pink: `#FEE2E2` (red-100)
- Accent Gold: `#F59E0B` (amber-500)
- Dark Green: `#064E3B` (emerald-900)
- Beige Background: `#FFFBEB` (amber-50)

### Animations
- **Marquee Scroll**: 30s infinite linear
- **Countdown**: 1s interval updates
- **Hover Effects**: Scale and color transitions

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔍 Troubleshooting

### Issue: Menu not showing
**Solution**: 
1. Check Shopify Admin > Navigation
2. Ensure menu handle is exactly `main-menu`
3. Verify menu has items added

### Issue: Countdown shows 00:00:00:00
**Solution**: 
- Check system date/time is correct
- Verify timezone settings
- May indicate Valentine's Day has passed

### Issue: Build fails
**Solution**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: GraphQL errors
**Solution**:
- Verify Shopify storefront API token in `hydrogen.config.js`
- Check API version compatibility (currently: 2024-10)

---

## 📝 Next Steps

### Recommended Enhancements
1. **Add Valentine's Day Product Collection**
   - Create special collection in Shopify
   - Display featured Valentine's products

2. **Integrate Shopping Cart**
   - Add cart functionality
   - Enable quick add to cart

3. **Email Capture**
   - Add newsletter signup for Valentine's promotions
   - Integrate with email service

4. **Analytics**
   - Add Google Analytics
   - Track countdown clicks
   - Monitor promo code usage

### Content Suggestions
- Add Valentine's gift guides
- Create urgency with stock counters
- Implement personalization options
- Add gift wrapping service

---

## 📞 Support

If you encounter any issues:
1. Check Shopify Hydrogen documentation: https://shopify.dev/docs/custom-storefronts/hydrogen
2. Review Shopify forums
3. Contact Shopify support

---

## 🎯 Key Features for Oxygen

✅ Server-side rendering (SSR)
✅ Optimized for Shopify Oxygen hosting
✅ GraphQL API integration
✅ React Router 7 compatible
✅ Vite build optimization
✅ TypeScript support ready

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: January 31, 2026
**Framework**: Shopify Hydrogen (2025.7.3)
**React Version**: 18.3.1
**Node Requirement**: >= 20.0.0

