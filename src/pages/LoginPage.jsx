import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormField } from '../components/FormFields';
import { validateEmail, validatePassword } from '../utils/validation';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if(emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        try {
            login(email, password);
            setErrors({});
            navigate('/mfa');
        } catch (err) {
            setErrors({ form: err.message });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
                <h1 className="mb-2 text-xl text-center font-semibold text-slate-900">
                    Sign in
                </h1>
                <p className="mb-6 text-sm text-center text-slate-500">
                    Access your Alkira CSX dashboard.
                </p>

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
                        autoComplete="current-passwrod"
                        value={password}
                        error={errors.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.form && (
                        <p role="alert" className='text-sm text-red-600'>
                            {errors.form}
                        </p>
                    )}

                    <button 
                        type="submit"
                        className="mt-2 rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Continue
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}