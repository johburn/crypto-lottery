import {FaTwitter, FaFacebook, BsMedium } from 'react-icons/all'

const Footer = () => {

    const footerBlock = "flex flex-col md:mx-10"
    const footerTitle = "font-bold py-5 text-center md:text-left"
    const footerElements = "text-center md:text-left"

    return(
        <div className="p-10 bg-[#0F0E13] lg:mx-48">
            <div className="flex md:justify-end justify-center text-white md:flex-row flex-col">
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Legal</p>
                    <a className={`${footerElements}`}>Terms and Conditions</a>
                    <a className={`${footerElements}`}>Privacy Policy</a>
                    <a className={`${footerElements}`}>Cookies</a>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Get in touch</p>
                    <a className={`${footerElements}`}>info@krypto.com</a>
                    <a className={`${footerElements}`}>+51 123123123</a>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Follow us</p>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><FaFacebook className="text-white mx-3"/>Facebook</a></div>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><FaTwitter className="text-white mx-3"/>Twitter</a></div>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><BsMedium className="text-white mx-3"/>Medium</a></div>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Join our newsletter</p>
                    <form className="flex flex-row justify-center md:justify-start">
                        <input type="text" placeholder="name@email.com" className="text-black rounded-l-md" />
                        <button className="bg-[#AE016B] py-2 px-5 rounded-r-md">Join</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer;