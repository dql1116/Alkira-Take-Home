const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required.';
    }

    if (!EMAIL_REGEX.test(email)) {
        return 'Enter a valid email address.';
    }

    return null;
}

export function validatePassword(password) {
    if (!password) {
        return 'Password is required.';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters.';
    }

    return null;
}

export function validateOtp(otp) {
    if (!otp.trim()) {
        return 'Verification code is required.';
    }

    if (!/^\d{6}$/.test(otp)) {
        return 'Enter the 6-digit code.';
    }

    return null;
}