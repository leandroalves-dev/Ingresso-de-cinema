export const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};
