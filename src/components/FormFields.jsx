export function FormField({ label, error, id, ...inputProps }) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const errorId = `${fieldId}-error`;

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                id={fieldId}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500
                    ${error ? 'border-red-500' : 'border-slate-300'}
                `}
                {...inputProps}
            />
            {error && (
                <p id={errorId} role="alert" className="text-sm text-red-600">
                    {error}   
                </p>
            )}
        </div>
    )
}