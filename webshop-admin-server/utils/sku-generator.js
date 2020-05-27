class SkuGenerator {
    skuGenerating(name) {
        const skuGen = name.split(' ');
        const skuString = skuGen.map(elem => {
            return elem[0]
        })
        const skuGenerated = skuString.join('');
        return skuGenerated
    }
}

module.exports = SkuGenerator;