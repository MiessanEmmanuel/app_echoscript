export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-bg-indigo shadow-md focus:ring-bg-indigo p-2' +
                className
            }
        />
    );
}
