class ValidationService {
    constructor(repository, skuGenerator) {
        this.repository = repository;
        this.skuGenerator = skuGenerator;
    }

    formValidation(name, price, description, specs) {
        let errorType = {}
        if (!name) {
            errorType.name = 'missing';
        }
        if (!price) {
            errorType.price = 'missing';
        }
        if (!description) {
            errorType.description = 'missing';
        }
        if (!specs) {
            errorType.specs = 'missing';
        } 
      /*  else {                                 /// Későbbi felhasználásra, specs bevitel ellenőrzése: Kötelező formula asdasd=asdasda, minden más esetben nem megfelelő
            let regx = new RegExp(/^\w+\=+\w+$/)
            let arr = value.split("\n")
            let isValid = arr.every(str => regx.test(str))
                if (!isValid) {
                    errorType.specs = 'form invalid';
                }
            }*/
        

        return errorType;
    }

    async skuValidation(sku, name) {
        const skuIsUsed = await this.repository.skuIsUsed(sku);
        if (skuIsUsed) {
            return undefined;
        }
        if (!sku && name) {
            const skuGenerated = this.skuGenerator.skuGenerating(name);
            const skuIsUsed = await this.repository.skuIsUsed(skuGenerated);
            if (skuIsUsed) {
                return undefined;
            }
            return skuGenerated;
        }
        return sku;
    }
}

module.exports = ValidationService;