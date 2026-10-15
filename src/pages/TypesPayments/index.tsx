import { useContext, useState, type FormEvent } from "react";
import {
    Check,
    Copy,
    CreditCard,
    LockKeyhole,
    QrCode,
    ReceiptText,
    ShieldCheck,
} from "lucide-react";

import { PaymentContext } from "../../context/PaymentContext";
import { MovieContext } from "../../context/MovieContext";
import { SeatContext } from "../../context/SeatContext";

type PaymentMethod = "boleto" | "cartao" | "pix";

interface CardFormState {
    holder: string;
    number: string;
    expiry: string;
    cvv: string;
}

const paymentMethods: Array<{ id: PaymentMethod; label: string; description: string }> = [
    { id: "boleto", label: "Boleto", description: "Pague em até 1 dia útil" },
    { id: "cartao", label: "Cartão", description: "Crédito ou débito" },
    { id: "pix", label: "Pix", description: "Aprovação instantânea" },
];

const formatCurrency = (value: number) => (
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
);

const getMethodIcon = (method: PaymentMethod) => {
    if (method === "boleto") return <ReceiptText size={22} strokeWidth={1.8} />;
    if (method === "cartao") return <CreditCard size={22} strokeWidth={1.8} />;
    return <QrCode size={22} strokeWidth={1.8} />;
};

