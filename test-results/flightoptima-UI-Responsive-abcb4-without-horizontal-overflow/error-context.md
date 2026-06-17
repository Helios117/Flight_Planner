# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightoptima.spec.js >> UI & Responsiveness >> app renders on mobile viewport without horizontal overflow
- Location: flightoptima.spec.js:197:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 380
Received:    751
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
      - button "Runway Scheduler" [ref=e15] [cursor=pointer]:
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
        - heading "Route Planner" [level=2] [ref=e32]:
          - img [ref=e33]
          - text: Route Planner
        - generic [ref=e36]:
          - generic [ref=e37]: Source Airport
          - combobox [ref=e38]:
            - option "Select airport..." [selected]
        - generic [ref=e39]:
          - generic [ref=e40]: Destination Airport
          - combobox [ref=e41]:
            - option "Select airport..." [selected]
        - generic [ref=e42]:
          - generic [ref=e43]: Cruising Speed (km/h)
          - spinbutton [ref=e44]: "850"
        - button "Find Shortest Route" [ref=e45] [cursor=pointer]:
          - img [ref=e46]
          - text: Find Shortest Route
      - generic [ref=e50]:
        - heading "Full Demo" [level=2] [ref=e51]:
          - img [ref=e52]
          - text: Full Demo
        - paragraph [ref=e54]: Find route and simulate runway scheduling at destination
        - generic [ref=e55]:
          - generic [ref=e56]: Other Flights at Destination
          - spinbutton [ref=e57]: "12"
        - button "Run Full Demo" [ref=e58] [cursor=pointer]:
          - img [ref=e59]
          - text: Run Full Demo
    - generic [ref=e61]:
      - generic:
        - generic:
          - generic [ref=e62]:
            - button "Zoom in" [disabled] [ref=e63]: +
            - button "Zoom out" [ref=e64] [cursor=pointer]: −
          - generic [ref=e65]:
            - link "Leaflet" [ref=e66] [cursor=pointer]:
              - /url: https://leafletjs.com
              - img [ref=e67]
              - text: Leaflet
            - text: "| ©"
            - link "CARTO" [ref=e71] [cursor=pointer]:
              - /url: https://carto.com/
```

# Test source

```ts
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
> 202 |     expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
      |                       ^ Error: expect(received).toBeLessThanOrEqual(expected)
  203 |   });
  204 | 
  205 |   test('app renders on tablet viewport', async ({ page }) => {
  206 |     await page.setViewportSize({ width: 768, height: 1024 });
  207 |     await page.goto(BASE_URL);
  208 |     await expect(page.locator('body')).toBeVisible();
  209 |   });
  210 | 
  211 |   test('no console errors on initial load', async ({ page }) => {
  212 |     const errors = [];
  213 |     page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  214 |     await page.goto(BASE_URL);
  215 |     expect(errors).toHaveLength(0);
  216 |   });
  217 | 
  218 | });
  219 | 
  220 | // ─────────────────────────────────────────────
  221 | // 7. PERFORMANCE
  222 | // ─────────────────────────────────────────────
  223 | 
  224 | test.describe('Performance', () => {
  225 | 
  226 |   test('page loads within 5 seconds', async ({ page }) => {
  227 |     const start = Date.now();
  228 |     await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  229 |     const elapsed = Date.now() - start;
  230 |     expect(elapsed).toBeLessThan(5000);
  231 |   });
  232 | 
  233 |   test('route result appears within 6 seconds of clicking Find Shortest Route', async ({ page }) => {
  234 |     await page.goto(BASE_URL);
  235 |     await page.getByRole('button', { name: /Find Shortest Route/i }).click();
  236 |     await expect(page.locator('text=Distance').first()).toBeVisible({ timeout: 6000 });
  237 |   });
  238 | 
  239 | });
```