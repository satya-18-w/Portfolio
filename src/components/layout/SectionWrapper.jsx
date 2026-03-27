import React, { forwardRef } from 'react';

/**
 * Structural parent enforcing vertical rhythm margins for major block divisions.
 */
const SectionWrapper = forwardRef(({ id, children, className = '', style = {} }, ref) => {
    return (
        <section 
            id={id} 
            ref={ref}
            className={`py-24 md:py-32 lg:py-40 relative overflow-hidden ${className}`} 
            style={style}
        >
            {children}
        </section>
    );
});

SectionWrapper.displayName = 'SectionWrapper';
export default SectionWrapper;
