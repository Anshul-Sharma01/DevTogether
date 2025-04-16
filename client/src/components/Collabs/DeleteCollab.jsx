import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteCollabThunk } from "../../Redux/Slices/collabSlice";


const DeleteCollab = ({ collab }) => {

    const dispatch = useDispatch();

    const handleDeleteCollab = async() => {
        const res = await dispatch(deleteCollabThunk({ roomId : collab?.roomId }));
        console.log("Res : ", res);
    }

    return(
        <>
            <button onClick={handleDeleteCollab} className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors">
                <FaTrash/>
            </button>
        </>
    )
}




export default DeleteCollab;