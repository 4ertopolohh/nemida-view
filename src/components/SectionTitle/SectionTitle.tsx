import '../SectionTitle/SectionTitle.scss'

export type SectionTitleProps = {
    title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
    return (
        <div className='sectionTitle'>
            <h1 id='sectionTitleWhite'>{title}</h1>
            <h1 id='sectionTitleBlack'>{title}</h1>
        </div>
    )
}

export default SectionTitle;