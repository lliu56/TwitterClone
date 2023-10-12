import {create} from 'zustand';

interface LoginModalStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;  
};

const useLoginModal = create<LoginModalStore> ((set) => ({
    onOpen: () => set({ isOpen: true}),
    isOpen: false,
    onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;