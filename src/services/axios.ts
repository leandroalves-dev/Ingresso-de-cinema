import axios from 'axios';

const Services = axios.create({
    baseURL: 'https://leandroeffgen.com.br'
})

export default Services;