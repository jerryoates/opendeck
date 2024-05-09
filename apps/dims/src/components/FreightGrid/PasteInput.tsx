import { useState } from "react"

export default function PasteInput({ setSavedFreight, setPasteOpen }: any) {
    const [value, setValue] = useState('')
    return (
        <>
            <textarea
                value={value}
                onChange={event => setValue(event.target.value)}
            >
            </textarea>
            <button
                className="mx-5"
                onClick={() => {
                    setSavedFreight(JSON.parse(value))
                    setPasteOpen(false)
                }}
            >
                Save
            </button>
        </>
    )
}