import mongoose from "mongoose";

export class ManagerMongoDB {

    #url

    constructor(url, collection, schema) {
        this.#url = url //Atributo privado
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.modelo = mongoose.model(this.collection, this.schema)
    }

    async #setConnection(){
        try{
            await mongoose.connect(this.#url)
            console.log("DB is connectd")

        }catch(error){
            return error
        }
            
    }

    //Metodos de MongoDB

    async addElements(elements) {  //Agrego 1 o varios elementos
        this.#setConnection()
        try{
           return await this.modelo.insertMany(elements)

        }catch(error) {
            return error
        }

    }

    async getElementById(id) {   
        this.#setConnection()
        try{
           return await this.modelo.findById(id)

        }catch(error) {
            return error
        }

    }

    async updateElements(id, info) {
        this.#setConnection()
        try{
           return await this.modelo.findByIdAndUpdate(id, info)

        }catch(error) {
            return error
        }

    }

    async deleteElements(id) {  
        this.#setConnection()
        try{
           return await this.modelo.findOneAndDelete(id)

        }catch(error) {
            return error
        }

    }


}



