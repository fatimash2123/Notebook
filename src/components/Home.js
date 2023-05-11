
import React, { useContext } from "react"
import NoteContext from "../context/notes/noteContext"

export default function Home() {
    const [notes, setNotes] = useContext(NoteContext)
    return (
        <> <h1 className="dynamicHeading">Notes</h1>
            {notes.map(val => {
                return (
                    <div className="card" style={{ margin: "3%" }} >
                        <div className="card-body ">
                            <h5 className="card-title cardTitle">{val.title}</h5>
                            <p className="card-text cardDescription">{val.description}</p>
                            <a href="/" className="card-link cardLink">Card link</a>
                            <i className="fa-sharp fa-solid fa-pen-to-square fa-2xl mx-4 fa-beat icon" ></i>
                            <i className="fa-sharp fa-solid fa-trash fa-2xl mx-4 fa-beat icon" ></i>
                        </div>
                    </div>)
            })}
        </>
    )
}

