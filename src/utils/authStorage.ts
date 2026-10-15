export interface StoredUser {
    name: string;
    lastName?: string;
    email?: string;
    password?: string;
}

const isStoredUser = (value: unknown): value is StoredUser => {
    if (typeof value !== "object" || value === null) return false;

    const user = value as Record<string, unknown>;
    return typeof user.name === "string"
        && (user.lastName === undefined || typeof user.lastName === "string")
        && (user.email === undefined || typeof user.email === "string")
        && (user.password === undefined || typeof user.password === "string");
};

export const getStoredUser = (): StoredUser | null => {
    try {
        const storedUser = localStorage.getItem("User");
        if (!storedUser) return null;

        const parsedUser: unknown = JSON.parse(storedUser);
        if (isStoredUser(parsedUser)) return parsedUser;

        localStorage.removeItem("User");
    } catch {
        try {
            localStorage.removeItem("User");
        } catch {
            // O acesso ao armazenamento pode ser bloqueado pelo navegador.
        }
    }

    return null;
};
