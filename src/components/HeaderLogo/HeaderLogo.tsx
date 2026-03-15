import styles from '../HeaderLogo/HeaderLogo.module.scss'
import { Link } from 'react-router-dom'

import headerLogo from '../../assets/images/icons/headerLogoVoidWhite.png'

const HeaderLogo = () => {
  return (
    <Link to='/' className={styles.headerLogo}>
      <img src={headerLogo} alt='' loading='eager' fetchPriority='high' decoding='async' />
    </Link>
  )
}

export default HeaderLogo
