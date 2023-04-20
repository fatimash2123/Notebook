import React,{useContext} from "react"
import NoteContext from "../context/notes/noteContext"

export default function About(){
    const [state,setState]=useContext(NoteContext)
    return(
        <div>
            <h1>This is About</h1>
            <h2>{state.name}</h2>
            <input type="button" style={{backgroundColor:"black",color:"white"}} value="change state" onClick={()=>{setState(old=>({...old,name:"fatima shahzad"}))}}></input>
        </div>

    )
}