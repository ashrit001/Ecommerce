import express from 'express'
import cors from 'cors'
import router from './server/routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './server/configs/db.js'

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

connectDB()

app.use('/api', router)

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })

if (process.env.NODE_ENV !== "test") {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

