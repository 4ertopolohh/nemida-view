import ChangeLanguageButton from '../ChangeLanguageButton/ChangeLanguageButton';
import ContactsButton from '../ContactsButton/ContactsButton';
import styles from '../HeaderButtons/HeaderButtons.module.scss'

const HeaderButtons = () => {
    return (
        <div className={styles.headerButtons}>
            <ContactsButton />
            <ChangeLanguageButton />
        </div>
    )
}

export default HeaderButtons;
