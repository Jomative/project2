<script setup>
import { onMounted, ref } from 'vue';
import ParkEntry from './ParkEntry.vue';
import { server_url } from '@/util';
import { useUserStore } from '@/stores/user';

const parks = ref([]);
const userStore = useUserStore();
const query = ref('');

let token = userStore.token;
async function loadParks(){
    // console.log("url",server_url + `/national-parks?limit=10?q=${query.value}`);
    // const res = await fetch(server_url + `/national-parks?limit=10?q=${query.value}`, {
    let url = new URL(server_url + `/national-parks`);
    url.searchParams.set("limit",20);
    if(query.value) url.searchParams.set("q",query.value);
    console.log("url",url.href);
    const res = await fetch(url.href, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    if(res.status === 200){
        let data = await res.json();
        // console.log(await res.text());
        parks.value = data.data;
        console.log(data)
        console.log(parks.value[0].images[0].url)
    } else {
        console.log("An error occured: " + res.status + await res.text());
    }
}

onMounted(() => {
    loadParks();
});

defineExpose({
    loadParks
});
</script>
<template>
    <!-- <div>Explore</div> -->
    <main>
        <!-- <Logoname></Logoname> why no work? -->
        <div id="search-cont">
            <!-- how to make it so that clicking anywhere in this cont triggers input? -->
            <input type="text" id="search-input" placeholder="Search for a park..." v-model="query">
            <button id="search-icon" class="material-symbols-outlined" v-on:click="loadParks">search</button>
            <!-- maybe search icon is a button elm instead? -->
        </div>
        <div class="park-cont">
            <ParkEntry v-for="park in parks" :name="park.fullName" :desc="park.description" :state="park.states" :image="park.images[0].url" class="park-entry"></ParkEntry>
        </div>
    </main>
</template>
<style scoped>
.park-entry{
    margin-bottom: 15px;
}
.park-cont{
    display: grid;
    /* flex-direction: column; */
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    row-gap: 60px;
    overflow: scroll;
    height: 80vh;
    border-radius: 10px;
    /* border: solid 3px teal; */
    padding: 20px;
    background-color: var(--anakiwa);
}
main{
    padding: 20px;
    width:100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#search-icon{
    font-size:25px;
    border-radius: 50px;
    aspect-ratio: 1;
    border: none;
}
#search-input{
    border: none;
    font-size: 17px;
    padding: 10px;
    font-family: "Poppins";
}
#search-input:focus{
    outline: none;
    border: none;
}
#search-cont{
    display: flex;
    /* border: 1px solid var(--teal); */
    border: 1px solid gainsboro;
    border-radius: 20px;
    overflow: hidden;
    align-items: center;
    background-color: #fff;
    padding-inline: 10px;
    margin-bottom: 10px;
}
</style>