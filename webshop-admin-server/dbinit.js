const  sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Products2.db');
 
function creation() {
    db.serialize(function () {
        
        db.run("CREATE TABLE IF NOT EXISTS products (sku VARCHAR(12) NOT NULL, name TEXT NOT NULL, price INTEGER NOT NULL, description VARCHAR(240) NOT NULL, specs TEXT NOT NULL)");
        db.run("CREATE TABLE IF NOT EXISTS images (sku VARCHAR(12), imagePath TEXT NOT NULL, isPrimary INTEGER)");
        db.run('INSERT INTO products VALUES(?,?,?,?,?)',['SKU001','Macbook Pro',3999,'Blabla','Triolalala'])  
        db.run('INSERT INTO products VALUES(?,?,?,?,?)',['SKU002','Macbook Pro2',5945,'Blabla','Triolalala'])  
        db.run('INSERT INTO products VALUES(?,?,?,?,?)',['SKU003','Macbook Pro3',5463,'Blabla','Triolalala'])  
        db.run('INSERT INTO images VALUES(?,?,?)',['SKU003','/SKU003/1.jpg',1]);
        db.run('INSERT INTO images VALUES(?,?,?)',['SKU003','/SKU003/2.jpg',0]);
    })
}

creation()
