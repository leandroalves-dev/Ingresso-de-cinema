import './Precos.css';

//json
import prices from '../../data/prices.json';

const Precos = () => {
	return (
		<div className='container'>
			<h1>Tabela de valores</h1>

			<div className="grid-prices">

				{Object.entries(prices.sessions).map(([sessionType, price], index) => (
					<div className="tablePrice" key={index}>
							<div className="list-price">
								<div className='group title'>
									<p>Sessão {sessionType}</p>
								<p>Inteira</p>
								<p>Meia</p>
							</div>
							<div className='group'>
								<div>
									<p>{price.weekdays.days}</p>
									<p>{price.weekends.days}</p>
								</div>
								<div>
									<p>R$ {price.weekends.fullPrice.toFixed(2)}</p>
									<p>R$ {price.weekends.halfPrice.toFixed(2)}</p>
								</div>
								<div>
									<p>R$ {price.weekdays.fullPrice.toFixed(2)}</p>
									<p>R$ {price.weekdays.halfPrice.toFixed(2)}</p>
								</div>
							</div>
						</div>
					</div>
				))}
				<p>As promoções não se aplicam em feriados e pontos facultativos; nessas datas, serão considerados os preços de final de semana. Descontos promocionais também não são acumulativos com outros benefícios, incluindo meia-entrada. Para sessões de pré-estreia realizadas às quartas-feiras, os valores cobrados serão os mesmos dos praticados aos sábados e domingos.</p>
			</div>

		</div>
	)
}

export default Precos