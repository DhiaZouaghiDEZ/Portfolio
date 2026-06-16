import { useState } from 'react';
import { portfolioApi } from '../../services/portfolioservice';

function Agent() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion) {
            setStatus('error');
            setErrorMessage('Please enter a question first.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        setAnswer('');

        try {
            const response = await portfolioApi.askAgent(trimmedQuestion);
            if (response.success) {
                setAnswer(response.answer);
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(response.error || 'Unable to answer your question right now.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Request failed. Please try again later.');
        }
    };

    return (
        <section id="agent" className="agent" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>AI Assistant</p>
                <h2 style={styles.sectionTitle}>Ask about Dhia and his resume</h2>
                <p style={styles.subtitle}>
                    Ask any question about Dhia's experience, education, projects, or skills. The
                    agent uses semantic retrieval and resume data to answer from the portfolio
                    content.
                </p>

                <div style={styles.card}>
                    <label style={styles.label} htmlFor="agent-question">
                        Your question
                    </label>
                    <textarea
                        id="agent-question"
                        style={styles.textarea}
                        placeholder="Ask something like 'What technologies does Dhia use?'"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        rows={4}
                    />

                    {status === 'error' && <p style={styles.errorMsg}>{errorMessage}</p>}
                    {status === 'success' && answer && (
                        <div style={styles.answerCard}>
                            <p style={styles.answerLabel}>Answer</p>
                            <div style={styles.answerText}>
                                {answer.split('\n').map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        style={{
                            ...styles.submitBtn,
                            opacity: status === 'loading' ? 0.6 : 1,
                        }}
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Thinking...' : 'Ask the AI'}
                    </button>
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
        marginBottom: '12px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#94a3b8',
        marginBottom: '40px',
        lineHeight: '1.7',
    },
    card: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    label: {
        fontSize: '12px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    textarea: {
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#e2e8f0',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        lineHeight: '1.7',
    },
    submitBtn: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '12px 28px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        alignSelf: 'flex-start',
        transition: 'opacity 0.2s',
    },
    answerCard: {
        background: '#0f172a',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '20px',
    },
    answerLabel: {
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    answerText: {
        color: '#e2e8f0',
        fontSize: '15px',
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    errorMsg: {
        fontSize: '13px',
        color: '#ef4444',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '0.5px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '10px 14px',
    },
};

export default Agent;
