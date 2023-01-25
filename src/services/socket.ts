export class Socket {
    private static sockets: { [x: string]: WebSocket; } = {};

    static open(name: string, api: string) {
        if (this.sockets[name]) {
            return this.sockets[name];
        }
        const newSocket = new WebSocket(api);
        this.sockets[name] = newSocket;
        return newSocket;
    }

    static events(name: string, socket: WebSocket) {
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({
                type: "get old",
                content: "0"
            }));
        });
        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        socket.addEventListener('message', event => {
            let chatMessages;
            try {
                chatMessages = JSON.parse(event.data);
            } catch (err) {
                console.log(err);
                return;
            }
            const messages = {...window.store.getState().messages};
            if (Array.isArray(chatMessages)) {
                for (const key in chatMessages) {
                    chatMessages[key].from_me = chatMessages[key].user_id === window.store.getState().user?.id;
                    chatMessages[key].time = new Intl.DateTimeFormat("ru-RU", {}).format(new Date(chatMessages[key].time))
                }
                messages[name] = chatMessages;
            } else if (chatMessages.type === "message") {
                chatMessages.from_me = chatMessages.user_id === window.store.getState().user?.id;
                chatMessages.time = new Intl.DateTimeFormat("ru-RU", {}).format(new Date(chatMessages.time))
                messages[name].push(chatMessages);
            } else {
                return;
            }
            window.store.dispatch({messages});
        });
        socket.addEventListener('error', () => {
            // console.log('Ошибка', event.message);
        });
    }

    static send(name: string, message: string) {
        Socket.sockets[name].send(message);
    }
}
