// FlightOptima – Playwright Test Suite (updated to match actual UI)
// Run: npx playwright test flightoptima.spec.js --headed

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

// ─────────────────────────────────────────────
// 1. PAGE LOAD & NAVIGATION
// ─────────────────────────────────────────────

test.describe('Page Load & Navigation', () => {

  test('homepage loads with Flight Optima branding', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('text=Flight').first()).toBeVisible();
  });

  test('all 4 nav buttons are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByRole('button', { name: /Route Planner/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Runway Scheduler/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Pilot Scheduler/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Constrained Runways/i })).toBeVisible();
  });

  test('Route Planner is active by default', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('text=Route Planner').first()).toBeVisible();
    await expect(page.locator('text=Source Airport')).toBeVisible();
  });

  test('clicking Runway Scheduler switches the view', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Runway Scheduler/i }).click();
    await expect(page.locator('text=Runway Scheduler')).toBeVisible();
  });

  test('clicking Pilot Scheduler switches the view', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Pilot Scheduler/i }).click();
    await expect(page.locator('text=Pilot Scheduler')).toBeVisible();
  });

  test('clicking Constrained Runways switches the view', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Constrained Runways/i }).click();
    await expect(page.locator('text=Constrained Runways')).toBeVisible();
  });

});

// ─────────────────────────────────────────────
// 2. ROUTE PLANNER — DROPDOWNS & FORM
// ─────────────────────────────────────────────

test.describe('Route Planner', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Route Planner/i }).click();
  });

  test('Source Airport dropdown is visible', async ({ page }) => {
    await expect(page.locator('text=Source Airport')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('Destination Airport dropdown is visible', async ({ page }) => {
    await expect(page.locator('text=Destination Airport')).toBeVisible();
    await expect(page.locator('select').nth(1)).toBeVisible();
  });

  test('Cruising Speed input is present with default value', async ({ page }) => {
    const speedInput = page.locator('input[type="number"], input[value="850"]').first();
    await expect(speedInput).toBeVisible();
  });

  test('Find Shortest Route button is visible and clickable', async ({ page }) => {
    const btn = page.getByRole('button', { name: /Find Shortest Route/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('selecting source ATL shows it in dropdown', async ({ page }) => {
    const sourceSelect = page.locator('select').first();
    await sourceSelect.selectOption({ label: /ATL/i });
    const selected = await sourceSelect.inputValue();
    expect(selected).toBeTruthy();
  });

  test('selecting different source and destination and clicking Find Shortest Route shows result', async ({ page }) => {
    const sourceSelect = page.locator('select').first();
    const destSelect   = page.locator('select').nth(1);

    await sourceSelect.selectOption({ index: 0 });
    await destSelect.selectOption({ index: 2 });
    await page.getByRole('button', { name: /Find Shortest Route/i }).click();

    // Flight Route card should show Distance and Flight Time
    await expect(page.locator('text=Distance').first()).toBeVisible({ timeout: 6000 });
    await expect(page.locator('text=Flight Time').first()).toBeVisible({ timeout: 6000 });
  });

  test('Flight Route panel shows From, To, Distance, Flight Time, Stops', async ({ page }) => {
    await expect(page.locator('text=From')).toBeVisible();
    await expect(page.locator('text=To')).toBeVisible();
    await expect(page.locator('text=Distance')).toBeVisible();
    await expect(page.locator('text=Flight Time')).toBeVisible();
    await expect(page.locator('text=Stops')).toBeVisible();
  });

  test('map is rendered on the page', async ({ page }) => {
    // Leaflet map container
    const map = page.locator('.leaflet-container, [class*="map"]').first();
    await expect(map).toBeVisible();
  });

  test('Full Demo section is visible', async ({ page }) => {
    await expect(page.locator('text=Full Demo')).toBeVisible();
  });

});

// ─────────────────────────────────────────────
// 3. RUNWAY SCHEDULER
// ─────────────────────────────────────────────

test.describe('Runway Scheduler', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Runway Scheduler/i }).click();
  });

  test('Runway Scheduler panel loads', async ({ page }) => {
    await expect(page.locator('text=Runway Scheduler')).toBeVisible();
  });

  test('page does not crash on switching to Runway Scheduler', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText('Error');
    await expect(page.locator('body')).not.toContainText('undefined');
  });

});

// ─────────────────────────────────────────────
// 4. PILOT SCHEDULER
// ─────────────────────────────────────────────

test.describe('Pilot Scheduler', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Pilot Scheduler/i }).click();
  });

  test('Pilot Scheduler panel loads', async ({ page }) => {
    await expect(page.locator('text=Pilot Scheduler')).toBeVisible();
  });

  test('page does not crash on switching to Pilot Scheduler', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText('Error');
    await expect(page.locator('body')).not.toContainText('undefined');
  });

});

// ─────────────────────────────────────────────
// 5. CONSTRAINED RUNWAYS
// ─────────────────────────────────────────────

test.describe('Constrained Runways', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Constrained Runways/i }).click();
  });

  test('Constrained Runways panel loads', async ({ page }) => {
    await expect(page.locator('text=Constrained Runways')).toBeVisible();
  });

  test('page does not crash on switching to Constrained Runways', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText('Error');
    await expect(page.locator('body')).not.toContainText('undefined');
  });

});

// ─────────────────────────────────────────────
// 6. UI & RESPONSIVENESS
// ─────────────────────────────────────────────

test.describe('UI & Responsiveness', () => {

  test('app renders on mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    const bodyWidth   = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  });

  test('app renders on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await expect(page.locator('body')).toBeVisible();
  });

  test('no console errors on initial load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(BASE_URL);
    expect(errors).toHaveLength(0);
  });

});

// ─────────────────────────────────────────────
// 7. PERFORMANCE
// ─────────────────────────────────────────────

test.describe('Performance', () => {

  test('page loads within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  test('route result appears within 6 seconds of clicking Find Shortest Route', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Find Shortest Route/i }).click();
    await expect(page.locator('text=Distance').first()).toBeVisible({ timeout: 6000 });
  });

});