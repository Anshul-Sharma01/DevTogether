import { server } from "./app.js"
import dotenv from "dotenv"

dotenv.config({ path : "./.env" })
const PORT = process.env.PORT || 9000

server.listen(PORT,"0.0.0.0",  () => {
    console.log(`Server is running on PORT : ${PORT}`)
})



