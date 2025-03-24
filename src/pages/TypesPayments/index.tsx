import { useState } from "react"
import { BsCreditCard, BsJustify } from "react-icons/bs"
import { SiPix } from "react-icons/si"

const TypesPayments = () => {

    const [activeTab, setActiveTab] = useState('boleto')

    return (
        <div className="p-5 text-white">
            <h1 className="text-[26px] font-bold mb-5">Escolha o método de pagamento</h1>
        
            <div className="flex justify-between items-center gap-3">
                {['boleto','cartao','pix'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full flex items-center justify-center gap-2 py-6 rounded-[3px] mb-4 cursor-pointer ${activeTab === tab ? 'bg-neutral-900' : 'bg-neutral-800'} `}
                    >
                        {tab === 'boleto' ? <BsJustify /> : tab === 'cartao' ? <BsCreditCard /> : <SiPix />} {tab}
                    </button>
                ))}
            </div>

            <div className="p-4">
                {activeTab === "boleto" && <p>Pague com Boleto.</p>}
                {activeTab === "cartao" && <p>Pague com Cartão de Crédito/Débito.</p>}
                {activeTab === "pix" && <p>Pague via Pix instantaneamente.</p>}
            </div>
        </div>
    )
}

export default TypesPayments