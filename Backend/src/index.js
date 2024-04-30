import dotenv from "dotenv"
import connectDataBase from "./db/connectDataBase.js"
import app from "./app.js"
const port = process.env.PORT || 8000;
dotenv.config({
      path:'.env'
});

app.get("/",(req,res)=>{
      res.status(200).json({
            message:"This is home page"
      })
})
connectDataBase()
.then(()=>{
      app.listen(port,()=>{
            console.log(`Server is running on port = ${port}`);
      })
})
.catch((error)=>{
      console.log("DataBase connection Fialed....",error)
})