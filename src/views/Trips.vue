<template>
    <!-- <Navbar></Navbar> -->
    <main>
        <h1>Your Trips</h1>
        <div class="tripsCont">
            <div v-if="trips.length == 0" class="no-trips">No Trips</div>
            <Trip v-for="trip in trips" :data="trip" :list="trips"></Trip>    
        </div>
        <Modal ref="modal">
            <template #header>Create a Trip</template>
            <template #main>
                <div>Trip detail</div>

                <div class="modal-item">
                    <label for="">Trip Name</label>
                    <input type="text" placeholder="Enter your trip name..." v-model="tripName">
                </div>
                <div class="modal-item">
                    <label for="">Description</label>
                    <textarea style="resize:vertical" name="" id="" placeholder="Enter your trip description..." v-model="tripDesc"></textarea>
                </div>
                <div class="modal-item">
                    <label for="">Start Date</label>
                    <input type="date" name="" id="" v-model="tripStart">
                </div>
                <div class="modal-item">
                    <label for="">End Date</label>
                    <input type="date" name="" id="" v-model="tripEnd">
                </div>

                <div class="modal-item">
                    <div>Current Park:
                        <label v-if="curPark">{{ curPark.name }}</label>
                        <label v-else for="">[None]</label>
                    </div>
                    <button @click="addParkModal.open()">Select Park</button>
                    <Modal ref="addParkModal">
                        <template #header>
                            Add Park
                        </template>
                        <template #main>
                            <h3>Search for Parks</h3>
                            <div class="sach">
                                <input type="search" placeholder="Search parks" class="searching" v-model="parkquery">
                                <button class="search-submit material-icons search-btn" @click="loadParks()">search</button>
                            </div>
                            <!-- <div class="results"><CampSearchResult v-for="result in parkresults" :data="result" :onsubmit="selectCampground"> -->
                            <!-- </CampSearchResult> </div> -->
                            <div class="results">
                                <ParkResult class="result" v-for="result in parkresults" :data="result" :onsubmit="selectParkResult"></ParkResult>
                            </div>
                        </template>
                        <template #footer>

                        </template>
                    </Modal>
                </div>
                
                <div class="modal-item" v-if="curPark">
                    <div>Current Campground:
                        <label v-if="curCampground">{{ curCampground.name }}</label>
                        <label v-else>[None]</label>
                    </div>
                    <button @click="addCampModal2.open()">Select Campground</button>
                    <Modal ref="addCampModal2">
                        <template #header>
                            Add Campground
                        </template>
                        <template #main>
                            <div class="cmpground search">
                                <h3>Search for Campgrounds</h3>
                                <div class="sach">
                                    <input type="search" placeholder="Search campgrounds" class="searching" v-model="campquery">
                                    <button class="search-submit material-icons search-btn" @click="loadCampgrounds()">search</button>
                                </div>
                                <div class="results"><CampSearchResult v-for="result in campresults" :data="result" :onsubmit="selectCampground">
                                </CampSearchResult> </div>
                            </div>
                        </template>
                        <template #footer>
                            <button @click="addCampModal2.close()">Close</button>
                        </template>
                    </Modal>
                </div>

                <div class="modal-item" v-if="curPark">
                    <div>Current Activities: ({{ selectedActivities.length }})
                        <!-- <label v-if="curActivity">{{ curActivity.title }}</label> -->
                        <!-- <label v-else for="">[None]</label> -->
                        <div v-for="a in selectedActivities">{{ a.title }}</div>
                    </div>
                    <button @click="addActivityModal.open()">Select Activity</button>
                    <Modal ref="addActivityModal">
                        <template #header>
                            Add Activity
                        </template>
                        <template #main>
                            <h3>Search for Activities</h3>
                            <div class="sach">
                                <input type="search" placeholder="Search activities" class="searching" v-model="activityquery">
                                <button class="search-submit material-icons search-btn" @click="loadActivities()">search</button>
                            </div>
                            <!-- <div class="results"><CampSearchResult v-for="result in parkresults" :data="result" :onsubmit="selectCampground"> -->
                            <!-- </CampSearchResult> </div> -->
                            <div class="results">
                                <ActivityResult class="result" v-for="result in activityresults" :data="result" :onsubmit="selectActivityResult"></ActivityResult>
                                <br>
                                <div class="result" v-for="a in selectedActivities" style="display:flex;align-items:center;justify-content:space-between;">
                                    <div>{{ a.title }}</div>
                                    <div class="material-icons" @click="removeActivity(a)">close</div>
                                </div>
                            </div>
                        </template>
                        <template #footer>

                        </template>
                    </Modal>
                </div>
            </template>
            <template #footer>
                <button @click="addTrip">Create Trip</button>
            </template>
        </Modal>
        <div class="btnCont">
            <button class="addTrip material-icons" @click="openCreateTripModal">add</button>
            <h4 class="btnLabel">Add Trip</h4>

        </div>

    </main>
</template>
<script setup>
import ActivityResult from '@/components/ActivityResult.vue';
import CampSearchResult from '@/components/CampSearchResult.vue';
import Modal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';
import ParkResult from '@/components/ParkResult.vue';
import Trip from '@/components/Trip.vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { onMounted, ref, useTemplateRef } from 'vue';

