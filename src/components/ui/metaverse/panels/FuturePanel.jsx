import React from 'react';

const FUTURE_PROJECTS = [
    {
        title: 'AI Agents',
        status: 'In Progress',
        description: 'Autonomous AI agents for code generation, debugging, and deployment automation.',
        tech: ['Go', 'LangGraph', 'Python', 'gRPC'],
    },
    {
        title: 'Distributed Systems Platform',
        status: 'Planning',
        description: 'Scalable platform for orchestrating distributed workloads with fault tolerance and auto-scaling.',
        tech: ['Go', 'Kubernetes', 'etcd', 'gRPC'],
    },
    {
        title: 'ML Infrastructure Tools',
        status: 'Research',
        description: 'End-to-end ML infrastructure: model training pipelines, feature stores, and serving infrastructure.',
        tech: ['Python', 'PyTorch', 'Kubernetes', 'Redis'],
    },
];

export default function FuturePanel({ theme }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
                fontFamily: theme.fontBody,
                fontSize: 13,
                color: theme.textMuted,
                lineHeight: 1.6,
                marginBottom: 8,
            }}>
                Holographic blueprints — projects under construction.
            </div>

            {FUTURE_PROJECTS.map((p, i) => (
                <div key={i} style={{
                    background: theme.surface,
                    border: `1px solid ${theme.surfaceBorder}`,
                    borderRadius: 10,
                    padding: 16,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, right: 0,
                        width: 60, height: 60,
                        background: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${theme.primary}08 4px, ${theme.primary}08 5px)`,
                    }} />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                    }}>
                        <span style={{
                            fontFamily: theme.fontMono,
                            fontSize: 9,
                            color: theme.highlight,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            border: `1px solid ${theme.highlight}30`,
                            borderRadius: 3,
                            padding: '2px 6px',
                        }}>
                            {p.status}
                        </span>
                    </div>
                    <div style={{
                        fontFamily: theme.fontHeading,
                        fontSize: 15,
                        fontWeight: 700,
                        color: theme.text,
                        marginBottom: 6,
                    }}>
                        {p.title}
                    </div>
                    <div style={{
                        fontFamily: theme.fontBody,
                        fontSize: 12,
                        color: theme.textMuted,
                        lineHeight: 1.5,
                        marginBottom: 10,
                    }}>
                        {p.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {p.tech.map((t) => (
                            <span key={t} style={{
                                fontFamily: theme.fontMono,
                                fontSize: 10,
                                color: theme.secondary,
                                border: `1px solid ${theme.secondary}25`,
                                borderRadius: 3,
                                padding: '1px 6px',
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
