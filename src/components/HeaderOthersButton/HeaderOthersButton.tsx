import { Link } from 'react-router-dom'
import '../HeaderOthersButton/HeaderOthersButton.scss'

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
    <Link to={link} className='headerOthersButton' style={buttonStyle}>
      <div className='headerOthersButtonHeader'>
        <h6 className='headerOthersButtonTitle'>{title}</h6>
        {icon && <img src={icon} alt='icon' loading='lazy' className='headerOthersButtonIcon' />}
      </div>
      <ul className='headerOthersButtonList'>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </Link>
  )
}

export default HeaderOthersButton
