import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_SECRET;

const Main = () => {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [content, setContent] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [copystate, setCopyState] = useState(false);

    const HandleSubmitAndGenerateResponse = async () => {
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const promtTemplate = `I want to represent myself as ${sender} and I want to send a very short ${type} type of email to a person whose designation is like ${receiver} concering about ${content}`;
            setLoading(true);
            const result = await model.generateContent(promtTemplate);
            const response = result.response;
            const text = response.text();
            setResponse(text);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }


    const copyToClipBoard = () => {
        const spanElement = document.querySelector('.response');
        if (!spanElement) {
            console.error('Span element not found');
            return;
        }

        const textToCopy = spanElement.textContent || spanElement.innerText;
        if (!textToCopy) {
            console.error('No text to copy');
            return;
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard');
                setCopyState(true);
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    }

    const sendEmail = () => {
        const spanElement = document.querySelector('.response');
        if (!spanElement) {
            console.error('Span element not found');
            return;
        }
    
        const textToCopy = spanElement.textContent || spanElement.innerText;
        if (!textToCopy) {
            console.error('No text to copy');
            return;
        }
    
        const emailLink = `mailto:?body=${encodeURIComponent(textToCopy)}`;
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
                <h1>Type of your Email?</h1>
                <div className="flex flex-row">
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Long & Informal</span>
                            <input type="checkbox" checked={type === "Long & Informal"? true : false} onClick={()=>setType("Long & Informal")} className="checkbox checkbox-accent" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Concise & Professional</span>
                            <input type="checkbox" checked={type === "Concise & Professional"? true : false} onClick={()=>setType("Concise & Professional")} className="checkbox checkbox-accent" />
                        </label>
                    </div>
                </div>
                <button onClick={HandleSubmitAndGenerateResponse} className="btn btn-outline btn-accent">Generate</button>
            </div>
            <span className={loading || response ? "response mx-10 lg:mx-10" : ""}>{loading ? <Loading /> : response}</span>
            <section className="flex flex-row gap-10">
            {response ? <button onClick={copyToClipBoard} className="btn btn-outline btn-accent mt-5">{copystate? "Copied✅" : "Copy to Clipboard"}</button> : ""}
            {response? <button className="btn btn-outline btn-accent mt-5" onClick={sendEmail}>Send Email Directly</button>:""}
            </section>
        </div>
    );
}

const Loading = () => (<span className="loading loading-bars loading-lg"></span>);

export default Main;