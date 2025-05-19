import Services from './axios';

import { Movie } from '../types/Movies';

export const getMovies = async() => {
    try {

        const response = await Services.get('/cinema/json/api.json');
        return response.data
        
    } catch (error) {
        console.log('Erro ao buscar filmes', error);
        throw error;
    }
}

export const getMoviesId = async (id: number): Promise<Movie> => {
    try {
        const response = await Services.get(`/cinema/json/${id}.json`); // Busca apenas UM filme
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar o filme por id", error);
        throw error;
    }
};


export const getCombos = async () => {
    try {

        const response = await Services.get('/cinema/json/combos.json');

        console.log('COMBOS', response.data)

        return response.data;
        
    } catch (error) {
        console.log('Erro ao buscar o combo', error)
        throw error;
    }
}

export const getPrices = async () => {
    try {

        const response = await Services.get('/cinema/json/prices.json')

        console.log('Prices', response.data)

        return response.data;
        
    } catch (error) {
        console.log('Erro ao buscar o preço')
        throw error;
    }
}

export const getNews = async () => {
    try {

        const response = await Services.get('/cinema/json/movienews.json')
        
        console.log('News', response.data);

        return response.data;
        
    } catch (error) {
        console.log(error)
        throw error;
    }
}