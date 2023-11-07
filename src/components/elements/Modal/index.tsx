import { ReactNode } from 'react'
import { Modal } from '@mui/material';

type IModal = {
    open: boolean
    onClose: () => void
    children: ReactNode
}

const ModalComponent = ({ open, onClose, children }: IModal) => {

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    {children}
                </>
            </Modal>
        </>
    )
}

export default ModalComponent