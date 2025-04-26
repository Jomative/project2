<template>
    <!-- <Navbar></Navbar> -->
    <main>
        <h1>Your Excursions</h1>
        <div class="excursionsCont">
            <div v-if="excursions.length == 0" class="no-excursions">No Excursions</div>
            <Excursion v-for="excursion in excursions" :data="excursion" :list="excursions"></Excursion>    
        </div>
        <Modal ref="modal">
            <template #header>Create a Excursion</template>
            <template #main>
                <div>Excursion detail</div>

                <div class="modal-item">
                    <label for="">Excursion Name</label>
                    <input type="text" placeholder="Enter your excursion name..." v-model="excursionName">
                </div>
                <div class="modal-item">
                    <label for="">Description</label>
                    <textarea style="resize:vertical" name="" id="" placeholder="Enter your excursion description..." v-model="excursionDesc"></textarea>
                </div>
                <!-- <div class="modal-item">
                    <label for="">Start Date</label>
                    <input type="date" name="" id="" v-model="excursionStart">
                </div>
                <div class="modal-item">
                    <label for="">End Date</label>
                    <input type="date" name="" id="" v-model="excursionEnd">
                </div> -->

                <div class="modal-item">
                    <div>Choose from your trips:</div>
                    <button @click="addTripModal.open()">Select Trip</button>
                    <Modal ref="addTripModal">
                        <template #header>
                            Add Trip
                        </template>
                        <template #main>
                            <h3>Search for Your Trips</h3>
                            look at comment here
                            <!-- <div class="sach">
                                <input type="search" placeholder="Search trips" class="searching" v-model="tripquery">
                                <button class="search-submit material-icons search-btn" @click="loadTrips()">search</button>
                            </div>
                            <div class="results">
                                <ParkResult class="result" v-for="result in parkresults" :data="result" :onsubmit="selectParkResult"></ParkResult>
                            </div> -->
                            <div class="trip-result" v-for="trip in tripresults">
                                <ParkResult class="result" :data="trip" :onsubmit="selectTripResult"></ParkResult>
                            </div>
                            <br>
                            <div class="result" v-for="a in selectedTrips" style="display:flex;align-items:center;justify-content:space-between;">
                                <div>{{ a.name }}</div>
                                <div class="material-icons" @click="removeTrip(a)">close</div>
                            </div>
                        </template>
                        <template #footer>

                        </template>
                    </Modal>
                    <br>
                    <div>Current Trips: ({{ selectedTrips.length }})
                        <!-- <label v-if="curActivity">{{ curActivity.title }}</label> -->
                        <!-- <label v-else for="">[None]</label> -->
                        <div v-for="a in selectedTrips">{{ a.name }}</div>
                    </div>
                </div>
                
                <!-- <div class="modal-item" v-if="curTrip">
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
                </div> -->

                <!-- <div class="modal-item" v-if="curTrip">
                    <div>Current Activities: ({{ selectedActivities.length }})
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
                </div> -->
            </template>
            <template #footer>
                <button @click="addExcursion">Create Excursion</button>
            </template>
        </Modal>
        <div class="btnCont">
            <button class="addExcursion material-icons" @click="openCreateExcursionModal">add</button>
            <h4 class="btnLabel">Add Excursion</h4>

        </div>

    </main>
</template>
<script setup>
import ActivityResult from '@/components/ActivityResult.vue';
import CampSearchResult from '@/components/CampSearchResult.vue';
import Excursion from '@/components/Excursion.vue';
import Modal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';
import ParkResult from '@/components/ParkResult.vue';
import Trip from '@/components/Trip.vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { onMounted, ref, useTemplateRef } from 'vue';


// function selectCampground(data){
//     console.log("selected campground: ",data);
//     addCampModal2.value?.close();
//     curCampground.value = data;
// }
// function selectTripResult(data){
//     console.log("selected trip",data);
//     addTripModal.value.close();
//     curTrip.value = data;
// }
const selectedTrips = ref([]);
function selectTripResult(data){
    console.log("selected trip",data);
    // addActivityModal.value.close();
    // curActivity.value = data;
    if(selectedTrips.value.includes(data)) return;
    selectedTrips.value.push(data);
}
function removeTrip(data){
    let ind = selectedTrips.value.indexOf(data);
    if(ind != -1) selectedTrips.value.splice(ind,1);
}
const curExcursion = ref(null);
// const curCampground = ref(null);
// const curActivity = ref(null);

const userStore = useUserStore();

// const addCampModal2 = useTemplateRef("addCampModal2");
const addTripModal = useTemplateRef("addTripModal");
// const parkModal2 = useTemplateRef("parkModal2");
// const addActivityModal = useTemplateRef("addActivityModal");

const excursionDesc = ref('');
const excursionName = ref('');
const tripresults = ref([]);

let excursions = ref([]);
const modal = useTemplateRef("modal");
async function openCreateExcursionModal(){ //opens the modal....does this have to be async too bc it calls addTrip or nah?
    modal.value.open();
}

// const campquery = ref('');
// const campresults = ref([]);

// const parkquery = ref('');
// const parkresults = ref([]);

// const activityquery = ref('');
// const activityresults = ref([]);
// const selectedActivities = ref([]);

async function addToTrip(){

}



//need code to create a new little TripView box to go in the big box
async function addExcursion(){ //actual create trip button
    let url = new URL(server_url + `/excursion`);
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
            // below is gonna be different based on what an Excursion actually takes..almost fixed
            name:excursionName.value,
            description:excursionDesc.value,
            //array of trips ids
        })
    });
    if(res.ok){
        let data = await res.json();
        // console.log(await res.text());
        /*trips.value += data.trip;*/ //supposed to add the new trip to array....could also just call loadTrips again on modal close to get the fresh array after adding the new one
        console.log(data)
        // excursions.value.push(data.excursion)


        modal.value.close();
        // await loadTrips();
        await loadExcursions();
    } else {
        console.log("An error occured: " + res.status + await res.text());
    }
}


async function loadExcursions(){ 
    let url = new URL(server_url + `/excursions`);
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
        excursions.value = data.excursions;
        console.log(data)

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
        tripresults.value = data.trips;
        console.log(data)

    } else {
        console.log("An error occured: " + res.status + await res.text());
    }

}

onMounted(()=>{
    loadExcursions();
    loadTrips();
});

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
.no-excursions{
    text-align: center;
    font-weight: 550;
    font-size: 20px;
}
.excursionsCont{
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
.addExcursion{
    background-color: var(--teal);
    border-radius: 5px;
    aspect-ratio: 1;
    /* max-width: 1000px; */
    height: 60px;
    /* max-height: 1000px; */
    width: 60px;
    color:whitesmoke;
}
.addExcursion:hover{
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