import '../NotFoundSection/NotFoundSection.scss'
import OnHomeButton from '../OnHomeButton/OnHomeButton';

const NotFoundSection = () => {
    return (
        <section className='notFoundSection'>
            <div className='container'>
                <h1 className='notFoundTitle'>404</h1>
                <p className='notFoundSubtitle'>Страница не найдена</p>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default NotFoundSection;