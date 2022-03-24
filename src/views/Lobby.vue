<script lang="ts">
import io from "socket.io-client";

export default {
    data() {
        return {
            username: localStorage.getItem("username"),
            socket: io("localhost:8000"),
            isPlayerReady: false,
            playerList: [
                { username: "Virjil", isReady: true },
                { username: "Tibo", isReady: false },
                { username: "Charl", isReady: true },
                { username: "Titou", isReady: false },
            ],
        };
    },
    methods: {
        setPlayerReady() {
            this.socket.emit("new player ready", this.username);
            this.isPlayerReady = true;
        },
    },
};
</script>
<template>
    <p v-if="isPlayerReady" class="font-bold text-center text-xl my-8">
        Maintenant on attend que les autres débiles soient ready
    </p>
    <p v-else class="font-bold text-center text-xl my-8">
        Salut {{ username }}, oublie pas de te mettre ready
    </p>

    <div id="player-list" class="grid grid-cols-4 gap-4">
        <div
            class="w-32"
            v-for="player in this.playerList"
            :key="player.username"
        >
            <img src="https://dummyimage.com/600x400" />
            <p class="text-center">{{ player.username }}</p>
            <p class="text-center text-green-500" v-if="player.isReady">
                Ready
            </p>
            <p class="text-center text-red-500" v-else>Pas ready</p>
        </div>
    </div>

    <div class="mt-10 w-full text-center absolute bottom-10">
        <button
            class="bg-purple-600 text-white py-3 text-md rounded w-1/3 hover:bg-purple-800 disabled:bg-gray-300 disabled:text-slate-400"
            @click="setPlayerReady"
            :disabled="isPlayerReady"
        >
            Je suis ready
        </button>
        <p class="text-slate-400 text-xs" v-if="isPlayerReady">
            T'es bien ready bg
        </p>
    </div>
</template>
