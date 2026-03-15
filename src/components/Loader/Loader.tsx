import styles from './Loader.module.scss'

type LoaderSize = 'small' | 'medium' | 'large'

export type LoaderProps = {
  text?: string
  size?: LoaderSize
  fullScreen?: boolean
  className?: string
}

const sizeToClassMap: Record<LoaderSize, string> = {
  small: styles.spinnerSmall,
  medium: styles.spinnerMedium,
  large: styles.spinnerLarge,
}

const Loader = ({ text = 'Загрузка...', size = 'medium', fullScreen = false, className }: LoaderProps) => {
  const loaderClassName = [styles.loader, fullScreen ? styles.fullScreen : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={loaderClassName} role='status' aria-live='polite'>
      <span className={`${styles.spinner} ${sizeToClassMap[size]}`} aria-hidden='true' />
      {text ? <span className={styles.text}>{text}</span> : null}
    </div>
  )
}

export default Loader
