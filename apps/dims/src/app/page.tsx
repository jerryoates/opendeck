"use client"
import { useState } from "react";
import { numberWithCommas } from "@dims/utils/numbers";
import Link from "next/link";

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

    const clearActiveFreight = () => {
        setActiveFreight({
            name: '',
            quantity: 0,
            length: 0,
            width: 0,
            height: 0,
            weight: 0
        })
    }

    function saveFreight() {
        setSavedFreight([...savedFreight, activeFreight])
        setAddFreightMenuOpen(false)
        clearActiveFreight()
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
    const deleteButtonStyle = {
        marginLeft: 40,
        fontSize: 15,
    }

    return (
        <main className="min-h-screen flex-col items-center justify-between pt-10 p-20">
            <header>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Link
                            className="hover:text-blue-600"
                            href="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="hover:text-blue-600"
                            href="/contact">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="hover:text-blue-600"
                            href="/careers">
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="hover:text-blue-600"
                            href="/license">
                            License
                        </Link>
                    </li>
                    <li className="mx-1000">
                        Sign In
                    </li>
                </ul>
            </header>
            <div className="z-10 max-w-5xl w-full tems-center justify-between font-mono text-sm mt-20">
                <p className="fixed font-bold left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-lg">
                    Open Deck Dimension Calculator
                </p>
                <div className="grid grid-cols-7 gap-4 mt-8 mb-8 font-bold text-md">
                    <div>Name</div>
                    <div>Quantity</div>
                    <div>Length (in)</div>
                    <div>Width (in)</div>
                    <div>Height (in)</div>
                    <div>Weight (lbs)</div>
                </div>
                {/* <div className="relative flex items-center mt-0 mb-5">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div> */}
                <div className="grid grid-cols-7 gap-4 mb-5">
                    {
                        savedFreight.length > 0 && savedFreight.map((freight: ActiveFreight, index: number) => {
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
                        })
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
                                    onClick={() => onCalculate(savedFreight)}
                                >
                                    {'Calculate 🔄'}
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
                        <div className="w-[90%] justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            {calculatedResponse.nonFitPieces.length > 0 && (
                                <div>
                                    < h2 className="font-bold text-lg mt-3" >
                                        Some of your pieces don&apos;t fit on a 48&apos; flatbed:
                                    </h2 >
                                    {calculatedResponse.nonFitPieces.map((piece: any) =>
                                        <>
                                            <div> {`${piece.item.quantity}x ${(piece.item.name)} - ${(piece.reason)}`}</div>
                                        </>
                                    )}
                                    <div className="relative flex py-5 items-center mt-15">
                                        <div className="flex-grow border-t border-gray-400"></div>
                                        <div className="flex-grow border-t border-gray-400"></div>
                                    </div>
                                </div>
                            )}
                            <h1 className="flex text-lg row-auto mt-0 font-bold">
                                <div>
                                    {`For fitting pieces, you need:`}
                                </div>
                            </h1>
                            <h2 className="text-md mt-2">
                                {`${JSON.stringify(calculatedResponse.calculation.number)} 48' flatbed(s)`}
                            </h2>
                            <br />
                            <h1 className="text-lg font-bold">
                                Load Requirements:
                            </h1>
                            <div className="grid grid-cols-2 gap-0 mb-2">
                                <div className="font-bold">
                                    Weight:
                                </div>
                                <div>
                                    {`${numberWithCommas(calculatedResponse.loadInput.weight)} lbs`}
                                </div>
                                <div className="font-bold">
                                    Area:
                                </div>
                                <div>
                                    {`${numberWithCommas(calculatedResponse.loadInput.area)} sq in`}
                                </div>
                                <div className="font-bold">
                                    Tallest Item:
                                </div>
                                <div>
                                    {`${numberWithCommas(calculatedResponse.calculation.height)} in`}
                                </div>
                            </div>
                            <button
                                className="flex my-5 flex-row justify-end border-grey-300 bg-gradient-to-b from-green-200 backdrop-blur-2xl dark:border-green-800 dark:bg-green-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-green-200 lg:p-4 lg:dark:bg-green-800/30"
                                onClick={() => { navigator.clipboard.writeText(JSON.stringify(calculatedResponse)) }}
                            >
                                Copy &nbsp;&nbsp; 📋
                            </button>
                            <button
                                className="flex flex-row justify-end border-grey-300 bg-gradient-to-b from-red-200 backdrop-blur-2xl dark:border-red-800 dark:bg-red-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-red-200 lg:p-4 lg:dark:bg-red-800/30"
                                onClick={() => {
                                    setResponseAttempted(false)
                                    setCalculatedResponse({})
                                }}
                            >
                                Clear &nbsp;&nbsp; ❌
                            </button>
                        </div>
                    )
                }
            </div>
        </main >)
}
