import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUserStore = defineStore("user", ()=>{
    const token = ref(localStorage.getItem("token") ?? "");
    const firstName = ref(localStorage.getItem("firstName") ?? "");
    const lastName = ref(localStorage.getItem("lastName") ?? "");
    const email = ref(localStorage.getItem("email") ?? "");
    const userName = ref(localStorage.getItem("userName") ?? "");

    watch(token, (v)=>{
        localStorage.setItem("token", v);
    });
    watch(firstName, (v)=>{
        localStorage.setItem("firstName", v);
    });
    watch(lastName, (v)=>{
        localStorage.setItem("lastName", v);
    });
    watch(email, (v)=>{
        localStorage.setItem("email", v);      
    });
    watch(userName, (v)=>{
        localStorage.setItem("userName", v)
    });

    function setUser(t, f, l, e, u){
        token.value = t;
        firstName.value = f;
        lastName.value = l;
        email.value = e;
        userName.value = u;
    }

    function $reset(){
        token.value = '';
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        userName.value = '';
    }

    return {
        token, firstName, lastName, email, userName, setUser, $reset
    }

})