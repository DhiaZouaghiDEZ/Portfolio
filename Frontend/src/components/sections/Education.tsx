const educationData = [
    {
        institution: 'National School of Computer Science (ENSI)',
        degree: 'Computer Science Engineering Degree',
        field: 'Software Engineering',
        startDate: 'Sept 2019',
        endDate: 'Sept 2022',
        location: 'Manouba, Tunisia',
        description:
            'Prestigious engineering school, one of the top computer science institutions in Tunisia and North Africa. Graduated with a degree in Software Engineering covering algorithms, data structures, software architecture, databases, and distributed systems.',
    },
    {
        institution: 'Preparatory Institute for Engineering Studies of Bizerte (IPEIB)',
        degree: 'Physics and Chemistry for Engineering',
        field: 'Preparatory Classes',
        startDate: 'Sept 2017',
        endDate: 'Sept 2019',
        location: 'Bizerte, Tunisia',
        description:
            'Intensive two-year preparatory program for engineering school entrance exams. Ranked 123rd among 1000+ participants nationally.',
    },
];

const certificatesData = [
    {
        title: 'AZ-204: Microsoft Azure Developer Associate',
        issuer: 'Microsoft',
        date: 'Aug 2025',
    },
    {
        title: 'TOEIC: Professional Proficiency in English',
        issuer: 'TOEIC Amideast',
        date: 'Apr 2022',
        score: '975/990',
    },
];

function Education() {
    return (
        <section id="education" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Education</p>
                <h2 style={styles.sectionTitle}>Academic background</h2>

                {/* Education cards */}
                <div style={styles.cardsWrapper}>
                    {educationData.map((edu, index) => (
                        <div key={index} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div>
                                    <h3 style={styles.degree}>{edu.degree}</h3>
                                    <p style={styles.institution}>{edu.institution}</p>
                                    <p style={styles.location}>{edu.location}</p>
                                </div>
                                <span style={styles.dateTag}>
                                    {edu.startDate} → {edu.endDate}
                                </span>
                            </div>
                            <p style={styles.description}>{edu.description}</p>
                        </div>
                    ))}
                </div>

                {/* Certificates subsection */}
                <div style={styles.certificatesSection}>
                    <p style={styles.subLabel}>Certifications & Achievements</p>
                    <div style={styles.certificatesGrid}>
                        {certificatesData.map((cert, index) => (
                            <div key={index} style={styles.certCard}>
                                <div style={styles.certIcon}>🏆</div>
                                <div>
                                    <p style={styles.certTitle}>{cert.title}</p>
                                    <p style={styles.certMeta}>
                                        {cert.issuer} — {cert.date}
                                        {cert.score && (
                                            <span style={styles.certScore}> · {cert.score}</span>
                                        )}
                                    </p>
                                </div>
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
