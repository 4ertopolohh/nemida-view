import { Link } from 'react-router-dom'
import '../OnHomeButton/OnHomeButton.scss'

const OnHomeButton = () => {
    return (
        <Link to='/' className='onHomeButton'>
            На главную
        </Link>
    )
}

export default OnHomeButton;
