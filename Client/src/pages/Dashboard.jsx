import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
    const [docs, setDocs] = useState([]);
    const [sharedDocs, setSharedDocs] = useState([]);

    const navigate = useNavigate();

    const getDocuments = async () => {
        const res = await api.get("/documents");

        setDocs(res.data);
    };

    const createDocument = async () => {
        const res = await api.post("/documents", {
            title: "Untitled Document",
            content: "",
        });

        navigate(`/editor/${res.data._id}`);
    };

    const getSharedDocuments = async () => {
        try {
            const res = await api.get("/documents/shared/all");
            setSharedDocs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDocuments();
        getSharedDocuments();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>My Documents</h1>

            <button onClick={createDocument}>
                New Document
            </button>

            <hr />

            {/* My Documents */}
            <h2>My Documents</h2>

            {docs.map((doc) => (
                <div
                    className="document-item"
                    key={doc._id}
                    onClick={() =>
                        navigate(`/editor/${doc._id}`)
                    }
                >
                    <h3>{doc.title}</h3>
                </div>
            ))}

            <hr />

            {/* Shared Documents */}
            <h2>
                Shared With Me
            </h2>

            {sharedDocs.map((doc) => (
                <div
                    className="document-item"
                    key={doc._id}
                    onClick={() =>
                        navigate(`/editor/${doc._id}`)
                    }
                >
                    <h3>{doc.title}</h3>
                </div> 
            ))} {sharedDocs.length === 0 && (
                <p style={{color:"gray", fontSize:"15px"}}>No documents shared with you yet.</p>
            )}
        </div>
    );
}

export default Dashboard;