import {useEffect, useState} from "react";
import "./index.css";
import {AnimatePresence, motion} from "framer-motion";

import {type ChatMessage, connectToTwitch} from "./twitch";

function App() {
    const channel =
        new URLSearchParams(window.location.search).get("channel") ?? "monstercat";

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        return connectToTwitch(channel, (message) => {
            setMessages((old) => {
                const next = [...old, message];

                if (next.length > 25) {
                    next.shift();
                }

                return next;
            });
        });
    }, [channel]);

    return (
        <div className="chat">
            <div className="messages">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className="message"
                            initial={{
                                opacity: 0,
                                x: -80,
                                filter: "blur(8px)",
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)",
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                x: 100,
                                filter: "blur(10px)",
                            }}
                            transition={{
                                type: "spring",
                                damping: 22,
                                stiffness: 250,
                            }}
                            layout
                        >
                <span
                    className="name"
                    style={{color: msg.color}}
                >
                    {msg.username}
                </span>

                            <span className="text">
                    {msg.text}
                </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;