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
        <section className="combos-page text-white" aria-labelledby="combos-title">
            <header className="combos-header">
                <p className="combos-eyebrow">Sua experiência · etapa 3 de 5</p>
                <h1 id="combos-title">Que tal uma pipoca, bebida ou doce pra acompanhar o filme?</h1>
                <p>Escolha seus favoritos e deixe sua sessão ainda mais especial.</p>
            </header>

            <div className="combos-grid">
                {combos.map((combo) => (
                    <article key={combo.id} className="combo-card">
                        <div className="combo-card-media">
                            <img src={combo.imagem} alt={combo.title} />
                        </div>
                        <div className="combo-card-content">
                            <div className="combo-card-heading">
                                <h2>{combo.title}</h2>
                                <span aria-hidden="true">CineSphere</span>
                            </div>
                            <p className="combo-card-description">{combo.description}</p>
                            <div className="combo-card-footer">
                                <div className="combo-card-price">
                                    <strong>R$ {combo.price.toFixed(2)}</strong>
                                    <span>+ taxa de R$ {combo.tax.toFixed(2)}</span>
                                </div>
                                <QuantityButtons
                                    quantity={selectedCombos.find((cmbo) => cmbo.id === combo.id)?.quantity || 0}
                                    onIncrement={() => addCombo(combo)}
                                    onDecrement={() => removeCombo(combo.id)}
                                />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Combos
