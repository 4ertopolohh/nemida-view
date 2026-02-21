import '../WelcomeSectionSubtitle/WelcomeSectionSubtitle.scss'

export type WelcomeSectionSubtitleProps = {
    subtitle: string
}

const WelcomeSectionSubtitle = ({ subtitle }: WelcomeSectionSubtitleProps) => {
    return (
        <p className='WelcomeSectionSubtitle'>{subtitle}</p>
    )
}

export default WelcomeSectionSubtitle;