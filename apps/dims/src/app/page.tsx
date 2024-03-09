"use client"
import { useState } from "react";

interface ActiveFreight {
    name: string,
    quantity: number,
    length: number,
    width: number,
    height: number,
    weight: number,
}

interface ResponseBody {
    loadInput: any,
    calculation: {
        requiredForWeight: number,
        requiredForVolume: number,
        determingFactor: string
    }
}

export default function Home() {
    const [addFreightMenuOpen, setAddFreightMenuOpen] = useState(false)
    const [savedFreight, setSavedFreight] = useState<ActiveFreight[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [responseAttempted, setResponseAttempted] = useState(false)
    const [calculatedResponse, setCalculatedResponse]: any = useState({})

    const [activeFreight, setActiveFreight] = useState<ActiveFreight>({
        name: '',
        quantity: 0,
        length: 0,
        width: 0,
        height: 0,
        weight: 0
    })

    function saveFreight() {
        setSavedFreight([...savedFreight, activeFreight])
        setAddFreightMenuOpen(false)
        setActiveFreight({
            name: '',
            quantity: 0,
            length: 0,
            width: 0,
            height: 0,
            weight: 0
        })
    }

    async function onCalculate(savedItems: ActiveFreight[]) {
        // setIsLoading(true)
        const response = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(savedItems),
        })

        const data = await response.json() as ResponseBody


        setCalculatedResponse(data as ResponseBody)
        setResponseAttempted(true)
    }

    const formStyle = {
        marginBottom: 20
    }

    const deleteButtonStyle = {
        marginLeft: 20
    }

    return (
        <main className="min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full tems-center justify-between font-mono text-sm">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-lg">
                    Welcome to Open Deck&apos;s Dimension Calculator
                </p>
                <div className="grid grid-cols-6 gap-4 my-8 font-bold text-md">
                    <div>Name</div>
                    <div>Quantity</div>
                    <div>Length (in)</div>
                    <div>Width (in)</div>
                    <div>Height (in)</div>
                    <div>Weight (lbs)</div>
                </div>
                <div className="grid grid-cols-6 gap-4 mb-5">
                    {
                        savedFreight.length ? savedFreight.map((freight: ActiveFreight, index: number) => {
                            return (
                                <>
                                    <div>
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
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => {
                                                const previousFreight = [...savedFreight]
                                                const newFreight = previousFreight.filter(item => item.name !== freight.name)
                                                setSavedFreight(newFreight)
                                            }}
                                        > X </button>
                                    </div>
                                </>

                            )
                        }) : null
                    }
                    {!addFreightMenuOpen ? (
                        <button
                            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            onClick={() => setAddFreightMenuOpen(!addFreightMenuOpen)}
                        >
                            Add Freight +
                        </button>
                    ) : <>
                        <input type="text" name="name" style={formStyle}
                            value={activeFreight.name}
                            onChange={event => setActiveFreight({ ...activeFreight, name: event.target.value })}
                        />
                        <input type="number" name="quantity" style={formStyle}
                            value={activeFreight.quantity || ''}
                            onChange={event => setActiveFreight({ ...activeFreight, quantity: Number(event.target.value) })}
                        />
                        <input type="number" name="length" style={formStyle}
                            value={activeFreight.length || ''}
                            onChange={event => setActiveFreight({ ...activeFreight, length: Number(event.target.value) })}
                        />
                        <input type="number" name="width" style={formStyle}
                            value={activeFreight.height || ''}
                            onChange={event => setActiveFreight({ ...activeFreight, height: Number(event.target.value) })}
                        />
                        <input type="number" name="height" style={formStyle}
                            value={activeFreight.width || ''}
                            onChange={event => setActiveFreight({ ...activeFreight, width: Number(event.target.value) })}
                        />
                        <input type="number" name="weight" style={formStyle}
                            value={activeFreight.weight || ''}
                            onChange={event => setActiveFreight({ ...activeFreight, weight: Number(event.target.value) })}
                        />
                    </>

                    }
                </div>
                <div className="grid grid-cols-5 gap-4 my-5">

                </div>
                {
                    responseAttempted && calculatedResponse && (
                        <div className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            <h1>
                                Load Requirements:
                            </h1>
                            <br />
                            <h2>
                                {`${JSON.stringify(calculatedResponse.loadInput)}`}
                            </h2>
                            <br />
                            <h1>
                                Your Result:
                            </h1>
                            <br />
                            <h2>
                                {`${JSON.stringify(calculatedResponse.calculation.requiredForWeight)} 48' flatbed(s)`}
                            </h2>
                        </div>
                    )
                }
                {
                    savedFreight.length ? (
                        <button
                            className="fixed right-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            type="submit"
                            style={{ ...formStyle, marginLeft: 1000 }}
                            onClick={() => onCalculate(savedFreight)}
                        >
                            Calculate
                        </button>
                    ) : null
                }
            </div>
            <div>
                {/* {
                    savedFreight.length ? savedFreight.map((freight: ActiveFreight, index: number) => {
                        return (
                            <li key={index} style={formStyle}>
                                {`${freight.quantity} ${freight.name}`}
                                <button style={deleteButtonStyle}
                                    onClick={() => {
                                        const previousFreight = [...savedFreight]
                                        const newFreight = previousFreight.filter(item => item.name !== freight.name)
                                        setSavedFreight(newFreight)
                                    }}
                                > X </button>
                                <br />
                                {`length: ${freight.length} in`}
                                <br />
                                {`width: ${freight.width} in`}
                                <br />
                                {`height: ${freight.height} in`}
                                <br />
                                {`weight: ${freight.weight} lbs`}
                                <br />
                            </li>
                        )
                    }) : null
                } */}
            </div>
            {
                addFreightMenuOpen && (
                    <div>
                        <div className="text-lg">
                            {"Name:   "}
                            <input type="text" name="name" style={formStyle}
                                value={activeFreight.name}
                                onChange={event => setActiveFreight({ ...activeFreight, name: event.target.value })}
                            />
                            <br />
                            {"Quantity:   "}
                            <input type="number" name="quantity" style={formStyle}
                                value={activeFreight.quantity || ''}
                                onChange={event => setActiveFreight({ ...activeFreight, quantity: Number(event.target.value) })}
                            />
                            <br />
                            {"Length (in):   "}
                            <input type="number" name="length" style={formStyle}
                                value={activeFreight.length || ''}
                                onChange={event => setActiveFreight({ ...activeFreight, length: Number(event.target.value) })}
                            />
                            <br />
                            {"Width (in):   "}
                            <input type="number" name="width" style={formStyle}
                                value={activeFreight.height || ''}
                                onChange={event => setActiveFreight({ ...activeFreight, height: Number(event.target.value) })}
                            />
                            <br />
                            {"Height (in):   "}
                            <input type="number" name="height" style={formStyle}
                                value={activeFreight.width || ''}
                                onChange={event => setActiveFreight({ ...activeFreight, width: Number(event.target.value) })}
                            />
                            <br />
                            {"Weight (lbs):   "}
                            <input type="number" name="weight" style={formStyle}
                                value={activeFreight.weight || ''}
                                onChange={event => setActiveFreight({ ...activeFreight, weight: Number(event.target.value) })}
                            />
                            <br />
                            <button
                                onClick={activeFreight.name ? saveFreight : () => window.alert('At least add a name')}
                                className="justify-center border-b border-gray-300 bg-gradient-to-b"> Save Freight
                            </button>
                            <br />
                        </div>
                    </div>
                )
            }
        </main >)
}
