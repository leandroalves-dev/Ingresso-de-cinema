import './Modal.css';
 
const Modal = ({ title, children }) => {
    return (
       <div className="modal">
            <div className="modal-content">
                <h3>{title}</h3>
                {children} {/* Renderiza os filhos passados para o modal */}
            </div>
       </div>
    );
};

export default Modal