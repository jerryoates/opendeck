"use client"
import { useState } from "react";
import GridRow from "@dims/components/FreightGrid/GridRow";
import Header from "@dims/components/Header";
import GridColumnHeaders from "@dims/components/FreightGrid/GridColumnHeaders";
import InputRow from "@dims/components/FreightGrid/InputRow";
import GridFooter from "@dims/components/FreightGrid/GridFooter";
import OutputBar from "@dims/components/OutputBar";
import TitleBar from "@dims/components/TitleBar";
import Truck from "@dims/components/Results/Truck";
import EditRow from "@dims/components/FreightGrid/EditRow";
import PasteInput from "@dims/components/FreightGrid/PasteInput";

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
    const [responseAttempted, setResponseAttempted] = useState(false)
    const [shipment, setShipment]: any = useState({})
    const [editItemIsOpen, setEditItemIsOpen] = useState(false)
    const [pasteOpen, setPasteOpen] = useState(false)

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
        const response = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(savedItems),
        })

        const data: ResponseBody = await response.json()

        setResponseAttempted(true)
        setShipment(data)
    }

    const deleteButtonStyle = {
        marginLeft: 40,
        fontSize: 15,
    }

    return (
        <main className="min-h-screen flex-col items-center justify-between pt-10 p-20">
            <Header />
            <div className="z-10 max-w-5xl w-full tems-center justify-between font-mono text-sm mt-20">
                <TitleBar />
                <GridColumnHeaders savedFreight={savedFreight} />
                <div className="grid grid-cols-7 gap-4 mb-5">
                    {
                        savedFreight.length > 0 && savedFreight.map((freight: ActiveFreight, index: number) => {
                            return editItemIsOpen ?
                                (
                                    <>
                                        <EditRow
                                            workingItem={{ ...freight, index }}
                                            freight={freight}
                                            index={index}
                                            setSavedFreight={setSavedFreight}
                                            savedFreight={savedFreight}
                                            setEditItemIsOpen={setEditItemIsOpen}
                                        />
                                    </>
                                )
                                : (
                                    <>
                                        <GridRow freight={freight} />
                                        < div >
                                            <button
                                                className="text-lg"
                                                onClick={() => { setEditItemIsOpen(!editItemIsOpen) }}
                                            >
                                                ✎
                                            </button>
                                            <button
                                                style={deleteButtonStyle}
                                                onClick={() => {
                                                    const previousFreight = [...savedFreight]
                                                    const newFreight = previousFreight.filter(item => item.name !== freight.name)
                                                    setSavedFreight(newFreight)
                                                }}
                                            > 🗑️ </button>
                                        </div>
                                    </>

                                )
                        })
                    }
                </div>
                {
                    addFreightMenuOpen ? (
                        <InputRow
                            activeFreight={activeFreight}
                            setActiveFreight={setActiveFreight}
                            addFreightMenuOpen={addFreightMenuOpen}
                            saveFreight={saveFreight}
                            clearActiveFreight={clearActiveFreight}
                            setAddFreightMenuOpen={setAddFreightMenuOpen}
                        />
                    ) : pasteOpen ? (
                        <PasteInput setSavedFreight={setSavedFreight} setPasteOpen={setPasteOpen} />
                    ) :
                        (
                            <GridFooter
                                setAddFreightMenuOpen={setAddFreightMenuOpen}
                                addFreightMenuOpen={addFreightMenuOpen}
                                onCalculate={onCalculate}
                                savedFreight={savedFreight}
                                pasteOpen={pasteOpen}
                                setPasteOpen={setPasteOpen}
                            />
                        )
                }
            </div >
            {
                responseAttempted && shipment && (
                    <OutputBar />
                )
            }
            {
                responseAttempted && (<div className="w-[90%] justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {
                        shipment && (
                            shipment.trucks?.map((truck: any, index: number) =>
                                <Truck truck={truck} index={index} key={index} />
                            )
                        )
                    }
                    {
                        shipment.nonFitPieces?.length > 0 && (
                            <div>
                                <div className="mt-3 font-bold">
                                    Non Fits:
                                </div>
                                {shipment.nonFitPieces.map((item: any, index: number) =>
                                    <div key={index}>
                                        {`${item.name}`}
                                    </div>
                                )}
                            </div>
                        )
                    }
                    {
                        shipment && (
                            <>
                                <button
                                    className="flex my-5 flex-row justify-end border-grey-300 bg-gradient-to-b from-green-200 backdrop-blur-2xl dark:border-green-800 dark:bg-green-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-green-200 lg:p-4 lg:dark:bg-green-800/30"
                                    onClick={() => { navigator.clipboard.writeText(JSON.stringify(shipment)) }}
                                >
                                    Copy &nbsp;&nbsp; 📋
                                </button>
                                <button
                                    className="flex flex-row justify-end border-grey-300 bg-gradient-to-b from-red-200 backdrop-blur-2xl dark:border-red-800 dark:bg-red-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-red-200 lg:p-4 lg:dark:bg-red-800/30"
                                    onClick={() => {
                                        setResponseAttempted(false)
                                        setShipment({})
                                    }}
                                >
                                    Clear &nbsp;&nbsp; ❌
                                </button>
                            </>
                        )
                    }
                </div>)
            }
        </main >)
}
