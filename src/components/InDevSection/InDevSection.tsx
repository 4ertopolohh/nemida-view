import '../InDevSection/InDevSection.scss'
import OnHomeButton from '../OnHomeButton/OnHomeButton';

export type InDevSection = {
    title: string
}

const InDevSection = ({ title }: InDevSection) => {
    return (
        <section className='inDevSection'>
            <div className='container'>
                <h1 className='inDevSectionTitle'>{title}</h1>
                <p className='inDevSectionSubtitle'>Страница в разработке...</p>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default InDevSection;