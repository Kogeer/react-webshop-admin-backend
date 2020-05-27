export default class UploadValidation {
    constructor() {
        this.error = {};
    }

    formValidation(sku,name,price,desc,specs) {
        if(sku.length > 12) {
            this.error.sku = 'too long, less than 12 characters'
        }
        if(name.length === 0) {
            this.error.name = 'required'
        }

        if(price.length === 0 || +price === 0) {
            this.error.price = 'required'
        }

        if(desc.length === 0) {
            this.error.desc = 'required'
        }

        if(desc.length > 240) {
            this.error.desc = 'too long, less than 240 characters'
        }

        this.specsValidator(specs);

        return this.error;
    }

    specsValidator(specs) {
        let regx = new RegExp(/^\w+\=+\w+$/)
        let arr = specs.split("\n")
        let isValid = arr.every(str => regx.test(str))

        if (!specs) {
            this.error.specs = 'required'
        } else if(!isValid){
            this.error.specs = 'invalod form'
        }
    }
}