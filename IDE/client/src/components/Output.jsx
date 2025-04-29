import { useEffect, useState } from "react";

 const Output = ({ language }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const lastPart = pathParts[1];
        setName(lastPart);
    }, []);

    if (language === "html") {
        return null; // render absolutely nothing
    }

    return (
        <div style={{ height: "100%", background: "white" }}>
            <iframe width={"100%"} height={"100%"} src={`http://${name}.docker.localhost`} />
        </div>
    );
};

export default Output;
