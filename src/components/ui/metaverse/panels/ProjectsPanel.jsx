import React from 'react';

const PROJECTS = [
    {
        id: '01',
        category: 'ML · DEEP LEARNING',
        title: 'Uber Demand Prediction',
        description: 'Deep learning model for predicting ride demand across city zones using spatiotemporal data, weather, and event features.',
        tech: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'Matplotlib'],
        color: '#00F5FF',
    },
    {
        id: '02',
        category: 'BACKEND · DISTRIBUTED',
        title: 'RAPID-RIDE Backend',
        description: 'High-performance backend service for a ride-sharing platform with real-time matching, routing, and payment processing.',
        tech: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
        color: '#8B5CF6',
    },
    {
        id: '03',
        category: 'ML · RECOMMENDATION',
        title: 'Hybrid Music Recommendation System',
        description: 'Recommendation engine combining collaborative filtering with content-based methods for personalized music suggestions.',
        tech: ['Python', 'PyTorch', 'LangGraph', 'FastAPI', 'Redis'],
        color: '#FF006E',
    },
];

export default function ProjectsPanel({ theme }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROJECTS.map((p) => (
                <div key={p.id} style={{
                    background: theme.surface,
                    border: `1px solid ${theme.surfaceBorder}`,
                    borderRadius: 10,
                    padding: 16,
                }}>
                    <div style={{
                        fontFamily: theme.fontMono,
                        fontSize: 10,
                        color: theme.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        marginBottom: 6,
                    }}>
                        {p.category}
                    </div>
                    <div style={{
                        fontFamily: theme.fontHeading,
                        fontSize: 16,
                        fontWeight: 700,
                        color: p.color,
                        marginBottom: 6,
                    }}>
                        {p.title}
                    </div>
                    <div style={{
                        fontFamily: theme.fontBody,
                        fontSize: 13,
                        color: theme.textMuted,
                        lineHeight: 1.5,
                        marginBottom: 10,
                    }}>
                        {p.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {p.tech.map((t) => (
                            <span key={t} style={{
                                fontFamily: theme.fontMono,
                                fontSize: 10,
                                color: theme.primary,
                                border: `1px solid ${theme.primary}30`,
                                borderRadius: 4,
                                padding: '2px 8px',
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
