import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleTranslate from './GoogleTranslate';


const Header1 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { name: 'HOME', link: '/' },
        { name: 'ABOUT US', link: '/about' },
        { name: 'TOURS & ACTIVITIES', link: '/tours-activities' },
        { name: 'TRANSFER & MEET', link: '/transfer' },
        { name: 'BLOG', link: '/blog' },
        { name: 'CONTACT US', link: '/contact' }
    ];
    const AuthButton = () => {
        const user = localStorage.getItem('access_token');

        if (user) {
            return (
                <a
                    href="/profile"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-maroon text-white hover:bg-cyan-600 transition duration-300"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </a>
            );
        }

        return (
            <a
                href="/login"
                className="bg-maroon text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition duration-300 text-sm font-medium"
            >
                Sign In
            </a>
        );
    };

    useEffect(() => {
        // Function to load Google Translate script
        const loadGoogleTranslateScript = () => {
            return new Promise((resolve, reject) => {
                // Check if script is already loaded
                if (window.google && window.google.translate) {
                    resolve();
                    return;
                }

                // Create script element
                const script = document.createElement('script');
                script.src = 'https://translate.google.com/translate_a/element.js';
                script.async = true;

                script.onload = () => {
                    // Wait a bit to ensure the script is fully loaded
                    setTimeout(() => {
                        if (window.google && window.google.translate) {
                            resolve();
                        } else {
                            reject(new Error('Google Translate script failed to load'));
                        }
                    }, 1000);
                };

                script.onerror = () => {
                    reject(new Error('Failed to load Google Translate script'));
                };

                document.body.appendChild(script);
            });
        };

        // Initialize Google Translate
        const initializeGoogleTranslate = () => {
            try {
                // Ensure we have the Google Translate object
                if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement({
                        pageLanguage: 'en',
                        includedLanguages: 'en,ar,zh-CN,fr,pt,es',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false
                    }, 'google_translate_element');
                }
            } catch (error) {
                console.error('Google Translate initialization error:', error);
            }
        };

        // Alternative translation trigger method
        const triggerTranslation = () => {
            try {
                // Multiple methods to trigger translation
                const methods = [
                    () => document.querySelector('.goog-te-combo')?.click(),
                    () => document.querySelector('.goog-te-gadget-simple')?.click(),
                    () => {
                        const select = document.querySelector('select.goog-te-combo');
                        if (select) {
                            select.value = select.options[1].value; 
                            const event = new Event('change', { bubbles: true });
                            select.dispatchEvent(event);
                        }
                    }
                ];

                // Try each method
                for (const method of methods) {
                    method();
                    if (document.querySelector('.goog-te-menu-value')) break;
                }
            } catch (error) {
                console.error('Translation trigger error:', error);
            }
        };

        // Main execution
        const setupTranslation = async () => {
            try {
                await loadGoogleTranslateScript();

                // Ensure Google Translate is initialized
                window.googleTranslateElementInit = initializeGoogleTranslate;

                // Call initialization
                initializeGoogleTranslate();
            } catch (error) {
                console.error('Google Translate setup failed:', error);
            }
        };

        // Run setup
        setupTranslation();

        // Attach translation trigger to the icon
        const translationIcon = document.querySelector('#translation-icon');
        if (translationIcon) {
            translationIcon.addEventListener('click', triggerTranslation);
        }

        // Cleanup
        return () => {
            const translateElements = document.querySelectorAll('[class^="goog-te-"]');
            translateElements.forEach(el => el.remove());
        };
    }, []);




    return (
        <>

            <header className="bg-gray-100 shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src='navbarlogo.svg' alt="Logo" className=" w-auto md:h-20 h-12" />
                    </div>

                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item, index) => (
                            <React.Fragment key={item.name}>
                                <a href={item.link} className="text-gray-900 hover:text-maroon transition duration-300 uppercase font-bold text-sm">
                                    {item.name}
                                </a>
                                {index < navItems.length - 1 && (
                                    <span className="text-gray-400">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Google Translate Icon */}
                        <div
                            id="translation-icon"
                            className="relative cursor-pointer"
                        >
                            {/* Existing SVG code */}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
<path d="M 6 3 C 4.300781 3 3 4.300781 3 6 L 3 26 C 3 27.699219 4.300781 29 6 29 L 6.0625 29 L 10.46875 23.71875 L 10.78125 23.34375 C 10.476563 23.460938 10.273438 23.542969 10.21875 23.5625 L 9.59375 21.65625 C 9.648438 21.636719 12.394531 20.699219 15.0625 18.8125 C 12.503906 16.488281 11.207031 14.121094 11.125 13.96875 L 12.875 13.03125 C 12.894531 13.066406 14.167969 15.34375 16.65625 17.53125 C 18.265625 16.078125 19.625 14.230469 19.9375 12 L 8 12 L 8 10 L 16 10 L 16 8 L 18 8 L 18 10 L 25 10 L 25 12 L 21.9375 12 C 21.640625 14.789063 20.132813 17.035156 18.28125 18.78125 C 19.03125 19.300781 19.847656 19.777344 20.75 20.1875 C 21.617188 19.449219 22.742188 19 24 19 L 29 19 L 29 6 C 29 4.300781 27.699219 3 26 3 Z M 16.6875 20.125 C 15.246094 21.203125 13.75 22 12.5625 22.5625 L 13.53125 23.71875 L 17.9375 29 L 19 29 L 19 24 C 19 23.214844 19.1875 22.46875 19.5 21.8125 C 18.464844 21.308594 17.53125 20.742188 16.6875 20.125 Z M 24 21 C 22.300781 21 21 22.300781 21 24 L 21 32.0625 L 26.28125 36.46875 L 28.125 38 L 26.28125 39.53125 L 21 43.9375 L 21 44 C 21 45.699219 22.300781 47 24 47 L 44 47 C 45.699219 47 47 45.699219 47 44 L 47 24 C 47 22.300781 45.699219 21 44 21 Z M 12 25 L 7 31 L 10 31 L 10 35 L 14 35 L 14 31 L 17 31 Z M 33 26.40625 L 35.09375 26.40625 L 40.3125 40.1875 L 37.8125 40.1875 L 36.6875 37 L 31.40625 37 L 30.3125 40.1875 L 27.8125 40.1875 Z M 34 29.40625 L 32 35.09375 L 36 35.09375 Z M 19 33 L 19 36 L 10 36 L 14 40 L 19 40 L 19 43 L 25 38 Z"></path>
</svg>
                        </div>

                        {/* Hidden Google Translate Element */}
                        {/* Sign In Button */}
                        <AuthButton />
                        <div id="google_translate_element"></div>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">


                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 hover:text-maroon focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-gray-100"
                        >
                            <div className="container mx-auto px-4 py-2">
                                {navItems.map((item) => (
                                    <a
                                        href={item.link}
                                        key={item.name}
                                        className="block py-2 text-gray-800 hover:text-maroon transition duration-300 uppercase font-semibold text-sm"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <div className="py-2">
                                    <AuthButton />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header1;
