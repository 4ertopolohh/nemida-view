import '../ContactsButton/ContactsButton.scss'

export type ContactsButtonProps = {
    width?: number | string
    height?: number | string
    fontSize?: number | string
}

const toCssSize = (value?: number | string) => {
    if (typeof value === 'number') {
        return `${value}px`
    }

    return value
}

const ContactsButton = ({ width, height, fontSize }: ContactsButtonProps) => {
    const style = {
        width: toCssSize(width),
        height: toCssSize(height),
        fontSize: toCssSize(fontSize),
    }
    const buttonLabel = '\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f'

    return (
        <button className='contactsButton' style={style}>
            {buttonLabel}
        </button>
    )
}

export default ContactsButton