function selectCampground(data){
    console.log("selected campground: ",data);
    addCampModal2.value?.close();
    curCampground.value = data;
}
function selectParkResult(data){
    console.log("selected park",data);
    addParkModal.value.close();
    curPark.value = data;
}
function selectActivityResult(data){
    console.log("selected activity",data);
    // addActivityModal.value.close();
    // curActivity.value = data;
    if(selectedActivities.value.includes(data)) return;
    selectedActivities.value.push(data);
}
function removeActivity(data){
    let ind = selectedActivities.value.indexOf(data);
    if(ind != -1) selectedActivities.value.splice(ind,1);
}
const curPark = ref(null);
const curCampground = ref(null);
// const curActivity = ref(null);

const userStore = useUserStore();

const addCampModal2 = useTemplateRef("addCampModal2");
const addParkModal = useTemplateRef("addParkModal");
const parkModal2 = useTemplateRef("parkModal2");
const addActivityModal = useTemplateRef("addActivityModal");

const tripName = ref('');
const tripDesc = ref('');
const tripStart = ref();
const tripEnd = ref();

let trips = ref([]);
const modal = useTemplateRef("modal");
async function openCreateTripModal(){ //opens the modal....does this have to be async too bc it calls addTrip or nah?
    modal.value.open();
}

const campquery = ref('');
const campresults = ref([]);

const parkquery = ref('');
const parkresults = ref([]);

const activityquery = ref('');
const activityresults = ref([]);
const selectedActivities = ref([]);

async function addToTrip(){

}

async function loadActivities(){
    const token = userStore.token;
    if(!token) return;
    
    let url = new URL(server_url + `/things-to-do`);

    url.searchParams.set("start", 0);
    url.searchParams.set("limit", 10);
    url.searchParams.set("parkCode", curPark.value.parkCode);
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
async function loadParks(){
    const token = userStore.token;
    if(!token) return;
    
    let url = new URL(server_url + `/national-parks`);
    url.searchParams.set("limit",10);
    if(parkquery.value) url.searchParams.set("q",parkquery.value);
    const res = await fetch(url.href, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    if(res.status === 200){
        let data = await res.json();
        parkresults.value = data.data;
        console.log(data);
    } else {
        console.log("An error occured: " + res.status + await res.text());
    }
}

async function loadCampgrounds(){
    const token = userStore.token;
    if(!token) return;
    let url = new URL(server_url + `/campgrounds`);

    url.searchParams.set("limit", 10);
    url.searchParams.set("parkCode", curPark.value.parkCode);
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

//need code to create a new little TripView box to go in the big box
async function addTrip(){ //actual create trip button
    let url = new URL(server_url + `/trip`);
    const token = userStore.token;
    if(!token) return;
    
    // console.log("url",url.href);
    const res = await fetch(url.href, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name:tripName.value,
            description:tripDesc.value,
            startDate:new Date(tripStart.value).toISOString(),
            endDate:new Date(tripEnd.value).toISOString(),
            campground:curCampground.value ? curCampground.value.id : undefined,
            park:curPark.value ? curPark.value.id : undefined,
            // thingstodo:curActivity.value ? [curActivity.value.id] : undefined,
            thingstodo:selectedActivities.value.map(v=>v.id)
        })
    });
    if(res.ok){
        let data = await res.json();
        // console.log(await res.text());
        /*trips.value += data.trip;*/ //supposed to add the new trip to array....could also just call loadTrips again on modal close to get the fresh array after adding the new one
        console.log(data)

        modal.value.close();
        await loadTrips();
    } else {
        console.log("An error occured: " + res.status + await res.text());
    }
}


async function loadTrips(){
    let url = new URL(server_url + `/trips`);
    const token = userStore.token;
    if(!token) return;
    // url.searchParams.set("start", 0);
    // url.searchParams.set("limit", 10);
    // if(activityquery.value) url.searchParams.set("q", activityquery.value)
    console.log(url.href)
    const res = await fetch(url.href, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    if(res.ok){
        let data = await res.json();
        trips.value = data.trips;
        console.log(data)

    } else {
        console.log("An error occured: " + res.status + await res.text());
    }

}

onMounted(loadTrips);

</script>
<style scoped>
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: space-between;
        align-items:center;
        padding: 20px;
        width:100%;
    }
.no-trips{
    text-align: center;
    font-weight: 550;
    font-size: 20px;
}
.tripsCont{
    padding: 20px;
    /* min-width: 400%; */
    min-height: 50%;
    /* max-width: 400px; */
    width:900px;
    border-radius: 20px;
    background-color: var(--anakiwa);

    display:flex;
    flex-wrap:wrap;
    gap:10px;

    & > div{
        height:fit-content;
    }
}
.addTrip{
    background-color: var(--teal);
    border-radius: 5px;
    aspect-ratio: 1;
    /* max-width: 1000px; */
    height: 60px;
    /* max-height: 1000px; */
    width: 60px;
    color:whitesmoke;
}
.addTrip:hover{
    background-color: var(--darkteal);
}
.btnCont{
    /* margin-left: 700px; */
    /* margin-left: 600%; */
    /* margin-top: 600px; */
    /* margin-top: 350%; */
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
.btnLabel{
    margin-top: 10px;
    font-size: 16px;
}

.result{
    color:black;
    border:solid 1px gray;
    padding: 3px;
    background-color: var(--fog);
    user-select:none;
}

</style>