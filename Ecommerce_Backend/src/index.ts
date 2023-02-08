import app from "./app";
import prisma from "./config/db";
import envs from "./config/envs";

prisma.$connect()
.then(()=>{
    app.listen(envs.PORT,()=>{
        console.log('[💻 Server ]: Server Listen in Port '+envs.PORT)
    })
})
.catch(err=>{
    console.error(err)
    process.exit(1)
})

process.on("uncaughtException",async ()=>{
    await prisma.$disconnect()
})
process.on("exit",async ()=>{
    await prisma.$disconnect()
})

