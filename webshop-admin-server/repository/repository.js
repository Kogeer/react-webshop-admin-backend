const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Products2.db');
const Product = require('../ModelObjects/Product')

class Repository {

  async productsAll() {
    const prods = new Promise((resolve, reject) => {
      db.serialize(function () {
        db.all("SELECT * FROM products JOIN images WHERE images.sku = products.sku AND isPrimary = 1", (err, results) => {
          if (err) {
            // console.log(err)
            reject(err)
          }
          // console.log(results);
          resolve(results)
        })
      })
    })
    return await prods;
  }

  productBySku(sku) {
    return new Promise((resolve, reject) => {
      db.serialize(function () {
        let sql = `SELECT sku, name, price, description, specs FROM products WHERE sku = '${sku}'`
        db.all(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(results.find(product => product))
        })
      })
    })
  }

  newProductDetails(product) {
    db.serialize(function () {
      console.log(`Hello ez hozzáadás ${product}`);
      db.run(`INSERT INTO products (sku, name, price, description, specs, stock) VALUES (?, ?, ?, ?, ?, ?)`,
        [product.sku, product.name, product.price, product.description, product.specs, product.stock])
    })
  }

  newProductImages(sku, imagesPath, isPrimary) {
    db.serialize(function () {
      db.run(`INSERT INTO images (sku, imagePath, isPrimary) VALUES (?, ?, ?)`, [sku, imagesPath, isPrimary])
    })
  }

  updateProductDetails(product) {
    const { sku, name, price, description, specs, stock } = product
    console.log(sku, name, price, description, specs, stock)

    db.serialize(function () {
      let sql = `UPDATE products 
                    SET name = ?,
                    price = ?,
                    description = ?,
                    specs = ?, 
                    stock = ?
                    WHERE sku = ? `
      let params = [name, price, description, specs, +stock, sku]
      db.run(sql, params)
    })
  }

  newPrimary(sku, imageId) {
    console.log(sku, imageId)

    // Elsőnek törlöm az sku-hoz tartozó primary imaget
    db.serialize(function () {
      let delSql = `UPDATE images
                    SET isPrimary = 0
                    WHERE isPrimary = 1 
                    AND sku= ?`
      let delParams = [sku]


      // Majd beállítom az újat
      let newSql = `UPDATE images
                    SET isPrimary = 1,
                    WHERE sku = ? 
                    AND rowid = ?`
      let newParams = [sku, imageId]


      db.run(delSql, delParams)
        .run(newSql, newParams)
    })

  }

  imagesBySkuAll(sku) {
    console.log(sku);
    return new Promise((resolve, reject) => {
      db.serialize(function () {
        let sql = `SELECT rowid as id, imagePath, isPrimary FROM images WHERE sku = '${sku}' AND imagePath != 'No image'`
        db.all(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(results)
        })
      })
    })
  }

  async  imageDelete(id) {
    db.serialize(function () {
      let delSql = `DELETE FROM images WHERE rowid = ${id}`
      db.run(delSql)
    })
  }

  async findImagePath(id) {
    return new Promise((resolve, reject) => {
      db.serialize(function () {
        const findPathById = `SELECT imagePath FROM images WHERE rowid = ${id}`
        db.get(findPathById, (err, result) => {
          if (err) reject(err)
          console.log(result)
          resolve(result.imagePath)
        })
      })
    })
  }

  changePrimaryImage(id) {
    return new Promise((resolve, reject) => {
      db.serialize(function () {
        const findPrevPrimary = `SELECT sku FROM images WHERE rowid = ${id}`
        db.get(findPrevPrimary,
          (err, result) => {
            if (err) {
              reject(err)
            }
            db.run(`UPDATE images SET isPrimary = 0 WHERE sku = "${result.sku}" AND isPrimary = 1`, (err) => {
              if (err) {
                reject(err)
              }
              db.run(`UPDATE images SET isPrimary = 1 WHERE rowid = ${id}`,
                (err) => {
                  if (!err) {
                    reject(err)
                  }
                  resolve("DONE")
                })

            })
          })
      })
    })

  }

  skuIsUsed(sku) {
    return new Promise((resolve, reject) => {
      db.serialize(function () {
        db.get("Select sku FROM products WHERE sku = ?", sku, (err, result) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(result)
        })
      })
    })
  }

  deleteBySku(sku) {
    const sql = `DELETE FROM products WHERE sku = '${sku}'`
    const imgSql = `DELETE FROM images WHERE sku = '${sku}'`
    db.serialize(function () {
      db.run(sql)
      db.run(imgSql)
    })

  }


  updateStock(state) {
    const { stock, warn_at, sku } = state
    // console.log('Updatestock, ',stock, warn_at)
  }

  createProductsTable() {
    db.serialize(function () {
      db.run("CREATE TABLE IF NOT EXISTS products (sku VARCHAR(12) NOT NULL, name TEXT NOT NULL, price INTEGER NOT NULL, description VARCHAR(240) NOT NULL, specs TEXT NOT NULL, stock INTEGER);");
      db.run("CREATE TABLE IF NOT EXISTS images (sku VARCHAR(12), imagePath TEXT NOT NULL, isPrimary INTEGER);");
    })
  }
}





module.exports = Repository;