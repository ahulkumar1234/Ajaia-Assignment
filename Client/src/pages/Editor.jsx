import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../services/api";
import "./editor.css";
import toast from 'react-hot-toast';

function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        loadDocument();
    }, []);

    const loadDocument = async () => {
        const res = await api.get(`/documents/${id}`);

        setTitle(res.data.title);
        setContent(res.data.content);
    };

    const saveDocument = async () => {
        await api.put(`/documents/${id}`, {
            title,
            content,
        });
        navigate("/dashboard");
        toast.success("Document Saved");

    };
    const shareDocument = async () => {
        console.log("EMAIL:", email);

        try {
            await api.post(`/documents/${id}/share`, {
                email,
            });

            toast.success("Document shared successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            setContent(event.target.result);
        };

        reader.readAsText(file);
    };

    return (
        <div className="editor-container">
            <input
                className="editor-title"
                type="text"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <button className="save-button" onClick={saveDocument}>
                Save Document
            </button>

            <input
                className="share-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="save-button" onClick={shareDocument}>
                Share
            </button>

            <input
                className="file-input"
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
            />

            <ReactQuill
                className="editor-content"
                theme="snow"
                value={content}
                onChange={setContent}
            />
        </div>
    );
}

export default Editor;