import React, { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { DISTRICTS } from '../../three/metaverse/DistrictBuilding';

// ── Lazy-loaded content panels ────────────────────────────────────────
const ProjectsContent = lazy(() => import('./panels/ProjectsPanel'));
const SkillsContent = lazy(() => import('./panels/SkillsPanel'));
const EducationContent = lazy(() => import('./panels/EducationPanel'));
const FutureContent = lazy(() => import('./panels/FuturePanel'));
const ContactContent = lazy(() => import('./panels/ContactPanel'));

const PANEL_MAP = {
    projects: ProjectsContent,
    skills: SkillsContent,
    education: EducationContent,
    future: FutureContent,
    contact: ContactContent,
};

function PanelLoader() {
    const { theme } = useTheme();
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            color: theme.primary,
            fontFamily: theme.fontMono,
            fontSize: 14,
        }}>
            Loading...
        </div>
    );
}

export default function DistrictPanel({ activeDistrict, onClose }) {
    const { theme } = useTheme();

    const district = DISTRICTS.find(d => d.id === activeDistrict);
    const ContentComponent = activeDistrict ? PANEL_MAP[activeDistrict] : null;

    return (
        <AnimatePresence>
            {activeDistrict && district && ContentComponent && (
                <motion.div
                    key={activeDistrict}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: 420,
                        maxWidth: '90vw',
                        height: '100vh',
                        zIndex: 50,
                        background: 'rgba(3,0,20,0.88)',
                        backdropFilter: 'blur(20px)',
                        borderLeft: `1px solid ${theme.primary}25`,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 24px',
                        borderBottom: `1px solid ${theme.surfaceBorder}`,
                    }}>
                        <div>
                            <div style={{
                                fontFamily: theme.fontMono,
                                fontSize: 10,
                                color: theme.textMuted,
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                marginBottom: 4,
                            }}>
                                {district.icon} District
                            </div>
                            <div style={{
                                fontFamily: theme.fontHeading,
                                fontSize: 20,
                                fontWeight: 700,
                                color: theme.text,
                            }}>
                                {district.name}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: `1px solid ${theme.primary}40`,
                                color: theme.primary,
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontFamily: theme.fontMono,
                                fontSize: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 24px', flex: 1 }}>
                        <Suspense fallback={<PanelLoader />}>
                            <ContentComponent theme={theme} />
                        </Suspense>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
