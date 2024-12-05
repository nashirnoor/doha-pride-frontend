import { useEffect, useState } from 'react';

const GoogleTranslate = () => {
  const languageFlags = {
    en: 'https://flagcdn.com/us.svg',
    es: 'https://flagcdn.com/es.svg',
    fr: 'https://flagcdn.com/fr.svg',
    de: 'https://flagcdn.com/de.svg',
  };

  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: Object.keys(languageFlags).join(','), // Join language keys for allowed languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );

      // Listen for language change
      const observer = new MutationObserver(() => {
        const selectedLanguage = document.querySelector('.goog-te-combo')?.value;
        if (selectedLanguage) setCurrentLanguage(selectedLanguage);
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm border">
      <img
        src={languageFlags[currentLanguage]}
        alt={`${currentLanguage.toUpperCase()} Flag`}
        className="w-5 h-3 rounded"
      />
      <div id="google_translate_element" className="relative"></div>
    </div>
  );
};

export default GoogleTranslate;
