# Seed API JSON Input Guide

All seed APIs now accept JSON input from the request body. If JSON is not provided, they fall back to reading from files (backward compatible).

## API Endpoints

All endpoints accept `POST` requests with `Content-Type: application/json`.

### 1. Categories
**Endpoint:** `POST /api/populate/categories`

**Request Body:**
```json
{
  "categories": [
    {
      "name": "Insights",
      "slug": "insights",
      "description": "Expert analysis and insights",
      "order": 1,
      "enabled": true,
      "contentType": "articles"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/categories \
  -H "Content-Type: application/json" \
  -d '{"categories": [{"name": "Test", "slug": "test", "description": "Test", "order": 1, "enabled": true}]}'
```

---

### 2. Homepage Sections
**Endpoint:** `POST /api/populate/homepage-sections`

**Request Body:**
```json
{
  "sectionTypes": ["grid", "grid-with-date", "news"],
  "categoryTypeOverrides": {
    "insights": "grid",
    "latest-news": "news"
  },
  "sectionDefaults": {
    "buttonText": "view all",
    "enabled": true,
    "itemsToShow": 5
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/homepage-sections \
  -H "Content-Type: application/json" \
  -d '{"sectionTypes": ["grid", "news"], "sectionDefaults": {"buttonText": "View More", "enabled": true, "itemsToShow": 6}}'
```

---

### 3. Articles
**Endpoint:** `POST /api/populate/articles`

**Request Body:**
```json
{
  "articles": {
    "insights": [
      {
        "title": "Article Title",
        "slug": "article-slug",
        "content": "<p>Article content...</p>",
        "excerpt": "Article excerpt",
        "author": "admin",
        "publishedDate": "2026-01-07",
        "premium": false,
        "views": 0,
        "tags": ["tag1", "tag2"]
      }
    ],
    "latest-news": [
      {
        "title": "News Article",
        "slug": "news-article",
        "content": "<p>Content...</p>",
        "excerpt": "Excerpt",
        "author": "admin",
        "publishedDate": "2026-01-07"
      }
    ]
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/articles \
  -H "Content-Type: application/json" \
  -d '{"articles": {"insights": [{"title": "Test", "slug": "test", "content": "Content", "excerpt": "Excerpt", "author": "admin", "publishedDate": "2026-01-07"}]}}'
```

---

### 4. Calculators
**Endpoint:** `POST /api/populate/calculators`

**Request Body:**
```json
{
  "calculators": [
    {
      "title": "SIP Calculator",
      "slug": "sip-calculator",
      "excerpt": "Calculate SIP returns",
      "calculatorCategory": "finance",
      "calculatorType": "sip",
      "icon": "fa-line-chart",
      "iconColor": "#4CAF50",
      "order": 1,
      "isFeatured": true,
      "isPopular": true,
      "metaTitle": "SIP Calculator",
      "metaDescription": "Calculate your SIP returns",
      "description": "SIP calculator description",
      "howToUse": "How to use instructions",
      "formulaExplanation": "Formula explanation",
      "disclaimer": "Disclaimer text",
      "faqs": [
        {
          "question": "What is SIP?",
          "answer": "SIP is Systematic Investment Plan"
        }
      ]
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/calculators \
  -H "Content-Type: application/json" \
  -d '{"calculators": [{"title": "Test Calc", "slug": "test-calc", "excerpt": "Test", "calculatorCategory": "finance", "calculatorType": "sip", "icon": "fa-calculator", "iconColor": "#000", "order": 1, "isFeatured": false, "isPopular": false, "metaTitle": "Test", "metaDescription": "Test", "description": "Test", "howToUse": "Test", "formulaExplanation": "Test", "disclaimer": "Test", "faqs": []}]}'
```

---

### 5. Tags
**Endpoint:** `POST /api/populate/tags`

**Request Body:**
```json
{
  "tags": [
    {
      "name": "Stock Market",
      "slug": "stock-market",
      "description": "Stock market news",
      "tagGroupSlug": "market-indices",
      "similarTagSlugs": ["equity-market"],
      "relatedTagSlugs": ["sensex", "nifty-50"]
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/tags \
  -H "Content-Type: application/json" \
  -d '{"tags": [{"name": "Test Tag", "slug": "test-tag", "description": "Test", "tagGroupSlug": "market-indices"}]}'
```

