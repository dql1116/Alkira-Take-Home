import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const SEGMENTS = [
    {
        id: 1,
        name: 'Production VPC - us-west-2',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Staging VPC — eu-central-1',
        status: 'Active' 
    },
    {
        id: 3,
        name: 'Dev Sandbox — ap-south-1',
        status: 'Paused'
    }
];


export function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (!user) {
        return null;
    }

    const canEdit = user.role === 'read-write';

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
            {/* Mobile header and drawer */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:hidden">
                <img
                    src="/alkira-name-logo.png"
                    alt="Alkira"
                    className="h-8 w-auto px-2"
                />
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open navigation menu"
                    aria-expanded={mobileMenuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                >
                    <span className="flex flex-col gap-1.5">
                        <span className="block h-0.5 w-5 rounded-full bg-current" />
                        <span className="block h-0.5 w-5 rounded-full bg-current" />
                        <span className="block h-0.5 w-5 rounded-full bg-current" />
                    </span>
                </button>
            </header>

            {mobileMenuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
                />
            )}

            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col justify-between border-l border-slate-200 bg-white px-4 py-6 shadow-xl transition-transform duration-200 md:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div>
                    <div className="mb-8 flex items-center justify-between">
                        <img
                            src="/alkira-name-logo.png"
                            alt="Alkira"
                            className="h-8 w-auto px-2"
                        />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close navigation menu"
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-xl leading-none text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                        >
                            &times;
                        </button>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <span className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800">
                            Dashboard
                        </span>
                    </nav>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <div className="mb-3 flex flex-wrap items-center gap-y-2">
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <span
                            className={`mx-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                canEdit ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                            }`}
                        >
                            {canEdit ? 'Read/write' : 'Read-only'}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
                    >
                        Log out
                    </button>
                </div>
            </aside>

            {/* Desktop sidebar */}
            <aside className="hidden w-64 flex-col justify-between border-r border-slate-200 bg-white px-4 py-6 md:flex">
                <div>
                    <img
                        src="/alkira-name-logo.png"
                        alt="Alkira"
                        className="mb-8 h-8 w-auto px-2"
                    />
                    <nav className="flex flex-col gap-1">
                        <span className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800">
                            Dashboard
                        </span>
                    </nav>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <div className="mb-3 flex flex-wrap items-center gap-y-2">
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <span
                            className={`mx-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                canEdit ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                            }`}
                        >
                            {canEdit ? 'Read/write' : 'Read-only'}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
                    >
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-base font-semibold text-slate-800">
                        Network segments
                    </h2>
                    {canEdit && (
                        <button className="w-full rounded-md bg-[#006DF0] px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0058C2] cursor-pointer sm:w-auto">
                            + Add segment
                        </button>
                    )}
                </div>

                <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                    {SEGMENTS.map((segment) => (
                        <li key={segment.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800">
                                    {segment.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {segment.status}
                                </p>
                            </div>
                            <button
                                disabled={!canEdit}
                                title={!canEdit ? 'Read-only users cannot edit segments' : undefined}
                                className={`w-full rounded-md px-3 py-1 text-xs font-medium sm:w-auto ${
                                    canEdit
                                        ? 'cursor-pointer bg-slate-100 text-slate-700 transition-colors duration-200 hover:bg-slate-200'
                                        : 'cursor-not-allowed bg-slate-50 text-slate-300'
                                }`}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
