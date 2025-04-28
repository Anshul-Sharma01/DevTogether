import { useEffect, useState } from "react"

export const Output = ({ clientRoomId }) => {
    const [name, setName] = useState("")
    
    useEffect(() => {
        const pathParts = window.location.pathname.split("/")
        const lastPart = pathParts[1];
        setName(lastPart);
    }, []);
    
    return (
        <div style={{ height: "100%", background: "white" }}>
            <iframe width={"100%"} height={"100%"} src={`http://${name}.docker.localhost`} />
        </div>
    )
}