import { useEffect, useRef, useState } from 'react'
import '../SectionTitle/SectionTitle.scss'

export type SectionTitleProps = {
    title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
    const titleRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined')

    useEffect(() => {
        const element = titleRef.current
        if (!element) return

        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry) return

                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: [0.5] },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div ref={titleRef} className={`sectionTitle${isVisible ? ' sectionTitle--visible' : ''}`}>
            <h1 id='sectionTitleWhite'>{title}</h1>
            <h1 id='sectionTitleBlack'>{title}</h1>
        </div>
    )
}

export default SectionTitle;
