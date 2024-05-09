export default function GridColumnHeaders({ savedFreight }: any) {
    return (
        <div className="grid grid-cols-7 gap-4 mt-8 mb-8 font-bold text-md">
            <div>Name</div>
            <div>Quantity</div>
            <div>Length (in)</div>
            <div>Width (in)</div>
            <div>Height (in)</div>
            <div>Weight (lbs) </div>
            <button
                className="from-green-200 dark:border-green-800 dark:bg-green-800/30"
                onClick={() => { navigator.clipboard.writeText(JSON.stringify(savedFreight)) }}
            >
                Copy Input&nbsp; 📋
            </button>
        </div>
    )
}