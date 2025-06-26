import { useCallback } from 'react';

export default function useMemberActions() {
    const handleStarClick = useCallback(() => {
        console.log('🌟 Star button clicked');
    }, []);
    const handleCallClick = useCallback(() => {
        console.log('📞 Call button clicked');
    }, []);
    const handleTextChatClick = useCallback(() => {
        console.log('💬 Text chat button clicked');
    }, []);
    const handleMessageClick = useCallback(() => {
        console.log('📧 Message button clicked');
    }, []);
    const handleWatchClick = useCallback(() => {
        console.log('👁️‍🗨️ Watch button clicked');
    }, []);
    const handleMedicalClick = useCallback(() => {
        console.log('🏥 Medical button clicked');
    }, []);

    return {
        handleStarClick,
        handleCallClick,
        handleTextChatClick,
        handleMessageClick,
        handleWatchClick,
        handleMedicalClick
    };
}
