import connection from '../config/connectDB'

let addProduct = (req, res) => {
    let product = req.body;
    let sql = "INSERT INTO `product`(`name`, `price`, `sale_price`, `image`,`category_id`) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [product.name, product.price, product.sale_price, product.image, product.category_id], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "product added successfully"})
        } else {
            res.status(500).json(err)
        }
    })
}

let getSalePrice = (req, res) => {
    // let sale = req.sale_price;
    let sql = "SELECT * FROM `product` WHERE (sale_price > 0)";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getProduct = (req, res) => {
    let _name = req.query.name;
    let sql = "select * from product";
    if (_name) {
        sql += " WHERE name LIKE '%" + _name + "%'"
    }else{
        sql += " ORDER by id DESC"
    }

    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getOneProduct = (req, res)=>{
    let productId = req.params.id
    let sql = "select * from product where id  = ?";
    connection.query(sql, [productId], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getCountProduct = (req, res) => {
    let sql = "SELECT COUNT(id) FROM `product`";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let searchProduct = (req, res)=>{
    let name = req.query.name;
    let sql = "select * from product  WHERE name LIKE '%" + name + "%'";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getByCategory = (req, res) => {
    let id = req.params.id;
    let sql = "select id, name from product where categoryId = ?";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            res.status(500).json(err)
        }
    })
}

let getById = (req, res) => {
    let id = req.params.id;
    let sql = "select id, name, description, price from product where id=?";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0])
        }
        else {
            return res.status(500).json(err)
        }
    })
}


let updateProduct = (req, res) => {
    let productId  = req.params.id
    let product = req.body;
    console.log(productId)
    let sql = "UPDATE `product` SET `name`=?,`price`=?,`sale_price`=?,`image`=?,`category_id`=?,`status`=?,`description`=? WHERE id=?";
    connection.query(sql, [product.name, product.price, product.sale_price, product.image, product.category_id, product.status, product.description, productId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            } else {
                return res.status(200).json({ message: "Product updated successfully" })
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
}

let updateStatus = (req, res) => {
    let user = req.body;
    let sql = "update product set status = ? where id = ?";
    connection.query(sql, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            }
            else {
                return res.status(200).json({ message: "Product status updated successfully" })
            }
        } else {
            return res.status(500).json(err)
        }
    })
}

let deleteProduct = (req, res) => {
    const id = req.params.id;
    let sql = "delete from product where id=?";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            } else {
                return res.status(200).json({ message: "delete product successfully" })
            }
        } else {
            res.status(500).json(err)
        }
    })
}


module.exports = {
    addProduct,
    getProduct,
    getOneProduct,
    getCountProduct,
    searchProduct,
    getByCategory,
    getById,
    updateProduct,
    updateStatus,
    deleteProduct,
    getSalePrice
}