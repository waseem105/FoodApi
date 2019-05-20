import axios from 'axios';
export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults(query) {
        const key ='dd17b45854fb7aad8457f68407d23073';
        try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
       // console.log(this.result);
        } catch (error){
            alert (error);
        }
    }
}




