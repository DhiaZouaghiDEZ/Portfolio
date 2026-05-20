import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Educations } from '../../types';

function formatDate(dateStr?: string): string {
    if (!dateStr) return 'Present';
    return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function Education() {
    const { data: educations, loading, error } = useApi<Educations[]>(portfolioApi.getEducation);

    if (loading) return <div style={styles.state}>Loading...</div>;
    if (error || !educations) return <div style={styles.state}>Failed to load education.</div>;

    return (
        <section id="education" className="education" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Education</p>
                <h2 style={styles.sectionTitle}>Academic background</h2>

                <div style={styles.cardsWrapper}>
                    {educations.map((edu) => (
                        <div key={edu.id} style={styles.card}>
                            <div className="card-header" style={styles.cardHeader}>
                                <div>
                                    <h3 style={styles.degree}>{edu.degree}</h3>
                                    <p style={styles.institution}>{edu.institution}</p>
                                    {edu.fieldOfStudy && (
                                        <p style={styles.field}>{edu.fieldOfStudy}</p>
                                    )}
                                </div>
                                <span style={styles.dateTag}>
                                    {formatDate(edu.startDate)} →{' '}
                                    {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                                </span>
                            </div>
                            {edu.description && <p style={styles.description}>{edu.description}</p>}
                        </div>
                    ))}
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
    cardsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '48px',
    },
    card: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '24px',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '12px',
    },
    degree: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '4px',
    },
    institution: {
        fontSize: '13px',
        color: '#6366f1',
        marginBottom: '2px',
    },
    location: {
        fontSize: '12px',
        color: '#94a3b8',
    },
    dateTag: {
        fontSize: '11px',
        color: '#6366f1',
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        padding: '4px 12px',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    description: {
        fontSize: '13px',
        color: '#94a3b8',
        lineHeight: '1.8',
    },
    certificatesSection: {
        marginTop: '8px',
    },
    subLabel: {
        fontSize: '11px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        marginBottom: '20px',
    },
    certificatesGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    certCard: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
    },
    certIcon: {
        fontSize: '20px',
        flexShrink: 0,
    },
    certTitle: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '6px',
        lineHeight: '1.5',
    },
    certMeta: {
        fontSize: '12px',
        color: '#94a3b8',
    },
    certScore: {
        color: '#6366f1',
        fontWeight: '500',
    },
};

export default Education;
