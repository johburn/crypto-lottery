const Modal = ({callback,open, setModalIsOpen}) => {

    return (
        <div>
            {open && (
            <div className="container flex justify-center mx-auto">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="max-w-sm p-6 bg-[#0F0E13] divide-y divide-gray-500 text-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl">Wrong Network</h3>
                            <svg className="cursor-pointer" onClick={()=>{setModalIsOpen(false)}} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </div>
                        <div className="mt-4">
                            <p className="mb-4 text-xl">This website get data from the Rinkeby network, please connect to Rinkeby.</p>
                            <button onClick={()=>{setModalIsOpen(false); callback()}} className="px-4 py-2 mx-4 text-white bg-[#AE016B] rounded">Yes</button>
                            <button onClick={()=>{setModalIsOpen(false)}} className="px-4 py-2 mx-4 text-white bg-[#AE016B] rounded">No</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export { Modal}