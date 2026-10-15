import { CheckoutDraft, CheckoutStep, TicketQuantities, TicketSelection } from "../types/Checkout";
import { Combos } from "../types/Combos";
import { MovieSelection } from "../types/Movies";

const CHECKOUT_STORAGE_KEY = "cinesphere.checkout-draft";
const LEGACY_STEP_KEY = "step";

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const isNonNegativeInteger = (value: unknown): value is number => typeof value === "number" && Number.isInteger(value) && value >= 0;

const isCheckoutStep = (value: unknown): value is CheckoutStep => typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;

const isTicketQuantities = (value: unknown): value is TicketQuantities => {
    if (!isRecord(value)) return false;

    return isNonNegativeInteger(value.ticketInteira)
        && isNonNegativeInteger(value.ticketMeia)
        && isNonNegativeInteger(value.ticketMeiaBradesco)
        && isNonNegativeInteger(value.ticketMeiaItau);
};

const isTicketSelection = (value: unknown): value is TicketSelection => {
    if (!isRecord(value)) return false;

    return typeof value.type === "string"
        && typeof value.value === "number"
        && Number.isFinite(value.value)
        && isNonNegativeInteger(value.quantity);
};

const isCombo = (value: unknown): value is Combos => {
    if (!isRecord(value)) return false;

    return typeof value.id === "number"
        && typeof value.title === "string"
        && typeof value.description === "string"
        && typeof value.price === "number"
        && Number.isFinite(value.price)
        && typeof value.tax === "number"
        && Number.isFinite(value.tax)
        && typeof value.imagem === "string"
        && isNonNegativeInteger(value.quantity);
};

const isMovieSelection = (value: unknown): value is MovieSelection | null => {
    if (value === null) return true;
    if (!isRecord(value)) return false;

    return (value.movie === null || isRecord(value.movie))
        && (value.room === null || isRecord(value.room))
        && typeof value.time === "string"
        && typeof value.language === "string"
        && (value.selectedDate === null || typeof value.selectedDate === "string");
};

const createEmptyDraft = (): CheckoutDraft => ({
    version: 1,
    step: 1,
    selectedMovie: null,
    selectedSeats: [],
    ticketQuantities: {
        ticketInteira: 0,
        ticketMeia: 0,
        ticketMeiaBradesco: 0,
        ticketMeiaItau: 0,
    },
    selectedTickets: [],
    selectedCombos: [],
});

const clearLegacyStep = () => {
    if (typeof window !== "undefined") {
        try {
            window.localStorage.removeItem(LEGACY_STEP_KEY);
        } catch {
            // A restricted storage environment should not break the checkout.
        }
    }
};

const parseDraft = (value: unknown): CheckoutDraft | null => {
    if (!isRecord(value)
        || value.version !== 1
        || !isCheckoutStep(value.step)
        || !isMovieSelection(value.selectedMovie)
        || !Array.isArray(value.selectedSeats)
        || !value.selectedSeats.every((seat): seat is string => typeof seat === "string")
        || !isTicketQuantities(value.ticketQuantities)
        || !Array.isArray(value.selectedTickets)
        || !value.selectedTickets.every(isTicketSelection)
        || !Array.isArray(value.selectedCombos)
        || !value.selectedCombos.every(isCombo)) {
        return null;
    }

    return {
        version: 1,
        step: value.step,
        selectedMovie: value.selectedMovie,
        selectedSeats: [...new Set(value.selectedSeats)],
        ticketQuantities: value.ticketQuantities,
        selectedTickets: value.selectedTickets,
        selectedCombos: value.selectedCombos,
    };
};

export const readCheckoutDraft = (): CheckoutDraft | null => {
    if (typeof window === "undefined") return null;

    let rawDraft: string | null;

    try {
        rawDraft = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
    } catch {
        return null;
    }

    if (!rawDraft) {
        clearLegacyStep();
        return null;
    }

    try {
        const draft = parseDraft(JSON.parse(rawDraft) as unknown);
        if (!draft) {
            try {
                window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
            } catch {
                // Ignore storage cleanup failures and keep the UI usable.
            }
            clearLegacyStep();
        }
        return draft;
    } catch {
        try {
            window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        } catch {
            // Ignore storage cleanup failures and keep the UI usable.
        }
        clearLegacyStep();
        return null;
    }
};

export const updateCheckoutDraft = (changes: Partial<CheckoutDraft>) => {
    if (typeof window === "undefined") return;

    const currentDraft = readCheckoutDraft() ?? createEmptyDraft();
    const nextDraft: CheckoutDraft = {
        ...currentDraft,
        ...changes,
        version: 1,
    };

    try {
        window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(nextDraft));
    } catch {
        // A full or restricted storage should not break the checkout.
    }
    clearLegacyStep();
};

export const clearCheckoutDraft = () => {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    } catch {
        // Ignore storage cleanup failures and keep the UI usable.
    }
    clearLegacyStep();
};
