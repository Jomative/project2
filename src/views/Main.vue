<script setup>
import Logoname from '@/components/icons/Logoname.vue';
import Navbar from '@/components/Navbar.vue';
import SearchResult from '@/components/ActivitySearchResult.vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { ref } from 'vue';
import CampSearchResult from '@/components/CampSearchResult.vue';
import ActivitySearchResult from '@/components/ActivitySearchResult.vue';

const campquery = ref('');
const activityquery = ref('');
const userStore = useUserStore();

const campresults = ref([]);
const activityresults = ref([])

let token = userStore.token;


async function loadCampgrounds(){
    let url = new URL(server_url + `/campgrounds`);
    url.searchParams.set("limit", 10);
    if(campquery.value) url.searchParams.set("q", campquery)
    console.log(url.href)
    const res = await fetch(url.href, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    if(res.status === 200){
        let data = await res.json();
        campresults.value = data.data;
        console.log(data)

    } else {
        console.log("An error occured: " + res.status + await res.text());
    }

}

async function loadActivities(){
    let url = new URL(server_url + `/things-to-do`);
    url.searchParams.set("start", 0);
    url.searchParams.set("limit", 50);
    if(activityquery.value) url.searchParams.set("q", activityquery.value)
    console.log(url.href)
    const res = await fetch(url.href, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    if(res.status === 200){
        let data = await res.json();
        activityresults.value = data.data;
        console.log(data)

    } else {
        console.log("An error occured: " + res.status + await res.text());
    }

}
</script>
<template>
    <!-- <Navbar></Navbar> -->
    <main>
        <Logoname id="logo"></Logoname>
        <h1>Dashboard</h1>
        <div id="parkimgs">
            <img src="../assets/pics/glacierlake.jpg" alt="">
            <img src="../assets/pics/grandcanyonsunrise.jpg" alt="">
            <img src="../assets/pics/morainelake.jpg" alt="">
            <div id="showall"><RouterLink to="/explore">Discover more parks</RouterLink></div>
        </div>
        <div class="search-cont">
            <div class="cmpground search">
                <h3>Search for Campgrounds</h3>
                <div class="sach">
                    <input type="search" placeholder="Search campgrounds" class="searching" v-model="campquery">
                    <button class="search-submit material-icons" @click="loadCampgrounds()">search</button>
                </div>
                <div class="results"><CampSearchResult v-for="result in campresults" :data="result"></CampSearchResult> </div>
            </div>
            <div class="activities search">
                <h3>Search for Activities</h3>
                <div class="sach">
                    <input type="search" placeholder="Search activities" class="searching" v-model="activityquery">
                    <button class="search-submit material-icons" @click="loadActivities()">search</button>
                </div>
                <div class="results"><ActivitySearchResult v-for="result in activityresults" :data="result"></ActivitySearchResult> </div>
            </div>

        </div>
        <h2>Featured Parks</h2>
    </main>
</template>
<style scoped>
.results{
    overflow: scroll;
    gap: 0px;
    display: flex;
    flex-direction: column;
    user-select: none;
    overflow-x:hidden;
}
.sach{
    display: flex;
    /* margin:5px; */
}
.search-submit{
    font-size: 20px;
}
.searching{
    font-size: large;

}

.search-cont{
    display: flex;
    gap: 20px;
    
}
.search{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    color: bisque;
    font-size: 14px;
    padding: 5px;
    gap:10px;
    width:300px;
    height: 300px;
    border:solid 3px var(--teal);
    background-color: var(--teal);
    border-radius: 20px;
    
}
.search > *{
    font-weight: 600;
    height:fit-content;
}
main{
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
#parkimgs{
    display: flex;
    gap:20px;
    background-color: var(--anakiwa);
    padding: 20px;
    max-width:800px;
    overflow: scroll;
    overflow-y:hidden;
    /* left:50px; */
    position: relative;
    border-radius: 20px;
}
#parkimgs > *{
    width:300px;
    border-radius: 20px;

}
/* #logo{
    position:absolute;
    left:1200px;

} */
</style>