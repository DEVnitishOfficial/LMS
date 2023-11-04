import app from './app.js'
import connectToDB from './config/dbConnection.js';


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectToDB()
    console.log(`Server is listening is http://localhost:${PORT}`)
})

