const formStyle = {
    marginBottom: 20,
    color: '#000000',
}
const saveStyle = {
    marginBottom: 20,
    fontSize: 20
}
const cancelStyle = {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 40
}


export default function InputRow({ activeFreight, setActiveFreight, addFreightMenuOpen, saveFreight, clearActiveFreight, setAddFreightMenuOpen }: any) {
    return (
        <div className="grid grid-cols-7 gap-4 mb-5">
            <input type="text" name="name" style={formStyle}
                className="text-black-900"
                value={activeFreight.name}
                onChange={event => setActiveFreight({ ...activeFreight, name: event.target.value })}
            />
            <input type="number" name="quantity" style={formStyle}
                value={activeFreight.quantity || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setActiveFreight({ ...activeFreight, quantity: Number(event.target.value) })}
            />
            <input type="number" name="length" style={formStyle}
                value={activeFreight.length || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setActiveFreight({ ...activeFreight, length: Number(event.target.value) })}
            />
            <input type="number" name="width" style={formStyle}
                value={activeFreight.width || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setActiveFreight({ ...activeFreight, width: Number(event.target.value) })}
            />
            <input type="number" name="height" style={formStyle}
                value={activeFreight.height || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setActiveFreight({ ...activeFreight, height: Number(event.target.value) })}
            />
            <input type="number" name="weight" style={formStyle}
                value={activeFreight.weight || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setActiveFreight({ ...activeFreight, weight: Number(event.target.value) })}
            />
            {
                addFreightMenuOpen &&
                    activeFreight.name &&
                    activeFreight.height &&
                    activeFreight.length &&
                    activeFreight.width &&
                    activeFreight.quantity &&
                    activeFreight.weight ? (
                    <button
                        style={saveStyle}
                        onClick={activeFreight.name ? saveFreight : () => window.alert('At least add a name')}
                    > Add +
                    </button>
                ) :
                    <button
                        onClick={() => {
                            setAddFreightMenuOpen(false)
                            clearActiveFreight()
                        }}
                        style={cancelStyle}>
                        ❌
                    </button>
            }
        </div>
    )
}