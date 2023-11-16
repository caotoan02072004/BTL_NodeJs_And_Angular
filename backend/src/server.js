import express from 'express'
import cors from "cors";
const app = express()
import morgan from 'morgan'
import dotenv from 'dotenv'
import initRouterWeb from './routes/login.router'
import initCategory from './routes/category.router'
import initProduct from './routes/product.router'
import initDashboard from './routes/dashboard.router'
import initAccount from './routes/account.router'
import checkRole from './services/checkRole';
dotenv.config()
const port = process.env.PORT

//setup
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('src/public'))
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: true }))

//initRouterWeb
initRouterWeb(app)
//initAccount
initAccount(app)
//initCategory
initCategory(app)
//initProduct
initProduct(app)
//Dashboard
initDashboard(app)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})