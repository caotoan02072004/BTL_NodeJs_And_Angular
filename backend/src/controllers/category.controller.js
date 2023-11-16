import connection from '../config/connectDB'


let addCategory = (req, res) => {
    let category = req.body;
    let sql = "insert into category(name, status) values (?, ?)";
    connection.query(sql, [category.name, category.status], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "category added successfully" })
        } else {
            res.status(500).json(err)
        }
    })
}

let getCategory = (req, res) => {
    let sql = "select * from category ORDER by id DESC";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let searchCategory = (req, res)=>{
    let name = req.query.name;
    let sql = "select * from category  WHERE name LIKE '%" + name + "%'";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getCountCategory = (req, res) => {
    let sql = "SELECT COUNT(id) FROM `category`";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}

let getOneCategory = (req, res) => {
    let categoryId = req.params.id
    let sql = "select * from category where id  = ?";
    connection.query(sql, [categoryId], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}


let updateCategory = (req, res) => {
    let categoryId = req.params.id
    let category = req.body;
    let sql = "update category set name = ?, status = ? where id = ?";
    connection.query(sql, [category.name, category.status, categoryId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "category not found" })
            }
            return res.status(200).json({ message: "category updated successfully" })
        } else {
            res.status(500).json(err)
        }
    })
}

let deleteCategory = (req, res) => {
    let categoryId = req.params.id
    let sql = 'delete FROM category where id = ?'
    connection.query(sql, [categoryId], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "delete category successfully!" })
        } else {
            return res.status(500).json(err)
        }
    })
}

module.exports = {
    addCategory,
    getCategory,
    getCountCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    searchCategory
}