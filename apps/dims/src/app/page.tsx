"use client"
import { useState } from "react";
import { numberWithCommas } from "@dims/utils/numbers";

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
        marginBottom: 20,
        color: '#000000',
        // appearance: 'text-field'
    }
    const saveStyle = {
        marginBottom: 20,
        fontSize: 25
    }
    const deleteButtonStyle = {
        marginLeft: 40,
        fontSize: 25,
    }

    return (
        <main className="min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full tems-center justify-between font-mono text-sm">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-lg">
                    Open Deck Dimension Calculator
                </p>
                {/* <div className="relative flex py-5 items-center mt-10 text-lg">
                    Freight
                    <div className="flex-grow border-t border-gray-400 ml-5"></div>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div> */}
                <div className="grid grid-cols-7 gap-4 my-8 font-bold text-md">
                    <div>Name</div>
                    <div>Quantity</div>
                    <div>Length (in)</div>
                    <div>Width (in)</div>
                    <div>Height (in)</div>
                    <div>Weight (lbs)</div>
                </div>
                <div className="grid grid-cols-7 gap-4 mb-5">
                    {
                        savedFreight.length ? savedFreight.map((freight: ActiveFreight, index: number) => {
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
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => {
                                            const previousFreight = [...savedFreight]
                                            const newFreight = previousFreight.filter(item => item.name !== freight.name)
                                            setSavedFreight(newFreight)
                                        }}
                                    > 🗑️ </button>
                                </>

                            )
                        }) : null
                    }
                </div>
                {!addFreightMenuOpen ? (
                    <div className="grid grid-cols-7 gap-4 my-10">
                        <button
                            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            onClick={() => setAddFreightMenuOpen(!addFreightMenuOpen)}
                            style={{ fontSize: 20 }}
                        >
                            +
                        </button>
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        {
                            savedFreight.length > 0 && (
                                <button
                                    className="fixed top-0 flex flex-col items-center border-b border-grey-300 bg-gradient-to-b from-blue-200 pb-6 pt-8 backdrop-blur-2xl dark:border-blue-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-blue-200 lg:p-4 lg:dark:bg-blue-800/30"
                                    type="submit"
                                    // style={{ ...formStyle, marginLeft: 1000 }}
                                    onClick={() => onCalculate(savedFreight)}
                                >
                                    {'Calculate'}
                                </button>
                            )
                        }
                    </div >

                ) : (
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
                        <button
                            style={saveStyle}
                            onClick={activeFreight.name ? saveFreight : () => window.alert('At least add a name')}
                        > Add +
                        </button>
                    </div>
                )}
            </div>
            {
                responseAttempted && calculatedResponse && (
                    <div className="relative flex py-5 items-center my-15">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400"> Output </span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                )
            }
            <div>
                {
                    responseAttempted && calculatedResponse && (
                        <div className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            {calculatedResponse.calculation.tooTall ? (
                                <h1>
                                    {`Based on the height of your input (${calculatedResponse.calculation.height}'), your freight is too tall for a 48' flatbed`}
                                </h1>
                            ) : (
                                <>
                                    <h1>
                                        {`Based on the ${calculatedResponse.calculation.determingFactor} of your input, you need:`}
                                    </h1>
                                    <h2 className="font-bold text-lg">
                                        {`${JSON.stringify(calculatedResponse.calculation.number)} 48' flatbed(s)`}
                                    </h2>
                                    <br />
                                    <h1>
                                        Load Requirements:
                                    </h1>
                                    <h2>
                                        {`${numberWithCommas(calculatedResponse.loadInput.weight)} lbs`}
                                        <br />
                                        {`${numberWithCommas(calculatedResponse.loadInput.area)} sq. in`}
                                    </h2>
                                </>
                            )}

                        </div>
                    )
                }
            </div>
        </main >)
}
