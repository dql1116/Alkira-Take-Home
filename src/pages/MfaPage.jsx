import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormField } from '../components/FormFields';
import { validateOtp } from '../utils/validation';
import { MOCK_OTP } from '../data/mockUsers';

export function MfaPage() {
    const { stage, pendingEmail, verifyMfa } = useAuth();

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [resent, setResent] = useState(false);

    // Already passed MFA — forward to the dashboard instead of falling
    // through to the "invalid access" branch below.
    if (stage === 'authenticated') {
        return <Navigate to="/dashboard" replace />;
    }

    // Guard (edge case): cant be in /mfa without passing step 1
    if (stage !== 'mfa') {
        return <Navigate to='/login' replace/>;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationError = validateOtp(otp);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            verifyMfa(otp);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    }

    function handleResend() {
        setResent(true)
        setTimeout(() => setResent(false), 3000);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
                <h1 className="mb-1 text-xl font-semibold text-slate-900">
                    Verify it&apos;s you
                </h1>
                <p className="mb-6 text-sm text-slate-500">
                    We sent a 6-digit code to <span className="font-medium text-slate-700">{pendingEmail}</span>
                </p>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <FormField
                        label="Verification code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        value={otp}
                        error={error}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />

                    <button
                        type="submit"
                        className="mt-2 rounded-md bg-[#006DF0] py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0058C2] cursor-pointer"
                    >
                        Verify
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-slate-500">
                    <button
                        type="button"
                        onClick={handleResend}
                        className='text-[#006DF0] transition-colors duration-200 hover:text-[#0058C2] hover:underline cursor-pointer'
                    >
                        Resend code
                    </button>
                    {resent && <p className="mt-2 text-xs text-green-600">Code resent (demo code: {MOCK_OTP})</p>}
                </div>
            </div>
        </div>
    )
}
