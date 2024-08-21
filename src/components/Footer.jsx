import React from "react";
import Logo from "./Logo";

const Footer = () => {
    return(
        <footer class="p-4 bg-sagegreen sm:p-6 dark:bg-gray-800 z-50">
    <div class="mx-auto max-w-screen-xl">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="https://flowbite.com" class="flex items-center">
                    <Logo class="mr-3 h-8" alt="Logo" />
                    <span class="relative left-4 text-puce self-center text-2xl font-semibold whitespace-nowrap dark:text-white">George Atkinson</span>
                </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul class="text-puce dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://flowbite.com" class="hover:underline">Experience</a>
                        </li>
                        <li>
                            <a href="https://tailwindcss.com/" class="hover:underline">Projects</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Socials</h2>
                    <ul class="text-puce dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://github.com/gfa789" rel="noopener noreferrer" target="_blank" class="hover:underline ">Github</a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/georgeatki" rel="noopener noreferrer" target="_blank" class="hover:underline">LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-6 border-puce sm:mx-auto dark:border-gray-700 lg:my-8" />
    </div>
</footer>
    )
}

export default Footer