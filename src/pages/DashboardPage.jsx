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

    if (!user) {
        return null;
    }

    const canEdit = user.role === 'read-write';

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                <div>
                    <h1 className="text-lg font-semibold text-slate-900">
                        CSX Dashboard
                    </h1>
                    <p className="text-sm text-slate-500">
                        Signed in as {user.name} &middot;{' '}
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                canEdit ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                            }`}
                        >
                            {canEdit ? 'Read/write' : 'Read-only'}
                        </span>
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                    Log out
                </button>
            </header>

            <main className="mx-auto max-w-2xl px-6 py-8">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-800">
                        Network segments
                    </h2>
                    {canEdit && (
                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                            + Add segment
                        </button>
                    )}
                </div>

                <ul className="divide-y rounded-lg border bg-white">
                    {SEGMENTS.map((segment) => (
                        <li key={segment.id} className="flex items-center justify-between px-4 py-3">
                            <div>
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
                                className={`rounded-md px-3 py-1 text-xs font-medium ${
                                    canEdit
                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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