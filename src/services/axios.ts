import axios from 'axios';

const Services = axios.create({
    baseURL: 'https://leandroeffgen.com.br/projects'
})

export default Services;