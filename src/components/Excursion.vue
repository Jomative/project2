<!-- these will populate the trip cont and basically load any existing trips -->
<script setup>
import { onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';

const userStore = useUserStore();

const park = ref("Loading...");
const campground = ref("Loading...");
const activites = ref([]);

async function fetchParkInfo(){
    console.log({...props.data})
    if(!props.data.park) return;
    
    const token = userStore.token;
    if(!token) return;

    let url = new URL(server_url+"/national-parks");
    url.searchParams.set("q",props.data.park);
    url.searchParams.set("limit",1);
    
    const res = await fetch(url.href,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = await res.json();
        park.value = data.data[0];
        console.log("got park data",data);
    }
    else{
        console.warn("failed to get park data",props.data.park);
    }
}
async function fetchParkInfo2(){
    if(!props.data.park) return;
    
    const token = userStore.token;
    if(!token) return;

    let url = new URL(server_url+"/national-parks");
    url.searchParams.set("q",props.data.park);
    url.searchParams.set("limit",1);
    
    const res = await fetch(url.href,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = await res.json();
        park.value = data.data[0];
        console.log("got park data",data);
    }
    else{
        console.warn("failed to get park data",props.data.park);
    }
}
async function fetchActivityInfo(){
    if(!props.data.park) return;
    
    const token = userStore.token;
    if(!token) return;

    let url = new URL(server_url+"/things-to-do");
    url.searchParams.set("q",props.data.thingstodo.join(","));
    url.searchParams.set("limit",props.data.thingstodo.length);
    
    const res = await fetch(url.href,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = await res.json();
        activites.value = data.data;
        console.log("got activity data",data);
    }
    else{
        console.warn("failed to get activity data",props.data.park);
    }
}
async function fetchCampInfo(){
    if(!props.data.campground) return;
    const token = userStore.token;
    if(!token) return;

    let url = new URL(server_url+"/campgrounds");
    url.searchParams.set("q", props.data.campground);
    url.searchParams.set("limit", 1);

    const res = await fetch(url.href, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    if(res.ok){
        let data = await res.json();
        campground.value = data.data[0];

    } else {
        console.log("failed to get camp")
    }
}

onMounted(()=>{
    fetchParkInfo();
    fetchActivityInfo();
    fetchCampInfo();
});

const props = defineProps({
    data:Object,
    list:[Object]
})

async function delExcursion(){
    if(!confirm("Are you sure you want to delete this precious excursion?")) return;
    const token = userStore.token;
    if(!token) return;

    let url = new URL(server_url+"/excursion/" + props.data._id);

    const res = await fetch(url.href, {
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    if(res.ok){
        console.log("delete successful")
        let ind = props.list.indexOf(props.data);
        if(ind != -1) props.list.splice(ind,1);
    } else {
        console.log("failed to delete")
    }
}
</script>
<template>
<div class="tripEntry">
    <div>Name: {{ props.data.name }}</div>
    <!-- <br> -->
    <!-- {{ props.data.host[0].firstName }} -->

    <!-- add campground to trip, add activity to trip -->

    <div class="details">
        <div>Description: {{ props.data.description }}</div>
        <div>Date created: {{ new Date(props.data.createdAt).toLocaleString([], {dateStyle:"short"}) }}</div>
        <div>Status: {{ props.data.isComplete?'Completed':'Upcoming' }}</div>
        <!-- <div>Date created: {{ props.data.createdAt }}</div> -->
        <!-- <div v-if="park">
            <label class="info-label" for="">Park: </label>
            <span>{{ park.name }}</span>
        </div> -->
        <br>
        <!-- <div class="two-col">
            <div>
                <label for="">Start Date</label>
                <div>{{ new Date(props.data.startDate).toLocaleString([],{dateStyle:"short"}) }}</div>
            </div>
            <div style="text-align: right;">
                <label for="">End Date</label>
                <div>{{ new Date(props.data.endDate).toLocaleString([],{dateStyle:"short"}) }}</div>
            </div> -->
        <!-- </div> -->
    </div>

    <div class="btn-cont">
        <button class="del-trip" @click="delExcursion()">Delete</button>
        <!-- <button class="btn">Add Campground</button> -->
        <!-- <Modal ref="addCampModal">
            <template #header>
                Add Campground
            </template>
            <template #main>
                Main
            </template>
            <template #footer>
                <button>Close</button>
            </template>
        </Modal>
        <button class="btn">Add Activity</button>
        <Modal ref="addActivityModal">
            <template #header>
                Add Activity
            </template>
            <template #main>
                Main
            </template>
            <template #footer>
                <button>Close</button>
            </template>
        </Modal> -->
    </div>
</div>


</template>
<style scoped>
.del-trip{
    background-color: teal;
}
.del-trip:hover{
    background-color: rgba(178, 34, 34, 0.858);
}
.info-label{
    font-weight: 700;
}
.btn-cont{
    margin-top:10px;
    display:flex;
    flex-direction:column;
}
.btn-cont > button{
    width:100%;
}

.two-col{
    display:grid;
    grid-template-columns:1fr 1fr;
}

label{
    opacity:0.8;
    font-size:13px;
}

.tripEntry{
    padding:10px;
    border-radius:15px;
    background-color:var(--dodgerblue);
    display:inline-block;
    color:whitesmoke;
    width:200px;
}

.details{
    background-color:whitesmoke;
    color:#111;
    border-radius:5px;
    padding:10px;
    font-size:14px;
}

</style>