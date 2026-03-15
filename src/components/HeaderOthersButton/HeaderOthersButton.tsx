import { Link } from 'react-router-dom'
import styles from '../HeaderOthersButton/HeaderOthersButton.module.scss'

export type HeaderOthersButtonProps = {
  link: string
  title: string
  icon: string
  items: string[]
  backgroundImage?: string
}

const HeaderOthersButton = ({ link, title, icon, items, backgroundImage }: HeaderOthersButtonProps) => {
  const buttonStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined

  return (
    <Link to={link} className={styles.headerOthersButton} style={buttonStyle}>
      <div className={styles.headerOthersButtonHeader}>
        <h6 className={styles.headerOthersButtonTitle}>{title}</h6>
        {icon && <img src={icon} alt='icon' loading='lazy' className={styles.headerOthersButtonIcon} />}
      </div>
      <ul className={styles.headerOthersButtonList}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </Link>
  )
}

export default HeaderOthersButton
