
import React from 'react';
import MotionWrapper from './MotionWrapper';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <MotionWrapper>
            <div className="w-full h-full">{children}</div>
        </MotionWrapper>
    )
}

export default PageWrapper
