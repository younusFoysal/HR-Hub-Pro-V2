
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import logo from "/user.png"
import userbw from "/userbw.png"




const AIHelper = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chatHistory, setChatHistory] = useState([{ sender: 'AI Assistant', message: 'Hi, how can I help you today?' }]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/ai/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error('Network error!');

            const data = await res.json();
            setChatHistory([...chatHistory, { sender: 'You', message: prompt }, { sender: 'AI Assistant', message: data.response }]);
            setPrompt('');
        } catch (err) {
            setError('Error connecting to AI service: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderers = {
        code: ({ node, inline, className, children }) => {
            const language = className?.replace(/language-/, '') || '';
            return inline ? (
                <code className={className}>{children}</code>
            ) : (
                <SyntaxHighlighter style={coldarkDark} language={language} PreTag="div">
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            );
        },
    };

    return (
        <div className="max-w-full  flex items-center mx-auto">
            <div className="h-[calc(100%-7rem)] flex flex-col mx-6 md:mx-12  mt-12 w-full ">


                <div className="drop-shadow-xl flex-1 flex flex-col  bg-white p-6 rounded-lg border border-[#e5e7eb] max-h-[634px] w-full">
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight ">AI Assistant</h2>
                        <p className="text-xs w-full text-[#6b7280] leading-5">
                            Your Personal Guide. AI Assistant can make mistakes. Check important info.
                        </p>
                    </div>

                    <div className="pr-4 flex-1 py-6 h-full min-w-full overflow-y-auto">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`flex gap-3 my-4 text-sm ${chat.sender === 'AI Assistant' ? 'justify-start' : 'justify-end'}`}>
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className={`rounded-full ${chat.sender === 'AI Assistant' ? 'bg-blue-100 border-green-500' : 'bg-gray-100'} border `}>
                    <img src={chat.sender === 'AI Assistant' ? logo : userbw} alt={chat.sender} className="w-full" />
                  </div>
                </span>
                                <div
                                    className={`p-2 rounded-lg ${
                                        chat.sender === 'AI Assistant'
                                            ? 'bg-green-50  text-black border border-green-200 transition-all'
                                            : 'bg-gray-100  text-black'
                                    }`}
                                >
                                    <p className="font-bold">{chat.sender}</p>
                                    <div className="chat-message">
                                        <ReactMarkdown components={renderers}>{chat.message}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center pt-0">
                        <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSubmit}>
                            <input
                                className="flex  h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712]"
                                placeholder="Type your message"
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                            />
                            <button
                                className="inline-flex items-center justify-center bg-green-600 text-white rounded-md text-sm font-medium  hover:scale-105 duration-500  disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                                type="submit"
                                disabled={loading || !prompt.trim()}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </div>

                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default AIHelper;
