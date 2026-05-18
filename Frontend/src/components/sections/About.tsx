// Placeholder data - will be replaced with API data later
const aboutData = {
    summary:
        'I am a Software Engineer with 4 years of professional experience, starting my career as an intern at CED Tunisia and growing into a fully-fledged engineer. I specialize in building scalable, clean, and maintainable applications using .NET, Angular, and Azure. I am passionate about clean architecture, cloud infrastructure, and writing code that lasts.',
    details: [
        { label: 'Location', value: 'Hamburg, Germany' },
        { label: 'Experience', value: '4 Years' },
        { label: 'Education', value: 'ENSI — Software Engineering' },
        { label: 'Languages', value: 'Arabic, French, English, German (learning)' },
    ],
};

function About() {
    return (
        <section id="about" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>About</p>
                <h2 style={styles.sectionTitle}>Who I am</h2>

                <div style={styles.grid}>
                    {/* Left - summary text */}
                    <div style={styles.left}>
                        <p style={styles.summary}>{aboutData.summary}</p>
                    </div>

                    {/* Right - details card */}
                    <div style={styles.card}>
                        {aboutData.details.map((detail) => (
                            <div key={detail.label} style={styles.detailRow}>
                                <span style={styles.detailLabel}>{detail.label}</span>
                                <span style={styles.detailValue}>{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        padding: '100px 0',
        borderBottom: '0.5px solid #2a2a3a',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
    },
    sectionLabel: {
        fontSize: '11px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        marginBottom: '12px',
    },
    sectionTitle: {
        fontSize: '28px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '48px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'start',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    summary: {
        fontSize: '15px',
        color: '#94a3b8',
        lineHeight: '1.9',
    },
    card: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    detailRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        paddingBottom: '16px',
        borderBottom: '0.5px solid #2a2a3a',
    },
    detailLabel: {
        fontSize: '11px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    detailValue: {
        fontSize: '14px',
        color: '#e2e8f0',
    },
};

export default About;
