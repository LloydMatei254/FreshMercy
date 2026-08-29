import { describe, it, expect } from 'vitest'

// Test the email normalisation logic (no DB needed)
function normaliseEmail(email: string): string {
  return email.toLowerCase().trim()
}

// Test slug validity
function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

// Test password minimum requirements
function isStrongPassword(password: string): boolean {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
}

describe('Email normalisation', () => {
  it('lowercases email', () => {
    expect(normaliseEmail('Hello@FRESHMERCY.org')).toBe('hello@freshmercy.org')
  })

  it('trims whitespace', () => {
    expect(normaliseEmail('  hello@freshmercy.org  ')).toBe('hello@freshmercy.org')
  })
})

describe('Slug validation', () => {
  it('accepts valid slugs', () => {
    expect(isValidSlug('running-toward-the-prodigal')).toBe(true)
    expect(isValidSlug('great-is-thy-faithfulness')).toBe(true)
    expect(isValidSlug('test123')).toBe(true)
  })

  it('rejects invalid slugs', () => {
    expect(isValidSlug('Has Spaces')).toBe(false)
    expect(isValidSlug('UPPERCASE')).toBe(false)
    expect(isValidSlug('double--dash')).toBe(false)
    expect(isValidSlug('-leading-dash')).toBe(false)
  })
})

describe('Password strength', () => {
  it('rejects weak passwords', () => {
    expect(isStrongPassword('abc')).toBe(false)
    expect(isStrongPassword('alllowercase')).toBe(false)
    expect(isStrongPassword('NoNumbers')).toBe(false)
  })

  it('accepts strong passwords', () => {
    expect(isStrongPassword('Mercy2024!')).toBe(true)
    expect(isStrongPassword('FreshMercy1')).toBe(true)
  })
})
