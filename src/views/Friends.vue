<template>
    <main>
        <div style="margin-bottom:100px">
            <h2>Friends</h2>
            <div v-for="friend in friends" style="display:flex;align-items:center;gap:15px">
                <div>{{ friend.userName }}</div>
                <div class="material-symbols-outlined" style="cursor:pointer" @click="deleteFriendF(friend._id)">close</div>
            </div>
        </div>
        <div>
            <h2>Friend Requests</h2>
            <div class="create-request">
                <input type="text" placeholder="Search for friends..." v-model="createReqId" @keydown="fetchUsers">
                <div style="max-height:200px;overflow:scroll;overflow-x:hidden">
                    <div v-for="user in allUsers" @click="selectedUser = user" :selected="selectedUser?._id == user._id">
                        <div>{{ user.userName }}</div>
                    </div>
                </div>
                <br>
                <button @click="sendReq">Send Request</button>
            </div>
            <hr>
            <div>
                <br><br>
                <h3>Outgoing Requests</h3>
                <div v-for="req in outgoingReqs">
                    <div>{{ req.sender[0].userName }} -> {{ req.receiver[0].userName }}</div>
                    <div>
                        <button @click="deleteReq(req._id)">Delete</button>
                    </div>
                    <hr>
                </div>
                <br><br>
                <h3>Incoming Requests</h3>
                <div v-for="req in yourReqs">
                    <div>{{ req.sender[0].userName }} -> {{ req.receiver[0].userName }}</div>
                    <div>
                        <button @click="handle(req._id,false)">Reject</button>
                        <button @click="handle(req._id,true)">Accept</button>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import { createFriendRequest, deleteFriend, deleteFriendRequest, getAllUsers, getFriendRequests, getFriends, handleFriendRequest } from '@/util';
import { onMounted, ref } from 'vue';

const friends = ref([]);
const createReqId = ref("");
const allUsers = ref([]);
const selectedUser = ref();
const outgoingReqs = ref([]);
const yourReqs = ref([]);

async function fetchUsers(e){
    if(e.key.toLowerCase() != "enter") return;
    allUsers.value = (await getAllUsers()).filter(v=>v.userName.toLowerCase().includes(createReqId.value.toLowerCase()));
}

async function deleteFriendF(id){
    console.log("ID:",id);
    await deleteFriend(id);
    friends.value = await getFriends();
}

async function sendReq(){
    if(!selectedUser.value) return;
    await createFriendRequest(selectedUser.value._id);
    await fetchReqs();
}

async function deleteReq(id){
    await deleteFriendRequest(id);
    await fetchReqs();
}

async function handle(id,v){
    await handleFriendRequest(id,v);
    await fetchReqs();
    friends.value = await getFriends();
}

const user = useUserStore();

async function fetchReqs(){
    let list = await getFriendRequests();
    console.log("reqs: ",list);

    outgoingReqs.value = list.filter(v=>v.sender[0].userName == user.userName);
    yourReqs.value = list.filter(v=>v.sender[0].userName != user.userName);
}

onMounted(async ()=>{
    friends.value = await getFriends();
    fetchReqs();

    friends.value = await getFriends();
});
</script>
<style scoped>
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* justify-content: space-between; */
    justify-content:start;
    align-items:center;
    padding: 20px;
    width:100%;
}

[selected="true"]{
    background-color:teal;
    color:white;
}
</style>