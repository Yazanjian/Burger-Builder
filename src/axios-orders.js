import axios from 'axios';

const instances = axios.create({
    baseURL:"https://react-burger-5adc8.firebaseio.com/"
})

export default instances;