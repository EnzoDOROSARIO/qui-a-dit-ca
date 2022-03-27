<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useStore } from "vuex";

interface Player {
    username: string;
    isReady: string;
}

const store = useStore();

const username = ref(localStorage.getItem("username"));
const isPlayerReady = ref(false);
const playerList: Ref<Player[]> = ref([]);

function setPlayerReadyByUsername(username: string) {
    const newPlayerList = playerList.value;

    console.table(newPlayerList);
    const test = newPlayerList
        .map((player) => player.username)
        .indexOf(username);

    newPlayerList[test] = {
        username,
        isReady: "true",
    };

    playerList.value = newPlayerList;

    console.table(playerList.value);
}

function handleReadyClick() {
    store.state.socket.emit("player ready", username.value);
    isPlayerReady.value = true;

    setPlayerReadyByUsername(username.value!);
}

onMounted(() => {
    store.state.socket.emit("get players", (players: Player[]) => {
        players.forEach((player) => {
            playerList.value.push(player);
        });
    });

    store.state.socket.on("player joined", (player: Player) => {
        console.log("new player joined");
        playerList.value.push(player);
    });

    store.state.socket.on("new player ready", (username: string) => {
        setPlayerReadyByUsername(username);
    });
});
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
            <p
                class="text-center text-green-500"
                v-if="player.isReady === 'true'"
            >
                Ready
            </p>
            <p class="text-center text-red-500" v-else>Pas ready</p>
        </div>
    </div>

    <div class="mt-10 w-full text-center absolute bottom-10">
        <button
            class="bg-purple-600 text-white py-3 text-md rounded w-1/3 hover:bg-purple-800 disabled:bg-gray-300 disabled:text-slate-400"
            @click="handleReadyClick"
            :disabled="isPlayerReady"
        >
            Je suis ready
        </button>
        <p class="text-slate-400 text-xs" v-if="isPlayerReady">
            T'es bien ready bg
        </p>
    </div>
</template>
