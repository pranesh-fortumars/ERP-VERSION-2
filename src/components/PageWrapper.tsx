
import React from 'react';
import MotionWrapper from './MotionWrapper';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <MotionWrapper>
            <div className="p-6">{children}</div>
        </MotionWrapper>
    )
}

export default PageWrapper
