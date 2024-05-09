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

// TODO set as last grid row after map
export default function InLineInputRow({ freight, setfreight, addFreightMenuOpen, saveFreight, clearfreight, setAddFreightMenuOpen }: any) {
    return (
        <>
            <input type="text" name="name" style={formStyle}
                className="text-black-900"
                value={freight.name}
                onChange={event => setfreight({ ...freight, name: event.target.value })}
            />
            <input type="number" name="quantity" style={formStyle}
                value={freight.quantity || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setfreight({ ...freight, quantity: Number(event.target.value) })}
            />
            <input type="number" name="length" style={formStyle}
                value={freight.length || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setfreight({ ...freight, length: Number(event.target.value) })}
            />
            <input type="number" name="width" style={formStyle}
                value={freight.width || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setfreight({ ...freight, width: Number(event.target.value) })}
            />
            <input type="number" name="height" style={formStyle}
                value={freight.height || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setfreight({ ...freight, height: Number(event.target.value) })}
            />
            <input type="number" name="weight" style={formStyle}
                value={freight.weight || ''}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={event => setfreight({ ...freight, weight: Number(event.target.value) })}
            />
            {
                addFreightMenuOpen &&
                    freight.name &&
                    freight.height &&
                    freight.length &&
                    freight.width &&
                    freight.quantity &&
                    freight.weight ? (
                    <button
                        style={saveStyle}
                        onClick={freight.name ? saveFreight : () => window.alert('At least add a name')}
                    > Add +
                    </button>
                ) :
                    <button
                        onClick={() => {
                            setAddFreightMenuOpen(false)
                            clearfreight()
                        }}
                        style={cancelStyle}>
                        ❌
                    </button>
            }
        </>
    )
}