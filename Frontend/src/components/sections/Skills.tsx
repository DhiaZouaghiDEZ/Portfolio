// Placeholder data pulled from your resume - will be replaced with API data later
const skillsData = [
    {
        category: 'Programming Languages',
        skills: ['C#', 'TypeScript', 'Python', 'JavaScript'],
    },
    {
        category: 'Frameworks & Technologies',
        skills: ['.NET Framework', '.NET Core', 'Angular', 'React', 'Node.js', 'WCF'],
    },
    {
        category: 'Cloud & DevOps',
        skills: [
            'Azure Cloud',
            'Azure DevOps',
            'Docker',
            'CI/CD',
            'Azure Functions',
            'Azure Blob Storage',
            'Azure Logic Apps',
        ],
    },
    {
        category: 'Databases',
        skills: ['MS SQL Server', 'MongoDB', 'Entity Framework'],
    },
    {
        category: 'Testing & Tools',
        skills: [
            'xUnit',
            'Postman',
            'SoapUI',
            'Git',
            'GitHub',
            'TFS',
            'Visual Studio',
            'VS Code',
            'Redgate',
            'Application Insights',
        ],
    },
    {
        category: 'Practices',
        skills: [
            'Clean Architecture',
            'SOLID Principles',
            'RESTful API Design',
            'Agile/Scrum',
            'Unit Testing',
            'Integration Testing',
            'Code Review',
        ],
    },
];

// Primary skills to highlight with accent color
const primarySkills = [
    'C#',
    'TypeScript',
    '.NET Core',
    'Angular',
    'Azure Cloud',
    'Docker',
    'React',
];

function Skills() {
    return (
        <section id="skills" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Skills</p>
                <h2 style={styles.sectionTitle}>What I work with</h2>

                <div style={styles.categoriesGrid}>
                    {skillsData.map((group) => (
                        <div key={group.category} style={styles.categoryCard}>
                            <h3 style={styles.categoryTitle}>{group.category}</h3>
                            <div style={styles.badgesRow}>
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        style={
                                            primarySkills.includes(skill)
                                                ? styles.badgeAccent
                                                : styles.badge
                                        }
                                    >
                                        {skill}
                                    </span>
                                ))}
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
    categoriesGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    categoryCard: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '20px',
    },
    categoryTitle: {
        fontSize: '12px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '14px',
        fontWeight: '500',
    },
    badgesRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    },
    badge: {
        fontSize: '12px',
        color: '#94a3b8',
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        padding: '4px 12px',
        borderRadius: '20px',
    },
    badgeAccent: {
        fontSize: '12px',
        color: '#6366f1',
        background: 'rgba(99, 102, 241, 0.1)',
        border: '0.5px solid rgba(99, 102, 241, 0.4)',
        padding: '4px 12px',
        borderRadius: '20px',
    },
};

export default Skills;
