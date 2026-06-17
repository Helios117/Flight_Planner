# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightoptima.spec.js >> Route Planner >> Flight Route panel shows From, To, Distance, Flight Time, Stops
- Location: flightoptima.spec.js:105:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=From')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=From')

```

```yaml
- banner:
  - heading "Flight Optima" [level=1]:
    - img
    - text: Flight Optima
  - navigation:
    - button "Route Planner":
      - img
      - text: Route Planner
    - button "Runway Scheduler":
      - img
      - text: Runway Scheduler
    - button "Pilot Scheduler":
      - img
      - text: Pilot Scheduler
    - button "Constrained Runways":
      - img
      - text: Constrained Runways
- main:
  - complementary:
    - heading "Route Planner" [level=2]:
      - img
      - text: Route Planner
    - text: Source Airport
    - combobox:
      - option "Select airport..."
      - option "AMS - Amsterdam Schiphol"
      - option "ATL - Hartsfield-Jackson Atlanta"
      - option "BOS - Boston Logan International"
      - option "CDG - Paris Charles de Gaulle"
      - option "DEN - Denver International"
      - option "DFW - Dallas/Fort Worth International"
      - option "DXB - Dubai International"
      - option "FCO - Rome Fiumicino"
      - option "FRA - Frankfurt Airport"
      - option "HND - Tokyo Haneda"
      - option "IST - Istanbul Airport"
      - option "JFK - John F. Kennedy International" [selected]
      - option "LAX - Los Angeles International"
      - option "LHR - London Heathrow"
      - option "MAD - Madrid Barajas"
      - option "MIA - Miami International"
      - option "ORD - Chicago O'Hare"
      - option "SEA - Seattle-Tacoma International"
      - option "SFO - San Francisco International"
      - option "SIN - Singapore Changi"
    - text: Destination Airport
    - combobox:
      - option "Select airport..."
      - option "AMS - Amsterdam Schiphol"
      - option "ATL - Hartsfield-Jackson Atlanta"
      - option "BOS - Boston Logan International"
      - option "CDG - Paris Charles de Gaulle"
      - option "DEN - Denver International"
      - option "DFW - Dallas/Fort Worth International"
      - option "DXB - Dubai International"
      - option "FCO - Rome Fiumicino"
      - option "FRA - Frankfurt Airport"
      - option "HND - Tokyo Haneda"
      - option "IST - Istanbul Airport"
      - option "JFK - John F. Kennedy International"
      - option "LAX - Los Angeles International"
      - option "LHR - London Heathrow" [selected]
      - option "MAD - Madrid Barajas"
      - option "MIA - Miami International"
      - option "ORD - Chicago O'Hare"
      - option "SEA - Seattle-Tacoma International"
      - option "SFO - San Francisco International"
      - option "SIN - Singapore Changi"
    - text: Cruising Speed (km/h)
    - spinbutton: "850"
    - button "Find Shortest Route":
      - img
      - text: Find Shortest Route
    - heading "Full Demo" [level=2]:
      - img
      - text: Full Demo
    - paragraph: Find route and simulate runway scheduling at destination
    - text: Other Flights at Destination
    - spinbutton: "12"
    - button "Run Full Demo":
      - img
      - text: Run Full Demo
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button
  - button "Zoom in"
  - button "Zoom out"
  - link "Leaflet":
    - /url: https://leafletjs.com
  - text: ©
  - link "CARTO":
    - /url: https://carto.com/
```

# Test source

```ts
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
  36  |     await expect(page.locator('text=Runway Scheduler')).toBeVisible();
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
> 106 |     await expect(page.locator('text=From')).toBeVisible();
      |                                             ^ Error: expect(locator).toBeVisible() failed
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
  137 |     await expect(page.locator('text=Runway Scheduler')).toBeVisible();
  138 |   });
  139 | 
  140 |   test('page does not crash on switching to Runway Scheduler', async ({ page }) => {
  141 |     await expect(page.locator('body')).not.toContainText('Error');
  142 |     await expect(page.locator('body')).not.toContainText('undefined');
  143 |   });
  144 | 
  145 | });
  146 | 
  147 | // ─────────────────────────────────────────────
  148 | // 4. PILOT SCHEDULER
  149 | // ─────────────────────────────────────────────
  150 | 
  151 | test.describe('Pilot Scheduler', () => {
  152 | 
  153 |   test.beforeEach(async ({ page }) => {
  154 |     await page.goto(BASE_URL);
  155 |     await page.getByRole('button', { name: /Pilot Scheduler/i }).click();
  156 |   });
  157 | 
  158 |   test('Pilot Scheduler panel loads', async ({ page }) => {
  159 |     await expect(page.locator('text=Pilot Scheduler')).toBeVisible();
  160 |   });
  161 | 
  162 |   test('page does not crash on switching to Pilot Scheduler', async ({ page }) => {
  163 |     await expect(page.locator('body')).not.toContainText('Error');
  164 |     await expect(page.locator('body')).not.toContainText('undefined');
  165 |   });
  166 | 
  167 | });
  168 | 
  169 | // ─────────────────────────────────────────────
  170 | // 5. CONSTRAINED RUNWAYS
  171 | // ─────────────────────────────────────────────
  172 | 
  173 | test.describe('Constrained Runways', () => {
  174 | 
  175 |   test.beforeEach(async ({ page }) => {
  176 |     await page.goto(BASE_URL);
  177 |     await page.getByRole('button', { name: /Constrained Runways/i }).click();
  178 |   });
  179 | 
  180 |   test('Constrained Runways panel loads', async ({ page }) => {
  181 |     await expect(page.locator('text=Constrained Runways')).toBeVisible();
  182 |   });
  183 | 
  184 |   test('page does not crash on switching to Constrained Runways', async ({ page }) => {
  185 |     await expect(page.locator('body')).not.toContainText('Error');
  186 |     await expect(page.locator('body')).not.toContainText('undefined');
  187 |   });
  188 | 
  189 | });
  190 | 
  191 | // ─────────────────────────────────────────────
  192 | // 6. UI & RESPONSIVENESS
  193 | // ─────────────────────────────────────────────
  194 | 
  195 | test.describe('UI & Responsiveness', () => {
  196 | 
  197 |   test('app renders on mobile viewport without horizontal overflow', async ({ page }) => {
  198 |     await page.setViewportSize({ width: 375, height: 812 });
  199 |     await page.goto(BASE_URL);
  200 |     const bodyWidth   = await page.evaluate(() => document.body.scrollWidth);
  201 |     const windowWidth = await page.evaluate(() => window.innerWidth);
  202 |     expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  203 |   });
  204 | 
  205 |   test('app renders on tablet viewport', async ({ page }) => {
  206 |     await page.setViewportSize({ width: 768, height: 1024 });
```