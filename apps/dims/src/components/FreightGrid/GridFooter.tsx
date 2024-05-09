

export default function GridFooter({ setAddFreightMenuOpen, addFreightMenuOpen, pasteOpen, setPasteOpen, onCalculate, savedFreight }: any) {

    return (
        <div className="grid grid-cols-7 gap-4 my-10">
            <button
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                onClick={() => setAddFreightMenuOpen(!addFreightMenuOpen)}
                style={{ fontSize: 20 }}
            >
                +
            </button>
            <button
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                onClick={() => setPasteOpen(!pasteOpen)}
                style={{ fontSize: 15 }}
            >
                Paste 📋
            </button>
            {/* <div /> */}
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
    )
}