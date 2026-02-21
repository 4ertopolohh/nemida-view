import { useState } from 'react'
import '../ChangeLanguageButton/ChangeLanguageButton.scss'

const ChangeLanguageButton = () => {
    const [activeLanguage, setActiveLanguage] = useState<'en' | 'ru'>('en')

    const handleLanguageToggle = () => {
        setActiveLanguage((prev) => (prev === 'en' ? 'ru' : 'en'))
    }

    return (
        <button
            type='button'
            className='changeLanguageButton'
            onClick={handleLanguageToggle}
        >
            <span className={activeLanguage === 'en' ? 'changeLanguageActive' : 'changeLanguageInactive'}>EN</span>
            <span id='changeLanguageSeparator'>|</span>
            <span className={activeLanguage === 'ru' ? 'changeLanguageActive' : 'changeLanguageInactive'}>RU</span>
        </button>
    )
}

export default ChangeLanguageButton;
