# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightoptima.spec.js >> Page Load & Navigation >> clicking Runway Scheduler switches the view
- Location: flightoptima.spec.js:33:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Runway Scheduler')
Expected: visible
Error: strict mode violation: locator('text=Runway Scheduler') resolved to 2 elements:
    1) <button class="nav-btn active">…</button> aka getByRole('button', { name: 'Runway Scheduler' })
    2) <h2>…</h2> aka getByRole('heading', { name: 'Runway Scheduler' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Runway Scheduler')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Flight Optima" [level=1] [ref=e5]:
      - img [ref=e6]
      - text: Flight
      - generic [ref=e8]: Optima
    - navigation [ref=e9]:
      - button "Route Planner" [ref=e10] [cursor=pointer]:
        - img [ref=e11]
        - text: Route Planner
      - button "Runway Scheduler" [active] [ref=e15] [cursor=pointer]:
        - img [ref=e16]
        - text: Runway Scheduler
      - button "Pilot Scheduler" [ref=e18] [cursor=pointer]:
        - img [ref=e19]
        - text: Pilot Scheduler
      - button "Constrained Runways" [ref=e24] [cursor=pointer]:
        - img [ref=e25]
        - text: Constrained Runways
  - main [ref=e29]:
    - complementary [ref=e30]:
      - generic [ref=e31]:
        - heading "Multi-Day Flight Generator" [level=2] [ref=e32]:
          - img [ref=e33]
          - text: Multi-Day Flight Generator
        - generic [ref=e35]:
          - generic [ref=e36]: Destination Airport
          - combobox [ref=e37]:
            - option "Select airport..." [selected]
        - generic [ref=e38]:
          - generic [ref=e39]: "Number of Days: 3"
          - slider [ref=e40]: "3"
        - generic [ref=e41]:
          - generic [ref=e42]: "Flights per Day: ~12"
          - slider [ref=e43]: "12"
        - generic [ref=e44]:
          - generic [ref=e45]: Flight Pattern
          - combobox [ref=e46]:
            - option "Realistic (Peak Hours)" [selected]
            - option "Heavy Peak Hours"
            - option "Uniform Distribution"
            - option "Random"
        - button "Generate Multi-Day Flights" [ref=e47] [cursor=pointer]:
          - img [ref=e48]
          - text: Generate Multi-Day Flights
      - generic [ref=e53]:
        - heading "Runway Scheduler" [level=2] [ref=e54]:
          - img [ref=e55]
          - text: Runway Scheduler
        - generic [ref=e59]:
          - generic [ref=e60]: Algorithm
          - combobox [ref=e61]:
            - option "DSatur (Recommended)" [selected]
            - option "Welsh-Powell"
            - option "Greedy"
        - button "Generate Flights First" [disabled] [ref=e62]:
          - img [ref=e63]
          - text: Generate Flights First
    - paragraph [ref=e68]: Generate flights to see runway scheduling visualization
```

# Test source

```ts
  1   | // FlightOptima – Playwright Test Suite (updated to match actual UI)
  2   | // Run: npx playwright test flightoptima.spec.js --headed
  3   | 
  4   | const { test, expect } = require('@playwright/test');
  5   | 
  6   | const BASE_URL = 'http://localhost:3000';
  7   | 
  8   | // ─────────────────────────────────────────────
  9   | // 1. PAGE LOAD & NAVIGATION
  10  | // ─────────────────────────────────────────────
  11  | 
  12  | test.describe('Page Load & Navigation', () => {
  13  | 
  14  |   test('homepage loads with Flight Optima branding', async ({ page }) => {
  15  |     await page.goto(BASE_URL);
  16  |     await expect(page.locator('text=Flight').first()).toBeVisible();
  17  |   });
  18  | 
  19  |   test('all 4 nav buttons are visible', async ({ page }) => {
  20  |     await page.goto(BASE_URL);
  21  |     await expect(page.getByRole('button', { name: /Route Planner/i })).toBeVisible();
  22  |     await expect(page.getByRole('button', { name: /Runway Scheduler/i })).toBeVisible();
  23  |     await expect(page.getByRole('button', { name: /Pilot Scheduler/i })).toBeVisible();
  24  |     await expect(page.getByRole('button', { name: /Constrained Runways/i })).toBeVisible();
  25  |   });
  26  | 
  27  |   test('Route Planner is active by default', async ({ page }) => {
  28  |     await page.goto(BASE_URL);
  29  |     await expect(page.locator('text=Route Planner').first()).toBeVisible();
  30  |     await expect(page.locator('text=Source Airport')).toBeVisible();
  31  |   });
  32  | 
  33  |   test('clicking Runway Scheduler switches the view', async ({ page }) => {
  34  |     await page.goto(BASE_URL);
  35  |     await page.getByRole('button', { name: /Runway Scheduler/i }).click();
> 36  |     await expect(page.locator('text=Runway Scheduler')).toBeVisible();
      |                                                         ^ Error: expect(locator).toBeVisible() failed
  37  |   });
  38  | 
  39  |   test('clicking Pilot Scheduler switches the view', async ({ page }) => {
  40  |     await page.goto(BASE_URL);
  41  |     await page.getByRole('button', { name: /Pilot Scheduler/i }).click();
  42  |     await expect(page.locator('text=Pilot Scheduler')).toBeVisible();
  43  |   });
  44  | 
  45  |   test('clicking Constrained Runways switches the view', async ({ page }) => {
  46  |     await page.goto(BASE_URL);
  47  |     await page.getByRole('button', { name: /Constrained Runways/i }).click();
  48  |     await expect(page.locator('text=Constrained Runways')).toBeVisible();
  49  |   });
  50  | 
  51  | });
  52  | 
  53  | // ─────────────────────────────────────────────
  54  | // 2. ROUTE PLANNER — DROPDOWNS & FORM
  55  | // ─────────────────────────────────────────────
  56  | 
  57  | test.describe('Route Planner', () => {
  58  | 
  59  |   test.beforeEach(async ({ page }) => {
  60  |     await page.goto(BASE_URL);
  61  |     await page.getByRole('button', { name: /Route Planner/i }).click();
  62  |   });
  63  | 
  64  |   test('Source Airport dropdown is visible', async ({ page }) => {
  65  |     await expect(page.locator('text=Source Airport')).toBeVisible();
  66  |     await expect(page.locator('select').first()).toBeVisible();
  67  |   });
  68  | 
  69  |   test('Destination Airport dropdown is visible', async ({ page }) => {
  70  |     await expect(page.locator('text=Destination Airport')).toBeVisible();
  71  |     await expect(page.locator('select').nth(1)).toBeVisible();
  72  |   });
  73  | 
  74  |   test('Cruising Speed input is present with default value', async ({ page }) => {
  75  |     const speedInput = page.locator('input[type="number"], input[value="850"]').first();
  76  |     await expect(speedInput).toBeVisible();
  77  |   });
  78  | 
  79  |   test('Find Shortest Route button is visible and clickable', async ({ page }) => {
  80  |     const btn = page.getByRole('button', { name: /Find Shortest Route/i });
  81  |     await expect(btn).toBeVisible();
  82  |     await expect(btn).toBeEnabled();
  83  |   });
  84  | 
  85  |   test('selecting source ATL shows it in dropdown', async ({ page }) => {
  86  |     const sourceSelect = page.locator('select').first();
  87  |     await sourceSelect.selectOption({ label: /ATL/i });
  88  |     const selected = await sourceSelect.inputValue();
  89  |     expect(selected).toBeTruthy();
  90  |   });
  91  | 
  92  |   test('selecting different source and destination and clicking Find Shortest Route shows result', async ({ page }) => {
  93  |     const sourceSelect = page.locator('select').first();
  94  |     const destSelect   = page.locator('select').nth(1);
  95  | 
  96  |     await sourceSelect.selectOption({ index: 0 });
  97  |     await destSelect.selectOption({ index: 2 });
  98  |     await page.getByRole('button', { name: /Find Shortest Route/i }).click();
  99  | 
  100 |     // Flight Route card should show Distance and Flight Time
  101 |     await expect(page.locator('text=Distance').first()).toBeVisible({ timeout: 6000 });
  102 |     await expect(page.locator('text=Flight Time').first()).toBeVisible({ timeout: 6000 });
  103 |   });
  104 | 
  105 |   test('Flight Route panel shows From, To, Distance, Flight Time, Stops', async ({ page }) => {
  106 |     await expect(page.locator('text=From')).toBeVisible();
  107 |     await expect(page.locator('text=To')).toBeVisible();
  108 |     await expect(page.locator('text=Distance')).toBeVisible();
  109 |     await expect(page.locator('text=Flight Time')).toBeVisible();
  110 |     await expect(page.locator('text=Stops')).toBeVisible();
  111 |   });
  112 | 
  113 |   test('map is rendered on the page', async ({ page }) => {
  114 |     // Leaflet map container
  115 |     const map = page.locator('.leaflet-container, [class*="map"]').first();
  116 |     await expect(map).toBeVisible();
  117 |   });
  118 | 
  119 |   test('Full Demo section is visible', async ({ page }) => {
  120 |     await expect(page.locator('text=Full Demo')).toBeVisible();
  121 |   });
  122 | 
  123 | });
  124 | 
  125 | // ─────────────────────────────────────────────
  126 | // 3. RUNWAY SCHEDULER
  127 | // ─────────────────────────────────────────────
  128 | 
  129 | test.describe('Runway Scheduler', () => {
  130 | 
  131 |   test.beforeEach(async ({ page }) => {
  132 |     await page.goto(BASE_URL);
  133 |     await page.getByRole('button', { name: /Runway Scheduler/i }).click();
  134 |   });
  135 | 
  136 |   test('Runway Scheduler panel loads', async ({ page }) => {
```