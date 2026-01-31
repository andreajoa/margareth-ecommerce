# 🛍️ SHOPIFY BACKEND CONFIGURATION

## Required Menu Setup

### Menu Handle: `main-menu`

**CRITICAL**: The menu handle MUST be exactly `main-menu` (lowercase, hyphen-separated)

---

## Menu Structure in Shopify Admin

### Navigation Path:
Shopify Admin → **Online Store** → **Navigation** → **Add menu**

### Menu Configuration:

#### Title: Main Navigation
#### Handle: `main-menu`

---

## Menu Items to Add:

### 1. HOME PAGE
- **Link**: `/`
- **Type**: Link

### 2. BY CATEGORY
- **Link**: Can be a collection or page
- **Type**: Collection/Page
- **Dropdown**: Add subcategories if needed

### 3. BY GENDER
- **Link**: Collection
- **Type**: Collection
- **Dropdown Options**:
  - Men's Watches
  - Women's Watches
  - Unisex Watches

### 4. 📖 WATCH GUIDES
- **Link**: Page or Blog
- **Type**: Page
- **Description**: Educational content about watches

### 5. BY BRANDS
- **Link**: Collection
- **Type**: Collection
- **Dropdown**: List of watch brands

### 6. BY STYLE
- **Link**: Collection
- **Type**: Collection
- **Dropdown Options**:
  - Casual
  - Dress
  - Sport
  - Luxury
  - Fashion

### 7. BY PRICE
- **Link**: Collection
- **Type**: Collection
- **Dropdown Options**:
  - Under $100
  - $100 - $500
  - $500 - $1000
  - Over $1000

### 8. SUPPORT
- **Link**: `/pages/support` or contact page
- **Type**: Page

### 9. OUR STORY
- **Link**: `/pages/about` or company info page
- **Type**: Page

---

## GraphQL Query Used

The application fetches the menu using:

```graphql
query MainMenu($handle: String!) {
  menu(handle: $handle) {
    id
    items {
      id
      title
      url
      type
      items {
        id
        title
        url
        type
      }
    }
  }
}
```

Variables: `{ handle: "main-menu" }`

---

## Menu Item Types

1. **FRONTPAGE** - Links to homepage
2. **COLLECTION** - Links to a product collection
3. **CATALOG** - Links to all products
4. **PAGE** - Links to a custom page
5. **BLOG** - Links to blog
6. **ARTICLE** - Links to blog post
7. **HTTP** - External link

---

## Testing the Menu

After creating the menu in Shopify:

1. **Save the menu**
2. **Test in Shopify preview** (if using theme)
3. **Deploy Hydrogen app** to Oxygen
4. **Verify menu loads** on live site

---

## Alternative Menu Handles

If you need multiple menus:

- **Main navigation**: `main-menu`
- **Footer navigation**: `footer`
- **Mobile menu**: `mobile-menu`
- **Sidebar menu**: `sidebar-menu`

Update the loader query variable to fetch different menus:

```javascript
const {menu: mainMenu} = await storefront.query(MAIN_MENU_QUERY, {
  variables: {handle: 'main-menu'} // Change handle here
});
```

---

## Shopify Admin URL

Access your navigation settings:
`https://uxst0j-qe.myshopify.com/admin/menus`

---

## Common Issues

### Issue: Menu not appearing
**Check**:
1. Menu handle is exactly `main-menu`
2. Menu has at least one item
3. Menu items have valid URLs
4. Storefront API permissions enabled

### Issue: 404 errors on menu links
**Check**:
1. Collections/Pages exist in Shopify
2. URLs are correctly formatted
3. Items are published and visible

### Issue: Dropdown not working
**Check**:
1. Sub-items are properly nested
2. Parent item has children in GraphQL response
3. Frontend dropdown component implemented

---

## API Permissions

Ensure your Storefront API has:
- ✅ `Read products, variants, and collections`
- ✅ `Read all online store pages and blog posts`
- ✅ `Read navigation menus`

Check at:
`Settings → Apps and sales channels → Develop apps → [Your App] → API access`

---

**Last Updated**: January 31, 2026
**Store**: uxst0j-qe.myshopify.com
**API Version**: 2024-10

