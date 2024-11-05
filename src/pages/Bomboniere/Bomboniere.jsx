import './Bomboniere.css';
import { useContext } from 'react';

//ContextAPi
import { PaymentContext } from '../../context/PaymentContext';

//json
import bomboniere from '../../data/bomboniere.json';

//components
import QuantityButtons from '../../components/QuantityButtons/QuantityButtons';

const Bomboniere = () => {

    const {selectedCombos, addCombo, removeCombo} = useContext(PaymentContext);

    //console.log('combos selecionados', selectedCombos)

    return (
        <div className='container-bomboniere'>
            <h2>Que tal uma pipoca, bebida ou doce pra acompanhar o filme?</h2>

            <div className="combo">
                {bomboniere.combos.map((combo, index) => (
                    <>
                        <div className="grid-combo" key={index}>
                            <div className="img">
                                <img src={combo.imagem} alt={combo.title} />
                            </div>
                            <div className="description">
                                <h2>{combo.title}</h2>
                                <p>{combo.description}</p>
                                <div className='grid-price'>
                                    <div>
                                        <span className="price">R$ {combo.price.toFixed(2)}</span>
                                        <span className="taxa">+ taxa de R$ {combo.tax.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <QuantityButtons
                                            quantity={selectedCombos[combo.id]?.quantity || 0}
                                            onIncrement={() => addCombo(combo)}
                                            onDecrement={() => removeCombo(combo.id)}
                                        /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Bomboniere