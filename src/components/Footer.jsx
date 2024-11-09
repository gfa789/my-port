import React from "react";
import Logo from "./Logo";

const Footer = () => {

    return(
        <footer className={`p-4 bg-sagegreen sm:p-6 dark:bg-gray-800 z-50`}>
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <Logo className="mr-3 h-8" alt="Logo" />
                            <span className={`relative left-4 text-puce self-center text-2xl font-semibold whitespace-nowrap dark:text-white`}>George Atkinson</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                        <div>
                            <h2 className={`mb-6 text-sm font-semibold text-gray-900 uppercase`}>Socials</h2>
                            <ul className={`text-puce dark:text-gray-400`}>
                                <li className="mb-4">
                                    <a href="https://github.com/gfa789" rel="noopener noreferrer" target="_blank" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/in/georgeatki" rel="noopener noreferrer" target="_blank" className="hover:underline">LinkedIn</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className={`my-6 border-puce sm:mx-auto dark:border-gray-700 lg:my-8`} />
            </div>
        </footer>
    )
}

export default Footer;