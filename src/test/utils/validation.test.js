import { validateEmail, validatePassword, validateOtp } from '../../utils/validation';

describe('validateEmail', () => {
    it('returns an error for an empty string', () => {
        expect(validateEmail('')).toBe('Email is required.');
    });

    it('returns an error for a string missing an @', () => {
        expect(validateEmail('notanemail')).toBe('Enter a valid email address.');
    });

    it('returns an error for a string missing a domain', () => {
        expect(validateEmail('a@b')).toBe('Enter a valid email address.');
    });

    it('returns null for a valid email', () => {
        expect(validateEmail('a@b.com')).toBeNull();
    });
});

describe('validatePassword', () => {
    it('returns an error for an empty string', () => {
        expect(validatePassword('')).toBe('Password is required.');
    });

    it('returns an error for a password under 8 characters', () => {
        expect(validatePassword('abc')).toBe('Password must be at least 8 characters.');
    });

    it('returns null for a valid password', () => {
        expect(validatePassword('Password123!')).toBeNull();
    });
});

describe('validateOtp', () => {
    it('returns an error for an empty string', () => {
        expect(validateOtp('')).toBe('Verification code is required.');
    });

    it('returns an error for the wrong length', () => {
        expect(validateOtp('123')).toBe('Enter the 6-digit code.');
    });

    it('returns an error when it contains non-digit characters', () => {
        expect(validateOtp('12345a')).toBe('Enter the 6-digit code.');
    });

    it('returns null for a valid 6-digit code', () => {
        expect(validateOtp('123456')).toBeNull();
    });
});