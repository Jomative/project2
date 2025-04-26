<script setup>
import Banner from '@/components/icons/Banner.vue';
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref("")
const password = ref("")
const errorMessage = ref("");

function validateInput(){
    if(!email.value || !password.value) return 'Please enter your email and password';
    if(!email.value.includes('@') || !email.value.includes('.')) return 'Please enter a valid email address.'
    return null;
}

async function signIn(){
    const validationError = validateInput();
    if(validationError) {
        console.log(validationError)
        errorMessage.value = validationError;
        return;
    }

    const res = await fetch(server_url + '/user/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value })
    });
    if(res.status === 200){
        const data = await res.json();
        console.log('Login successful: ', data);
        userStore.setUser(data.token, data.user.firstName, data.user.lastName, data.user.email, data.user.userName);
        router.push({name: 'main'}); 
    } else if(res.status === 400){
        errorMessage.value = 'Invalid email or password';
        console.log(errorMessage)
    } 
    else{
        errorMessage.value = 'An unexpected error occured. Please try again.'
        console.log(errorMessage)
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
                <h3>Welcome back</h3>

                <label for="email">Sign in</label>
                <input id="email" type="text" v-model="email" placeholder="Email">

                <label for="password">Password</label>
                <input id="password" type="text" v-model="password" placeholder="Enter password">

                <div id="remember-me-cont"><input type="checkbox" id="remember-me">Remember me</div>
                <div class="errmsg" v-if="errorMessage">⚠️Error: {{ errorMessage }}</div>
                <button @click="signIn">Sign in</button>
                <div id="toast">Don't have an account?   <RouterLink to="/join">Sign up now</RouterLink></div>
            </div>
         </div>
    </div>
</template>
<style scoped>
.errmsg{
    color: firebrick;
}
#toast {
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