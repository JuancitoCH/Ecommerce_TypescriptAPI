import { useState } from "react"

export default function Login() {
    async function login (e:any){
        e.preventDefault()
        console.log(e.target.email.value)
        await fetch("http://localhost:4000/auth/signin",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials:"include",
            body: JSON.stringify({ 
                email:e.target.email.value,
                password:e.target.password.value
            }),
            mode:"cors",
        })
    }
  return (
    <div><h1>login</h1>
        <form onSubmit={login}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Login</button>
        </form>
    </div>
  )
}
