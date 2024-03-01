"use client"
import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Home() {

    const [addFreightMenuOpen, setAddFreightMenuOpen] = useState(false)

    async function onFreightSubmit(event: string) {
        // event.preventDefault()

        // const formData = new FormData(event.currentTarget)

        // console.log('Form Data: ', formData)

        const response = await fetch('/api', {
            method: 'POST',
            body: event,
        })

        // Handle response if necessary
        const data = await response.json()
        // ...
    }

    const formStyle = {
        marginBottom: 20
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Welcome to Open Deck's Dimension Calculator
                </p>

                <button
                    className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                    onClick={() => setAddFreightMenuOpen(!addFreightMenuOpen)}
                >
                    {!addFreightMenuOpen ? "Add Freight +" : "Close Menu X"}
                </button>
            </div>
            {addFreightMenuOpen && (
                <form className="flex-col text-lg" onSubmit={() => onFreightSubmit("test form:")}>
                    {"Name:   "}
                    <input type="text" name="name" style={formStyle} />
                    <br />
                    {"Quantity:   "}
                    <input type="number" name="name" style={formStyle} />
                    <br />
                    {"Length (in):   "}
                    <input type="number" name="length" style={formStyle} />
                    <br />
                    {"Width (in):   "}
                    <input type="number" name="height" style={formStyle} />
                    <br />
                    {"Height (in):   "}
                    <input type="quantity" name="width" style={formStyle} />
                    <br />
                    <button type="submit" className="justify-center border-b border-gray-300 bg-gradient-to-b"> Save Load </button>
                </form>
            )}
            <div>
            </div>
        </main>
    );
}
