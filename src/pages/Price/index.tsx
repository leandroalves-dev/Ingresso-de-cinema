//hook
import { useMovies } from "../../hooks/useMovies"

//components
import Container from '../../components/Container'

const Price = () => {

    const {prices} = useMovies()

    if (!prices) return 

    return (
      <Container>
        <h1 className="text-white text-[28px] mt-5">Tabela de Preço</h1>
          <div className="text-white w-full max-sm:text-[11px]">
                {Object.entries(prices.sessions).map(([sessionType, price], index) => (
					<div className="w-full mb-2 border-1 border-neutral-800 my-8" key={index}>
							
                        <div className='grid grid-cols-3 bg-neutral-800'>
                            <p className="p-6">Sessão {sessionType}</p>
                            <p className="p-6">Inteira</p>
                            <p className="p-6">Meia</p>
                        </div>

                        <div className='grid grid-cols-3'>
                            <div className="w-full">
                                <p className="p-6 border-b-1 border-r-1 border-neutral-800">{price.weekdays.days}</p>
                                <p className="p-6 border-r-1 border-neutral-800">{price.weekends.days}</p>
                            </div>
                            <div className="w-full">
                                <p className="p-6 border-b-1 border-r-1 border-neutral-800">R$ {price.weekends.fullPrice.toFixed(2)}</p>
                                <p className="p-6 border-r-1 border-neutral-800">R$ {price.weekends.halfPrice.toFixed(2)}</p>
                            </div>
                            <div className="w-full">
                                <p className="p-6 border-b-1 border-neutral-800">R$ {price.weekdays.fullPrice.toFixed(2)}</p>
                                <p className="p-6">R$ {price.weekdays.halfPrice.toFixed(2)}</p>
                            </div>
                        </div>
						    
					</div>
				))}
          </div>
          <p className="text-neutral-700 italic my-6">As promoções não se aplicam em feriados e pontos facultativos; nessas datas, serão considerados os preços de final de semana. Descontos promocionais também não são acumulativos com outros benefícios, incluindo meia-entrada. Para sessões de pré-estreia realizadas às quartas-feiras, os valores cobrados serão os mesmos dos praticados aos sábados e domingos.</p>
      </Container>
    )
  }
  
  export default Price
  