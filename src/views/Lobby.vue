<script lang="ts">
import io from "socket.io-client";

export default {
    data() {
        return {
            username: localStorage.getItem("username"),
            socket: io("localhost:8000"),
            isPlayerReady: false,
        };
    },
    methods: {
        setPlayerReady() {
            this.socket.emit("playerReady", this.username);
        },
    },
};
</script>
<template>
    <p class="font-bold text-center text-xl my-8">Lobby</p>

    <div id="player-list" class="grid grid-cols-4 gap-4">
        <div id="player-card" class="w-32">
            <img class="player-pic" src="https://dummyimage.com/600x400" />
            <p class="text-center">Virjil</p>
            <p class="text-center text-green-500">Ready</p>
        </div>
        <div id="player-card" class="w-32">
            <img class="player-pic" src="https://dummyimage.com/600x400" />
            <p class="text-center">Tibo</p>
            <p class="text-center text-red-500">Pas ready</p>
        </div>
        <div id="player-card" class="w-32">
            <img class="player-pic" src="https://dummyimage.com/600x400" />
            <p class="text-center">Charles</p>
            <p class="text-center text-red-500">Pas ready</p>
        </div>
        <div id="player-card" class="w-32">
            <img class="player-pic" src="https://dummyimage.com/600x400" />
            <p class="text-center">Titou</p>
            <p class="text-center text-red-500">Pas ready</p>
        </div>
    </div>

    <div class="mt-10 w-full text-center absolute bottom-10">
        <button
            class="bg-purple-600 text-white py-3 text-md rounded w-1/3 hover:bg-purple-800"
            @click="setPlayerReady"
            :disabled="isPlayerReady"
        >
            Je suis ready
        </button>
    </div>
</template>
