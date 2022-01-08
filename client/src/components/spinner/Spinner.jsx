import "./Spinner.css"

const Spinner = () => {
    
    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    )
}

export default Spinner