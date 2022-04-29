import express from 'express'
import itemsRouter from './routes/items-routes.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req, res) => {
    res.json({msg: `Server ejecutandose, usa una ruta!`});
})

// http://localhost:8080/api/items/MLA904895322
// http://localhost:8080/api/items?q=camisa

app.use('/api/items', itemsRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', (error) => {
    console.log('Hubo un error...')
    console.log(error)
})

export default app