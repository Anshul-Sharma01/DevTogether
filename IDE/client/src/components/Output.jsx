import axios from "axios";
import { useEffect, useState } from "react"


export const Output = ({ clientRoomId }) => {
    const [name, setName] = useState("");
    useEffect(() => {
      const fetching = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-url?clientRoomId=${clientRoomId}`);
        setName(response.data.name)
      }
      fetching()
    }, [])
    
    return <div style={{height: "40vh", background: "white"}}>
        <iframe width={"100%"} height={"100%"} src={`http://${name}.docker.localhost`} />
    </div>
}