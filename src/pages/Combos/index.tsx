import { useContext } from "react"

//hook
import { useMovies } from "../../hooks/useMovies"


//context
import { PaymentContext } from "../../context/PaymentContext"
import QuantityButtons from "../../components/QuantityButtons"

const Combos = () => {

    const paymentContext = useContext(PaymentContext)
    if(!paymentContext) throw new Error('Erro no provider')

    const { addCombo, removeCombo, selectedCombos } = paymentContext;
    const {combos} = useMovies()

    return (
        <div className="p-5 text-white">
            <h1 className="text-[26px] font-bold mb-5">Que tal uma pipoca, bebida ou doce pra acompanhar o filme?</h1>

            <div className="mt-10 grid lg:grid-cols-2 gap-4 md:grid-cols-1">

                {combos.map(combo => (
                    <div key={combo.id} className="flex p-2 bg-neutral-900 border-1 border-neutral-800">
                        <div className="mr-5">
                            <div className="w-16">
                                <img src={combo.imagem} alt={combo.title} />
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <h2 className="text-neutral-200 text-[20px] mb-2">{combo.title}</h2>
                                <p className="text-[14px] text-neutral-400 leading-5 mb-2">{combo.description}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-[#b09513] flex flex-col leading-5 mt-2">
                                    <span className="text-[14px] leading-3">R$ {combo.price.toFixed(2)}</span>
                                    <span className="text-[12px]">+ taxa de R$ {combo.tax.toFixed(2)}</span>
                                </div>
                                <div>
                                    <QuantityButtons
                                        quantity={selectedCombos.find(cmbo => cmbo.id === combo.id)?.quantity || 0}
                                        onIncrement={() => addCombo(combo)}
                                        onDecrement={() => removeCombo(combo.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        
        </div>
    )
}

export default Combos