const TypesPayments = () => {
    const paymentContext = useContext(PaymentContext);
    const { selectedMovie } = useContext(MovieContext);
    const { selectedSeats } = useContext(SeatContext);

    if (!paymentContext) throw new Error("Erro no contexto de pagamento");

    const { total } = paymentContext;
    const [activeTab, setActiveTab] = useState<PaymentMethod>("boleto");
    const [simulationStatus, setSimulationStatus] = useState<PaymentMethod | null>(null);
    const [pixCopied, setPixCopied] = useState(false);
    const [cardForm, setCardForm] = useState<CardFormState>({ holder: "", number: "", expiry: "", cvv: "" });

    const pixCode = `CINESPHERE-${selectedMovie?.movie?.id ?? "SESSAO"}-${total.toFixed(2)}-${selectedSeats.join("-")}`;

    const updateCardField = (field: keyof CardFormState, value: string) => {
        setCardForm((current) => ({ ...current, [field]: value }));
    };

    const handleCardSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSimulationStatus("cartao");
    };

    const handleCopyPix = () => {
        if (navigator.clipboard) {
            void navigator.clipboard.writeText(pixCode).catch(() => undefined);
        }
        setPixCopied(true);
        setSimulationStatus("pix");
    };

    return (
        <div className="payment-page text-white">
            <header className="payment-page-header">
                <div>
                    <p className="payment-eyebrow">Etapa 4 de 5 · Finalização segura</p>
                    <h1>Escolha como pagar</h1>
                    <p className="payment-page-description">Revise seu pedido e selecione a forma de pagamento ideal para sua sessão.</p>
                </div>
                <div className="payment-security-badge">
                    <ShieldCheck size={17} />
                    <span>Simulação protegida</span>
                </div>
            </header>

            <section className="payment-method-section" aria-labelledby="payment-method-title">
                <div className="payment-section-heading">
                    <div>
                        <p className="payment-eyebrow">Pagamento</p>
                        <h2 id="payment-method-title">Selecione uma opção</h2>
                    </div>
                    <span>Escolha uma forma para simular</span>
                </div>

                <div className="payment-method-grid" role="tablist" aria-label="Métodos de pagamento">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === method.id}
                            className={`payment-method-card ${activeTab === method.id ? "is-active" : ""}`}
                            onClick={() => {
                                setActiveTab(method.id);
                                setSimulationStatus(null);
                                setPixCopied(false);
                            }}
                        >
                            <span className="payment-method-icon">{getMethodIcon(method.id)}</span>
                            <span className="payment-method-copy">
                                <strong>{method.label}</strong>
                                <small>{method.description}</small>
                            </span>
                            <span className="payment-method-indicator" aria-hidden="true"><Check size={14} /></span>
                        </button>
                    ))}
                </div>

                <div className="payment-simulation-panel" role="tabpanel">
                    {activeTab === "boleto" && (
                        <div className="payment-panel-content">
                            <div className="payment-panel-title">
                                <div className="payment-panel-icon payment-panel-icon-red"><ReceiptText size={21} /></div>
                                <div>
                                    <p className="payment-eyebrow">Boleto bancário</p>
                                    <h3>Finalize quando for melhor para você</h3>
                                </div>
                            </div>
                            <p className="payment-panel-description">Gere um boleto de demonstração com o valor do seu pedido. Nesta simulação, nenhuma cobrança será realizada.</p>
                            <div className="payment-detail-grid">
                                <div><span>Valor do pedido</span><strong>{formatCurrency(total)}</strong></div>
                                <div><span>Prazo de pagamento</span><strong>1 dia útil</strong></div>
                            </div>
                            <button type="button" className="payment-primary-action" onClick={() => setSimulationStatus("boleto")}>
                                Gerar boleto simulado <ReceiptText size={17} />
                            </button>
                            {simulationStatus === "boleto" && <p className="payment-success-message" role="status"><Check size={16} /> Boleto gerado para esta simulação.</p>}
                        </div>
                    )}

                    {activeTab === "cartao" && (
                        <div className="payment-panel-content">
                            <div className="payment-panel-title">
                                <div className="payment-panel-icon payment-panel-icon-cyan"><CreditCard size={21} /></div>
                                <div>
                                    <p className="payment-eyebrow">Cartão de crédito ou débito</p>
                                    <h3>Seus dados ficam apenas nesta simulação</h3>
                                </div>
                            </div>
                            <form className="payment-card-form" onSubmit={handleCardSubmit}>
                                <label>Nome no cartão<input required value={cardForm.holder} onChange={(event) => updateCardField("holder", event.target.value)} placeholder="Como está no cartão" autoComplete="cc-name" /></label>
                                <label>Número do cartão<input required value={cardForm.number} onChange={(event) => updateCardField("number", event.target.value)} placeholder="0000 0000 0000 0000" inputMode="numeric" maxLength={19} autoComplete="cc-number" /></label>
                                <div className="payment-card-form-row">
                                    <label>Validade<input required value={cardForm.expiry} onChange={(event) => updateCardField("expiry", event.target.value)} placeholder="MM/AA" inputMode="numeric" maxLength={5} autoComplete="cc-exp" /></label>
                                    <label>CVV<input required value={cardForm.cvv} onChange={(event) => updateCardField("cvv", event.target.value)} placeholder="123" inputMode="numeric" maxLength={4} autoComplete="cc-csc" /></label>
                                </div>
                                <button type="submit" className="payment-primary-action payment-primary-action-cyan">Simular pagamento <LockKeyhole size={16} /></button>
                            </form>
                            {simulationStatus === "cartao" && <p className="payment-success-message payment-success-message-cyan" role="status"><Check size={16} /> Pagamento aprovado na simulação.</p>}
                        </div>
                    )}

                    {activeTab === "pix" && (
                        <div className="payment-panel-content payment-pix-content">
                            <div className="payment-panel-title">
                                <div className="payment-panel-icon payment-panel-icon-cyan"><QrCode size={21} /></div>
                                <div>
                                    <p className="payment-eyebrow">Pix</p>
                                    <h3>Aprovação rápida para não perder a sessão</h3>
                                </div>
                            </div>
                            <div className="payment-pix-layout">
                                <div className="payment-qr-placeholder" aria-label="QR Code demonstrativo"><QrCode size={90} /></div>
                                <div>
                                    <p className="payment-panel-description">Use o código abaixo para representar o pagamento Pix do seu pedido.</p>
                                    <div className="payment-pix-code"><code>{pixCode}</code><button type="button" onClick={handleCopyPix} aria-label="Copiar código Pix"><Copy size={16} /></button></div>
                                    <button type="button" className="payment-primary-action payment-primary-action-cyan" onClick={handleCopyPix}>{pixCopied ? "Código copiado" : "Copiar código Pix"} {pixCopied ? <Check size={17} /> : <Copy size={17} />}</button>
                                </div>
                            </div>
                            {simulationStatus === "pix" && <p className="payment-success-message payment-success-message-cyan" role="status"><Check size={16} /> Pix pronto para esta simulação.</p>}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TypesPayments;
