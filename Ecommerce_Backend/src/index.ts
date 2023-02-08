import app from "./app";
import envs from "./config/envs";

app.listen(envs.PORT,()=>{
    console.log('[💻 Server ]: Server Listen in Port '+envs.PORT)
})