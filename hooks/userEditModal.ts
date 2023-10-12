import {create} from 'zustand';

interface EditModalStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;  
};

const useEditModal = create<EditModalStore> ((set) => ({
    onOpen: () => set({ isOpen: true}),
    isOpen: false,
    onClose: () => set({ isOpen: false }),
}));

export default useEditModal;