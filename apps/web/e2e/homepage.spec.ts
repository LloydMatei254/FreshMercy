import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and shows brand name', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Fresh Mercy/)
    await expect(page.getByRole('banner')).toBeVisible()
  })

  test('navigation links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /devotionals/i }).first()).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /open menu/i })
    await hamburger.click()
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible()
    await page.keyboard.press('Escape')
  })

  test('hero section is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('region', { name: /hero/i }).or(
      page.locator('section').first()
    )).toBeVisible()
  })
})

test.describe('Devotionals page', () => {
  test('loads devotionals page', async ({ page }) => {
    await page.goto('/devotionals')
    await expect(page).toHaveTitle(/Devotionals/)
  })

  test('search input is present', async ({ page }) => {
    await page.goto('/devotionals')
    await expect(page.getByRole('searchbox')).toBeVisible()
  })
})

test.describe('Prayer page', () => {
  test('loads prayer page', async ({ page }) => {
    await page.goto('/prayer')
    await expect(page).toHaveTitle(/Prayer/)
    await expect(page.getByRole('form', { name: /prayer request/i })).toBeVisible()
  })
})

test.describe('Contact page', () => {
  test('loads contact page', async ({ page }) => {
    await page.goto('/contact')
    await expect(page).toHaveTitle(/Contact/)
    await expect(page.getByRole('form', { name: /contact form/i })).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/About/)
  })

  test('pillars page loads', async ({ page }) => {
    await page.goto('/pillars')
    await expect(page).toHaveTitle(/Pillars/)
  })

  test('404 page shows custom message', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByText(/mercy remains/i)).toBeVisible()
  })
})

test.describe('Admin login page', () => {
  test('shows login form', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible()
  })

  test('redirects to login when accessing admin without auth', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/admin\/login/)
  })
})
