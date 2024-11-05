import './Classification.css';

const Classification = ({ onMovie }) => {
    return (
        <>
            {onMovie && (
                <span className={`classification ${onMovie.classification === 'Livre' ? 'idade-livre' : onMovie.classification === '+12' ? 'idade-12' : onMovie.classification === '+16' ? 'idade-16' : 'idade-18' }`}>
                    {onMovie.classification}
                </span>
            )}
            
        </>
    )
}

export default Classification