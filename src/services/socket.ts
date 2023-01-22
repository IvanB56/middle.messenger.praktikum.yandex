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

    static events(socket: WebSocket) {
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({
                type: 'message',
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
            if (event.data.type === "message") {
                console.log('message')
            }
        });
        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    }

    static send(name: string, message: string){
        this.sockets[name].send(message);
    }
}
