import { useState } from "react"

export default function PasteInput({ savedFreight, setSavedFreight }: any) {
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
                onClick={() => { setSavedFreight(JSON.parse(value)) }}
            >
                Save
            </button>
        </>
    )
}