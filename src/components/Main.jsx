import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_SECRET;
import {toast, Toaster} from "react-hot-toast";

const Main = () => {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [content, setContent] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [copied, setCopied] = useState(false);
    const notify = () => toast.error('Fill all the fields!');

    const HandleSubmitAndGenerateResponse = async () => {
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            if(!sender || !receiver || !content || !type) {
                notify();
                return;
            }
            const promptTemplate = `I want to represent myself as ${sender} and I want to send a very short ${type} type of email to a person whose designation is like ${receiver} concerning about ${content}`;
            setLoading(true);
            const result = await model.generateContent(promptTemplate);
            const response = await result.response.text();
            setResponse(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to generate response: ', error);
        }
    }

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.textContent = response;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
    }

    const sendEmail = () => {
        const emailLink = `mailto:?body=${encodeURIComponent(response)}`;
        window.location.href = emailLink;
    }

    return (
        <div className={"h-full flex flex-col items-center"}>
            <div className="header">
                <div className="flex flex-row gap-4 first-row">
                    <textarea
                        name="text-area"
                        id="text-area"
                        className="text-area"
                        placeholder="Write About Receiver..."
                        onChange={(e) => setReceiver(e.target.value)}
                    ></textarea>
                    <textarea
                        name="text-area"
                        id="text-area"
                        className="text-area"
                        placeholder="Write about yourself..."
                        onChange={(e) => setSender(e.target.value)}
                    ></textarea>
                </div>
                <textarea
                    name="text-area"
                    id="text-area"
                    className="text-area"
                    placeholder="Write complete description of email..."
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <h1 className="text-white">Type of your Email?</h1>
                <div className="flex flex-row">
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text text-white">Long & Informal</span>
                            <input type="checkbox" checked={type === "Long & Informal"} onClick={()=>setType("Long & Informal")} className="checkbox checkbox-accent" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text text-white">Concise & Professional</span>
                            <input type="checkbox" checked={type === "Concise & Professional"} onClick={()=>setType("Concise & Professional")} className="checkbox checkbox-accent" />
                        </label>
                    </div>
                </div>
                <button onClick={HandleSubmitAndGenerateResponse} className="btn btn-outline btn-accent">Generate</button>
                <Toaster/>
            </div>
            <span className={loading || response ? "response mx-10 lg:mx-10" : ""}>{loading ? <Loading /> : response}</span>
            <section className="flex flex-row gap-10">
                {response && !loading &&
                    <>
                        <button onClick={copyToClipboard} className="btn btn-outline btn-accent mt-5">{copied ? "Copied ✅" : "Copy to Clipboard"}</button>
                        <button onClick={sendEmail} className="btn btn-outline btn-accent mt-5">Send Email Directly</button>
                    </>
                }
            </section>
        </div>
    );
}

const Loading = () => (<span className="loading loading-bars loading-lg"></span>);

export default Main;
