// Placeholder data - will be replaced with API data later
import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Profile } from '../../types';

function About() {
    const { data, loading, error } = useApi<Profile[]>(portfolioApi.getProfile);

    // First or default since we only have one profile
    const profile = data?.[0] ?? null;

    if (loading) return <div style={styles.state}>Loading...</div>;
    if (error || !profile) return <div style={styles.state}>Failed to load profile.</div>;

    return (
        <section id="about" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>About</p>
                <h2 style={styles.sectionTitle}>Who I am</h2>

                <div style={styles.grid}>
                    <div style={styles.left}>
                        <p style={styles.summary}>{profile.bio}</p>
                    </div>

                    <div style={styles.card}>
                        {[
                            { label: 'Name', value: profile.name },
                            { label: 'Title', value: profile.title },
                            { label: 'Email', value: profile.email },
                            { label: 'Phone', value: profile.phone },
                        ]
                            .filter((d) => d.value)
                            .map((detail) => (
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
    state: {
        padding: '100px 24px',
        textAlign: 'center' as const,
        color: '#94a3b8',
        fontSize: '14px',
    },
};

export default About;
