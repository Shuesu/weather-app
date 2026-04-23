import type {ReactNode} from 'react'
import styles from './MainLayout.module.css'

interface Props {
    sidebar: ReactNode
    content: ReactNode
}

export function MainLayout({ sidebar, content }: Props) {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>{sidebar}</aside>
            <main className={styles.content}>{content}</main>
        </div>
    )
}