import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
   // const [state,setState] = useState({ name: "fatima", age: "22" })
    const [notes,setNotes]=useState([
        {
            "_id": "643946959d7db6abadda4087",
            "userid": "643937052dcb86aaef941d05",
            "title": "abc",
            "description": "abc",
            "tag": "abc",
            "date": "2023-04-14T12:27:01.753Z",
            "__v": 0
        }
    ])
    return (
        <NoteContext.Provider value={[notes,setNotes]}>
            {props.children}
        </NoteContext.Provider>)
}
export default NoteState