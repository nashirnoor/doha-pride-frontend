import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');

    // Navigation Items
    const navItems = [
        { name: 'HOME', link: '/' },
        { name: 'ABOUT US', link: '/about' },
        { name: 'TOURS & ACTIVITIES', link: '/tours-activities' },
        { name: 'TRANSFER & MEET', link: '/transfer' },
        { name: 'BLOG', link: '/blog' },
        { name: 'CONTACT US', link: '/contact' }
    ];


    // Authentication Button Component
    // const AuthButton = () => {
    //     const user = localStorage.getItem('access_token');

    //     return user ? (
    //         <a
    //             href="/profile"
    //             className="bg-maroon text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition duration-300 text-sm font-medium"
    //         >
    //             My profile
    //         </a>
    //     ) : (
    //         <a
    //             href="/login"
    //             className="bg-maroon text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition duration-300 text-sm font-medium"
    //         >
    //             Sign In
    //         </a>
    //     );
    // };

    const AuthButton = () => {
        return <a
            href="/transfer"
            className="bg-maroon text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition duration-300 text-sm font-medium"
        >
           Book Now
        </a>
    }

    // Language Selector Component
    const LanguageSelector = () => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');

        const languages = [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
            { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
            { code: 'fr', name: 'French', flag: '🇫🇷' },
            { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
            { code: 'es', name: 'Spanish', flag: '🇪🇸' },
            { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
            { code: 'ru', name: 'Russian', flag: '🇷🇺' },
            { code: 'de', name: 'German', flag: '🇩🇪' },
            { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
        ];

        const handleLanguageSelect = useCallback((langCode) => {
            try {
                setIsDropdownOpen(false);

                if (window.google && window.google.translate) {
                    // Find the language selector link
                    const languageLinks = document.querySelectorAll('.goog-te-gadget-simple a');

                    if (languageLinks.length > 0) {

                        // Click the first language selector link to open dropdown
                        languageLinks[0].click();

                        // Wait a short moment for the dropdown to open
                        setTimeout(() => {
                            // Try to find and click the specific language
                            const languageOptions = document.querySelectorAll('.goog-te-menu-value');

                            const targetLanguageOption = Array.from(languageOptions).find(option =>
                                option.textContent.toLowerCase().includes(
                                    languages.find(l => l.code === langCode)?.name.toLowerCase()
                                )
                            );

                            if (targetLanguageOption) {
                                targetLanguageOption.click();

                                // Update local state
                                setCurrentLanguage(langCode);

                            } else {
                                console.warn(`Could not find language option for ${langCode}`);
                            }
                        }, 300);  // Small delay to allow dropdown to render
                    } else {
                        console.error('No language selector links found');
                    }
                } else {
                    console.error('Google Translate not initialized');
                }
            } catch (error) {
                alert('Unable to change language. Please try manual translation.');
            }
        }, []);

        const filteredLanguages = languages.filter(lang =>
            lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="relative">
                <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition"
                >

                    <span className="text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg>                        {/* {languages.find(l => l.code === currentLanguage)?.name || 'Translate'} */}
                    </span>
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Search languages"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon"
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredLanguages.map((lang) => (
                                <div
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                >
                                    <span className="mr-3 text-xl">{lang.flag}</span>
                                    <span className="text-sm font-medium">{lang.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Google Translate Setup Effect
    useEffect(() => {
        const loadGoogleTranslateScript = () => {
            return new Promise((resolve, reject) => {
                // Check if script is already loaded
                if (window.google && window.google.translate) {
                    resolve();
                    return;
                }

                // Create script element
                const script = document.createElement('script');
                script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                script.async = true;
                script.defer = true;

                // Global initialization function
                window.googleTranslateElementInit = () => {
                    try {
                        // Ensure the element is created in the DOM
                        if (!document.getElementById('google_translate_element')) {
                            const div = document.createElement('div');
                            div.id = 'google_translate_element';
                            div.style.display = 'none';
                            document.body.appendChild(div);
                        }

                        // Create Google Translate Element
                        new window.google.translate.TranslateElement({
                            pageLanguage: 'en',
                            includedLanguages: 'en,ar,zh-CN,fr,pt,es,hi,ru,de,ja',
                            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                            autoDisplay: false
                        }, 'google_translate_element');

                        setIsTranslateLoaded(true);
                        resolve();
                    } catch (error) {
                        console.error('Google Translate initialization error:', error);
                        reject(error);
                    }
                };

                // Error and load handlers
                script.onload = () => {
                };
                script.onerror = () => {
                    console.error('Failed to load Google Translate script');
                    reject(new Error('Script load error'));
                };

                // Append script to document
                document.body.appendChild(script);
            });
        };

        // Load translation script
        loadGoogleTranslateScript()
            .then(() => {
                // console.log('Translation setup complete');
            })
            .catch(error => {
                console.error('Translation setup failed:', error);
            });

        // Cleanup function
        return () => {
            // Remove any lingering translate elements
            const translateElements = document.querySelectorAll('[class^="goog-te-"]');
            translateElements.forEach(el => el.remove());
        };
    }, []);

    return (
        <>
            <header className="bg-gray-100 shadow-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to='/'>
                            <img src='navbarlogo.svg' alt="Logo" className="w-auto md:h-20 h-12" />

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item, index) => (
                            <React.Fragment key={item.name}>
                                <a
                                    href={item.link}
                                    className="text-gray-900 hover:text-maroon transition duration-300 uppercase font-bold text-base"
                                >
                                    {item.name}
                                </a>
                                {index < navItems.length - 1 && (
                                    <span className="text-gray-400">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    {/* Desktop Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSelector />

                        {/* Hidden Google Translate Element */}
                        <div
                            id="google_translate_element"
                            style={{
                                position: 'absolute',
                                top: '-9999px',
                                visibility: 'hidden'
                            }}
                        />

                        <AuthButton />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center space-x-4">
                        <LanguageSelector />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 hover:text-maroon focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-gray-100"
                        >
                            <div className="container mx-auto px-4 py-6 text-center">
                                {navItems.map((item) => (
                                    <a
                                        href={item.link}
                                        key={item.name}
                                        className="block py-4 text-gray-800 hover:text-maroon transition duration-300 uppercase font-semibold text-sm"
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

export default Header;