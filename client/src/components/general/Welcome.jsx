import { useState } from 'react';
import Typewriter from '../typewriter/Typewriter'

const Welcome = () => {

    const gridStyle = "flex justify-center items-center px-8 py-2 border-pink-700/50 border-2"
    const [catchphrases,setCatchphrases] = useState(['Your Chance to Win Starts Here','Be a Player','Play Now, Laugh Forever','We Don’t Believe in Destiny, We Believe in You!']);

    return(
        <div className="w-full md:h-96 flex justify-center text-white flex-col md:flex-row">
            <div className="w-full md:h-full h-96 px-8 py-8 justify-items-center">
                <Typewriter text={catchphrases} clasProps="m-auto md:w-96 text-6xl text-center md:text-left"/>
            </div>
            <div className="flex justify-center items-center w-full px-8 py-8">
                <div className="grid grid-cols-3 h-32">
                    <div className={`rounded-tl-xl ${gridStyle}`}>Web3</div>
                    <div className={`${gridStyle}`}>Blockchain</div>
                    <div className={`rounded-tr-xl ${gridStyle}`}>Hardhat</div>
                    <div className={`rounded-bl-xl ${gridStyle}`}>React</div>
                    <div className={`${gridStyle}`}>Solidity</div>
                    <div className={`rounded-br-xl ${gridStyle}`}>Chainlink</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;