const experienceData = [
    {
        company: 'CED Tunisia',
        role: 'Software Engineer – Full-Stack Development (.NET / Angular)',
        startDate: 'Oct 2022',
        endDate: 'Mar 2026',
        isCurrent: false,
        location: 'Tunis, Tunisia',
        description: [
            'Diagnosed and resolved serious production issues using detailed log analysis and improving observability.',
            'Developed modular RESTful APIs using .NET 6 to simplify integration across services.',
            'Integrated multiple RESTful APIs over 6 different Angular projects by designing and developing user friendly interfaces.',
            'Migrated 6 Angular 4 applications to Angular 13+, enhancing frontend stability and maintainability.',
            'Refactored and optimized .NET 6 services with infrastructure engineers to deliver better backend and database performance.',
            'Built and maintained CI/CD pipelines using Azure DevOps, accelerating deployment and reducing release errors.',
            'Mentored junior developers and supervised interns by conducting code reviews for best practices.',
            'Introduced and implemented API documentation using Markdown files and Mermaid diagrams.',
        ],
        techStack: [
            'C#',
            '.NET 6',
            'Angular',
            'TypeScript',
            'SQL Server',
            'Azure DevOps',
            'Git',
            'xUnit',
        ],
    },
    {
        company: 'CED Tunisia',
        role: 'Graduate Intern – Full-Stack & Data Science',
        startDate: 'Feb 2022',
        endDate: 'Jul 2022',
        isCurrent: false,
        location: 'Tunis, Tunisia',
        description: [
            'Created a Python-based machine learning model for invoice categorization, reaching 90% accuracy.',
            'Developed APIs using .NET 6 to handle invoice storage and retrieval using Azure Blob Storage and SQL Server.',
            'Designed and implemented user interfaces to display grids and details of classified invoices using Angular 14.',
            'Delivered a frontend dashboard using Angular 14 with Microsoft Graph API integration.',
            'Designed architecture diagrams and technical documentation to aid in onboarding.',
        ],
        techStack: ['C#', '.NET 6', 'Angular 14', 'Python', 'Azure Blob Storage', 'SQL Server'],
    },
    {
        company: 'Millenia Engineering',
        role: 'Software Engineering Intern – Backend & Data Systems',
        startDate: 'Jun 2021',
        endDate: 'Aug 2021',
        isCurrent: false,
        location: 'Bizerte, Tunisia',
        description: [
            'Implemented a Node.js telemetry service that decodes industrial signals from Modbus analyzers.',
            'Designed MongoDB schemas for efficient storage and retrieval of time-series data.',
            'Automated test checks to validate data flow and improve debugging efficiency.',
        ],
        techStack: ['Node.js', 'JavaScript', 'Angular', 'MongoDB'],
    },
];

function Experience() {
    return (
        <section id="experience" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Experience</p>
                <h2 style={styles.sectionTitle}>Where I've worked</h2>

                <div style={styles.timeline}>
                    {experienceData.map((exp, index) => (
                        <div key={index} style={styles.timelineItem}>
                            {/* Left side - timeline line and dot */}
                            <div style={styles.timelineLeft}>
                                <div style={styles.dot} />
                                {/* Only render the line if not the last item */}
                                {index < experienceData.length - 1 && <div style={styles.line} />}
                            </div>

                            {/* Right side - content */}
                            <div style={styles.timelineContent}>
                                <div style={styles.cardHeader}>
                                    <div>
                                        <h3 style={styles.role}>{exp.role}</h3>
                                        <p style={styles.company}>
                                            {exp.company} — {exp.location}
                                        </p>
                                    </div>
                                    <span style={styles.dateTag}>
                                        {exp.startDate} → {exp.endDate}
                                    </span>
                                </div>

                                <ul style={styles.descriptionList}>
                                    {exp.description.map((point, i) => (
                                        <li key={i} style={styles.descriptionItem}>
                                            <span style={styles.bullet}>▹</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div style={styles.techRow}>
                                    {exp.techStack.map((tech) => (
                                        <span key={tech} style={styles.techBadge}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
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
