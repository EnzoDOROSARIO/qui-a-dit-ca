import { io } from "socket.io-client";
import { createStore } from "vuex";

export default createStore({
    state: {
        socket: io("localhost:8000"),
    },
});
