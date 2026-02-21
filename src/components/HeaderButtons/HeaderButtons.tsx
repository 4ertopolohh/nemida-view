import ChangeLanguageButton from '../ChangeLanguageButton/ChangeLanguageButton';
import ContactsButton from '../ContactsButton/ContactsButton';
import '../HeaderButtons/HeaderButtons.scss'

const HeaderButtons = () => {
    return (
        <div className='headerButtons'>
            <ContactsButton />
            <ChangeLanguageButton />
        </div>
    )
}

export default HeaderButtons;