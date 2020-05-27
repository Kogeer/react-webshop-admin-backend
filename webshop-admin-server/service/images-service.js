const fs = require('fs');

class ImageService {

    imageDirIsExist(sku) {
        if (!fs.existsSync(`./uploads/${sku}`)) {
            fs.mkdirSync(`./uploads/${sku}`)
        }
    }

    copyImage(file, sku) {
        fs.copyFile(
            file.path,
            `./uploads/${sku}/${file.name}`,
            err => console.log(err)
        )
    }

    imageHandler(files, sku) {
        let imagesPath = [];
        //console.log('Files log ', files.images)
        try {
                if(files.images === undefined){
                    return imagesPath
                }


            if (files.images instanceof Array) {
                this.imageDirIsExist(sku);
                files.images.forEach(file => {
                    this.copyImage(file, sku);
                    imagesPath.push(`/${sku}/${file.name}`);
                })
            }
            
            if (files.images.size) {
                this.imageDirIsExist(sku);
                this.copyImage(files.images, sku);
                imagesPath.push(`/${sku}/${files.images.name}`);
            }
        }

        catch (e) {
            console.log(e);
        }

        return imagesPath;
    }

    deleteImageByPath(imagePath){
      try {
        return fs.unlinkSync(`./uploads/${imagePath}`)
      } catch (error) {
        return error
      }
        
    }

    deleteFolder(folderName){
        try {
            return fs.rmdirSync(`./uploads/${folderName}`)
          } catch (error) {
            return error
          }
    }
}

module.exports = ImageService;