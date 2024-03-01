"use client"
import { useState } from "react";

export default function Home() {

    const [addFreightMenuOpen, setAddFreightMenuOpen] = useState(false)
    const [savedFreight, setSavedFreight]: any[] = useState([])

    const [activeFreightName, setactiveFreightName] = useState('')
    const [activeFreightQuantity, setactiveFreightQuantity] = useState('')
    const [activeFreightWidth, setactiveFreightWidth] = useState('')
    const [activeFreightLength, setactiveFreightLength] = useState('')
    const [activeFreightHeight, setactiveFreightHeight] = useState('')

    async function onFreightSubmit(event: string) {
        // event.preventDefault()

        // const formData = new FormData(event.currentTarget)

        // console.log('Form Data: ', formData)

        // const response = await fetch('/api', {
        //     method: 'POST',
        //     body: event,
        // })

        // // Handle response if necessary
        // const data = await response.json()
        // // ...
    }

    const formStyle = {
        marginBottom: 20
    }

    return (
        <main className="min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Welcome to Open Deck's Dimension Calculator
                </p>

                <button
                    className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                    onClick={() => setAddFreightMenuOpen(!addFreightMenuOpen)}
                >
                    {!addFreightMenuOpen ? "Add Freight +" : "Close Menu X"}
                </button>
                {
                    savedFreight.length ? (
                        <button
                            className="fixed right-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            type="submit"
                            style={{ ...formStyle, marginLeft: 1000 }}
                            onClick={() => onFreightSubmit("test form:")}
                        >
                            Calculate
                        </button>
                    ) : null
                }
            </div>
            <div>
                {
                    savedFreight.length ? savedFreight.map((freight: string, index: number) => {
                        return (
                            <li key={index} style={formStyle}> {freight} </li>
                        )
                    }) : null
                }
            </div>
            {addFreightMenuOpen && (
                <div>
                    <div className="text-lg">
                        {"Name:   "}
                        <input type="text" name="name" style={formStyle}
                            value={activeFreightName}
                            onChange={event => setactiveFreightName(event.target.value)}
                        />
                        <br />
                        {"Quantity:   "}
                        <input type="number" name="quantity" style={formStyle}
                            value={activeFreightQuantity}
                            onChange={event => setactiveFreightQuantity(event.target.value)}
                        />
                        <br />
                        {"Length (in):   "}
                        <input type="number" name="length" style={formStyle}
                            value={activeFreightLength}
                            onChange={event => setactiveFreightLength(event.target.value)} />
                        <br />
                        {"Width (in):   "}
                        <input type="number" name="height" style={formStyle}
                            value={activeFreightHeight}
                            onChange={event => setactiveFreightHeight(event.target.value)}
                        />
                        <br />
                        {"Height (in):   "}
                        <input type="quantity" name="width" style={formStyle}
                            value={activeFreightWidth}
                            onChange={event => setactiveFreightWidth(event.target.value)} />
                        <br />
                        <button onClick={() =>
                            setSavedFreight([...savedFreight, `${activeFreightName}: ${activeFreightQuantity}x, ${activeFreightLength} in, ${activeFreightWidth} in, ${activeFreightHeight} in`])
                        }
                            className="justify-center border-b border-gray-300 bg-gradient-to-b"> Save Freight
                        </button>
                        <br />
                    </div>
                </div>
            )}
        </main>
    );
}