---

### 6. Tag Groups
**Endpoint:** `POST /api/populate/tag-groups`

**Request Body:**
```json
{
  "tagGroups": [
    {
      "name": "Market & Indices",
      "slug": "market-indices",
      "description": "Stock market indices",
      "order": 1
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/tag-groups \
  -H "Content-Type: application/json" \
  -d '{"tagGroups": [{"name": "Test Group", "slug": "test-group", "description": "Test", "order": 1}]}'
```

---

### 7. Tags with Groups
**Endpoint:** `POST /api/populate/tags-with-groups`

**Request Body:**
```json
{
  "tagGroups": [
    {
      "name": "Market & Indices",
      "slug": "market-indices",
      "description": "Stock market indices",
      "order": 1
    }
  ],
  "tags": [
    {
      "name": "Stock Market",
      "slug": "stock-market",
      "description": "Stock market news",
      "tagGroupSlug": "market-indices"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/tags-with-groups \
  -H "Content-Type: application/json" \
  -d '{"tagGroups": [{"name": "Test Group", "slug": "test-group", "order": 1}], "tags": [{"name": "Test Tag", "slug": "test-tag", "tagGroupSlug": "test-group"}]}'
```

---

### 8. Static Pages
**Endpoint:** `POST /api/populate/static-pages`

**Request Body:**
```json
{
  "staticPages": [
    {
      "title": "Privacy Policy",
      "slug": "privacy-policy",
      "content": "<h1>Privacy Policy</h1><p>Content...</p>",
      "excerpt": "Privacy policy excerpt",
      "metaTitle": "Privacy Policy",
      "metaDescription": "Privacy policy description",
      "showInFooter": true,
      "footerOrder": 1,
      "pageType": "legal"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/static-pages \
  -H "Content-Type: application/json" \
  -d '{"staticPages": [{"title": "Test Page", "slug": "test-page", "content": "Content", "showInFooter": false, "footerOrder": 1, "pageType": "general"}]}'
```

---

### 9. Rate Data (Already Supported)
**Endpoint:** `POST /api/populate/rate-data`

**Request Body:**
```json
{
  "metals": [
    {
      "name": "Gold",
      "slug": "gold",
      "description": "Gold description"
    }
  ],
  "countries": [
    {
      "name": "India",
      "code": "IN",
      "currency": "INR"
    }
  ],
  "states": [
    {
      "name": "Maharashtra",
      "code": "MH",
      "country": "India"
    }
  ],
  "cities": [
    {
      "name": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:1337/api/populate/rate-data \
  -H "Content-Type: application/json" \
  -d '{"metals": [{"name": "Gold", "slug": "gold", "description": "Gold"}], "countries": [{"name": "India", "code": "IN", "currency": "INR"}]}'
```

---

### 10. All Data
**Endpoint:** `POST /api/populate/all`

**Request Body:**
```json
{
  "categories": [...],
  "sectionTypes": ["grid", "news"],
  "categoryTypeOverrides": {...},
  "sectionDefaults": {...}
}
```

---

## Response Format

All endpoints return a response in this format:

```json
{
  "success": true,
  "message": "Data seeded successfully",
  "data": {
    "created": 5,
    "updated": 2,
    "errors": 0,
    "total": 7
  },
  "dataSource": "request body"
}
```

The `dataSource` field indicates whether data came from the request body (`"request body"`) or from files (`"file"`).

---

## Backward Compatibility

All APIs maintain backward compatibility:
- If JSON is **not provided** in the request body, they will use data from files (existing behavior)
- If JSON **is provided**, they will use the JSON data instead

---

## Notes

1. **Articles**: The articles API expects a nested structure where keys are category slugs and values are arrays of articles
2. **Tags**: Tags must reference tag groups by slug (`tagGroupSlug`). Make sure tag groups exist before seeding tags
3. **Homepage Sections**: This API uses categories from the database. Make sure categories exist before seeding homepage sections
4. **Calculators**: Calculators will be linked to the "calculators" category if it exists
