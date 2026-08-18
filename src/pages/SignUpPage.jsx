import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../components/FormFields';
import { validateEmail, validatePassword } from '../utils/validation';

export function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        // No real backend/registration as defined in the scope
        setErrors({});
        setSubmitted(true);
        setTimeout(() => navigate('/login'), 1200);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
                <h1 className="mb-2 text-xl font-semibold text-center text-slate-900">
                    Create an account
                </h1>
                <p className="mb-6 text-sm text-center text-slate-500">
                    Demo sign-up screen - no account is actually created. Use the mock credentials from the README to login.
                </p>

                {submitted ? (
                    <p role="status" className="text-sm text-green-600">
                        Thanks! Redirecting you to sign in&hellip;
                    </p>
                ): (
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        <FormField
                            label="Email"
                            type="email"
                            autoComplete="username"
                            value={email}
                            error={errors.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormField
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            error={errors.password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="mt-2 rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Sign up
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}