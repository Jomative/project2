<script setup>
import Banner from '@/components/icons/Banner.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';

const userStore = useUserStore();
const router = useRouter();

const userName = ref("");
const firstName = ref("");
const lastName = ref()
const email = ref("");
const password = ref("");

const errorMessage = ref("")

function validateInput(){
    if(!userName.value || !firstName.value || !lastName.value || !email.value || !password.value) return "Please fill out all fields."
    if(!email.value.includes('@') || !email.value.includes('.')) return "Please enter a valid email address."
    return null;
}

async function join(){
    let validationError = validateInput();
    if(validationError){
        errorMessage.value = validationError;
        return;
    }

    const result = await createAccount(userName.value, firstName.value, lastName.value, email.value, password.value);

    if(result.success){
        userStore.setUser(result.data.token, firstName.value, lastName.value, email.value, userName.value);
        router.push({name:'main'});
    } else {
        errorMessage.value = result.message;
    }
    
}
async function createAccount(userName, firstName, lastName, email, password){
    // console.log("called", userName, firstName, lastName, email, password);
    const res = await fetch(server_url + '/user', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({userName, firstName, lastName, email, password})
    })
    if(res.status === 201){
        const data = await res.json();
        console.log('Account created:', data);
        return {success: true, data};
    } else if(res.status === 400){
        console.log(res.status,await res.text());
        return { success:false, message: 'Double-check your input fields.'};
    } else if(res.status === 500){
        console.log(res.status)
        return { success:false, message: 'We\'re having issues with our servers, please try again later!'};
    } else {
        console.log(res.status)
        return { success:false, message: 'An unexpected error occured. '}
    }
}
</script>
<template>
    <div id="cont">
        <div id="img-cont">
            <img id="reflect-img" src="../assets/pics/reflectpark.jpg" alt="reflecto imagu">
        </div>
        <!-- had to change from /project2/..... to ../assets/pics/reflectpark.jpg so prefer relative paths versus absolute path -->
         <div id="join-cont">
            <div id="banner-cont"><Banner></Banner></div>
            <div id="join-form-cont">
                <h3>Welcome to Xcuria</h3>

                <label for="userName">Username</label>
                <input id="userName" type="text" v-model="userName" placeholder="Username">

                <label for="firstName">First name</label>
                <input id="firstName" type="text" v-model="firstName" placeholder="First name">

                <label for="lastName">Last name</label>
                <input id="lastName" type="text" v-model="lastName" placeholder="Last name">

                <label for="email">Sign up</label>
                <input id="email" type="text" v-model="email" placeholder="Email">

                <label for="password">Password</label>
                <input id="password" type="text" v-model="password" placeholder="Enter password">

                <div id="remember-me-cont"><input type="checkbox" id="remember-me">Remember me</div>
                <button @click="join">Join</button>
                <div id="toast">Already have an account?   <RouterLink to="/signin">Sign in now</RouterLink></div>
            </div>
         </div>
    </div>
</template>
<style scoped>
#toast{
    text-align: center;
    padding-top: 15px;
    font-size: 12px;
}
button{
    background-color: var(--azureradiance);
    color: whitesmoke;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    font-family: 'Poppins';
    font-weight: 600;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
}
button:hover{
    
    box-shadow: 8px 8px 8px rgba(0,0,0,0.2);
}
h3{
    margin-top: 75px;
    font-size: 20px;
    font-weight: 700;
}
#reflect-img{
    /* width:100%; */
    height:100%;
    /* translate:-100% 0px; */
    scale:-1 1;
}
#remember-me-cont{
    font-size: 12px;
    display: flex;
    gap: 10px;
    padding: 10px;
    margin-top: 12px;
}
#img-cont{
    overflow:hidden;
}
#join-cont{
    display: flex;
    flex-direction: column;
    background-color:white;
    padding: 40px;
}
input{
    background-color: whitesmoke;
    border: none;
    padding: 10px;
    border-radius: 10px;
}
label{
    font-size: 11px;
    margin-left: 15px;
    margin-top: 12px;
}
#join-form-cont{
    display: flex;
    flex-direction: column;
    gap: 6px;
}
#banner-cont{
    display: flex;
    justify-content: center;
    align-items: center;
}
#cont{
    display: grid;
    grid-template-columns: 1fr 475px;
    width: 100vw;
    height: 100vh;
    /* background: url(../assets/pics/reflectpark.jpg); */
}
</style>