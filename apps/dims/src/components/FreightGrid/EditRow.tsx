import { useState } from "react"

const formStyle = {
    marginBottom: 20,
    color: '#000000',
}
const cancelStyle = {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 40
}

// TODO set as last grid row after map
export default function EditRow({ freight, setEditItemIsOpen, index, setSavedFreight, savedFreight }: any) {
    const [workingRow, setWorkingRow] = useState({ ...freight })

    return (
        <>
            <input type="text" name="name" style={formStyle}
                className="text-black-900"
                value={workingRow.name}
                onChange={event => setWorkingRow({ ...workingRow, name: event.target.value })}
            />
            <input type="number" name="quantity" style={formStyle}
                value={workingRow.quantity || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setWorkingRow({ ...workingRow, quantity: Number(event.target.value) })}
            />
            <input type="number" name="length" style={formStyle}
                value={workingRow.length || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setWorkingRow({ ...workingRow, length: Number(event.target.value) })}
            />
            <input type="number" name="width" style={formStyle}
                value={workingRow.width || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setWorkingRow({ ...workingRow, width: Number(event.target.value) })}
            />
            <input type="number" name="height" style={formStyle}
                value={workingRow.height || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setWorkingRow({ ...workingRow, height: Number(event.target.value) })}
            />
            <input type="number" name="weight" style={formStyle}
                value={workingRow.weight || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setWorkingRow({ ...workingRow, weight: Number(event.target.value) })}
            />
            {
                <button
                    onClick={() => {
                        const updatedFreightGrid = [...savedFreight]
                        updatedFreightGrid[index] = workingRow

                        setSavedFreight(updatedFreightGrid)
                        setEditItemIsOpen(false)
                    }}
                    style={cancelStyle}>
                    ✅
                </button>
            }
        </>
    )
}