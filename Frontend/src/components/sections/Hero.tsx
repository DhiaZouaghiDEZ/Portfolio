import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Profile } from '../../types';

function Hero() {
    const [visible, setVisible] = useState(false);
    const { data } = useApi<Profile[]>(portfolioApi.getProfile);
    const profile = data?.[0] ?? null;

    // Falls back to placeholder while loading
    const title = profile?.name ?? 'Dhiaeddine Zouaghi';
    const subtitle = profile ? `${profile.title}` : 'Software Engineer';
    const description = 'Passionate about building impactful software solutions.';

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" style={styles.section}>
            <div style={styles.container}>
                <div style={{ ...styles.content, opacity: visible ? 1 : 0 }}>
                    {
                        <span style={styles.availabilityTag}>
                            <span style={styles.dot} />
                            Available for opportunities
                        </span>
                    }

                    <h1 style={styles.heading}>
                        {title}
                        <br />
                        <span style={styles.accentText}>{subtitle}</span>
                    </h1>

                    <p style={styles.description}>{description}</p>

                    <div style={styles.buttons}>
                        <button style={styles.btnPrimary} onClick={() => scrollTo('projects')}>
                            View projects
                        </button>
                        <button style={styles.btnSecondary} onClick={() => scrollTo('contact')}>
                            Get in touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '0.5px solid #2a2a3a',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
    },
    content: {
        transition: 'opacity 0.6s ease',
    },
    availabilityTag: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        color: '#6366f1',
        background: '#1e1e2e',
        border: '0.5px solid rgba(99, 102, 241, 0.4)',
        padding: '5px 14px',
        borderRadius: '20px',
        marginBottom: '24px',
    },
    dot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#6366f1',
        display: 'inline-block',
    },
    heading: {
        fontSize: '48px',
        fontWeight: '500',
        color: '#e2e8f0',
        lineHeight: '1.15',
        marginBottom: '20px',
    },
    accentText: {
        color: '#6366f1',
    },
    description: {
        fontSize: '15px',
        color: '#94a3b8',
        maxWidth: '480px',
        lineHeight: '1.8',
        marginBottom: '32px',
    },
    buttons: {
        display: 'flex',
        gap: '12px',
    },
    btnPrimary: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
    },
    btnSecondary: {
        background: 'transparent',
        color: '#e2e8f0',
        border: '0.5px solid #2a2a3a',
        padding: '10px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
    },
};

export default Hero;
