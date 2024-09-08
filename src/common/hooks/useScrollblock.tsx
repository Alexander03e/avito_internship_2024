import { useEffect } from 'react';

export const useScrollblock = (isOpen: boolean) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
            return () => {
                document.body.style.overflowY = 'initial';
            };
        }
    }, [isOpen]);
};
