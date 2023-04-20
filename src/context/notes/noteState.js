import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [state,setState] = useState({ name: "fatima", age: "22" })
    return (
        <NoteContext.Provider value={ [state,setState]}>
            {props.children}
        </NoteContext.Provider>)
}
export default NoteState