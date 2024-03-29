interface GridRowInput {
    freight: any
}

export default function GridRow({ freight }: GridRowInput) {
    return (
        <>
            <div
                className="font-bold">
                {`${freight.name}`}
            </div>
            <div>
                {`${freight.quantity}`}
            </div>
            <div>
                {`${freight.length} in`}
            </div>
            <div>
                {`${freight.width} in`}
            </div>
            <div>
                {`${freight.height} in`}
            </div>
            <div>
                {`${freight.weight} lbs`}
            </div>
        </>
    )

}