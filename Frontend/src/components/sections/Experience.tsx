import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Experiences } from '../../types';

// Helper to format dates from ISO string
function formatDate(dateStr?: string): string {
    if (!dateStr) return 'Present';
    return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function Experience() {
    const { data: experiences, loading, error } = useApi<Experiences[]>(portfolioApi.getExperience);

    if (loading) return <div style={styles.state}>Loading...</div>;
    if (error || !experiences) return <div style={styles.state}>Failed to load experience.</div>;

    return (
        <section id="experience" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Experience</p>
                <h2 style={styles.sectionTitle}>Where I've worked</h2>

                <div style={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="responsive-timeline-item"
                            style={styles.timelineItem}
                        >
                            <div style={styles.timelineLeft}>
                                <div style={styles.dot} />
                                {index < experiences.length - 1 && <div style={styles.line} />}
                            </div>

                            <div style={styles.timelineContent}>
                                <div className="card-header" style={styles.cardHeader}>
                                    <div>
                                        <h3 style={styles.role}>{exp.role}</h3>
                                        <p style={styles.company}>{exp.company}</p>
                                    </div>
                                    <span style={styles.dateTag}>
                                        {formatDate(exp.startDate)} →{' '}
                                        {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>

                                {exp.description && (
                                    <ul style={styles.descriptionList}>
                                        {exp.description
                                            .split('\n')
                                            .filter(Boolean)
                                            .map((point, i) => (
                                                <li key={i} style={styles.descriptionItem}>
                                                    <span style={styles.bullet}>▹</span>
                                                    {point}
                                                </li>
                                            ))}
                                    </ul>
                                )}

                                {exp.techStack && (
                                    <div style={styles.techRow}>
                                        {exp.techStack.split(',').map((tech) => (
                                            <span key={tech} style={styles.techBadge}>
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
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
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
    },
    timelineItem: {
        display: 'flex',
        gap: '24px',
    },
    timelineLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#6366f1',
        border: '2px solid #0f0f13',
        outline: '1px solid #6366f1',
        flexShrink: 0,
    },
    line: {
        width: '1px',
        flex: 1,
        background: '#2a2a3a',
        margin: '6px 0',
    },
    timelineContent: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
        flex: 1,
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        gap: '16px',
    },
    role: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '4px',
    },
    company: {
        fontSize: '13px',
        color: '#6366f1',
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
    descriptionList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    descriptionItem: {
        fontSize: '13px',
        color: '#94a3b8',
        lineHeight: '1.7',
        display: 'flex',
        gap: '10px',
    },
    bullet: {
        color: '#6366f1',
        flexShrink: 0,
        marginTop: '1px',
    },
    techRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '0.5px solid #2a2a3a',
    },
    techBadge: {
        fontSize: '11px',
        color: '#94a3b8',
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        padding: '3px 10px',
        borderRadius: '20px',
    },
};

export default Experience;
