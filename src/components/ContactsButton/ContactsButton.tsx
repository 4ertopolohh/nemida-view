import styles from '../ContactsButton/ContactsButton.module.scss'

type ContactsButtonProps = {
    width?: number | string
    height?: number | string
    text?: string
}

const ContactsButton = ({ width, height, text = 'СВЯЗАТЬСЯ' }: ContactsButtonProps) => {
    const buttonStyle = {
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
    }

    return (
        <button className={styles.contactsButton} style={buttonStyle}>
            <span>{text}</span>
        </button>
    )
}

export default ContactsButton
