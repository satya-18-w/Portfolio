import React from 'react';

/**
 * Global Container to enforce strict max-width (1100-1200px) and centering.
 * Replaces arbitrary free-form max-width classes across the portfolio.
 */
export default function Container({ children, className = '' }) {
    return (
        <div className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-base ${className}`}>
            {children}
        </div>
    );
}
