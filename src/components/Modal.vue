<script setup>
import { onMounted, ref } from 'vue';

let showModal = ref(false);

function open(){
    console.log("open modal");
    showModal.value = true;
}
function close(){
    console.log("close modal");
    showModal.value = false;
}

defineExpose({
    open,close
});

</script>

<template>
    <div v-show="showModal" :fade-in2="showModal" class="modal-backdrop" @click.self="close" @keydown.esc="close">
        <div class="modal">
            <header>
                <slot name="header"></slot>
                <button @click.stop="close" class="icon model-btn b-close">close</button>
            </header>

            <main>
                <slot name="main"></slot>
            </main>

            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<style scoped>

.icon{
    font-family:"Material Icons";
    padding:10px;
    color:black;
}
.model-btn{
    display:flex;
    align-items:center;
    justify-content:center;
    aspect-ratio:1;
    background:none;
    border:none;
    border-radius:50%;
    font-size:18px;
}
.model-btn:hover{
    background-color:rgba(0,0,0,0.1);
}

.modal-backdrop{
    position:fixed;
    inset:0px;
    background-color:var(--clr-modal-backdrop);

    display:flex;
    justify-content:center;
    align-items:center;

    --clr-modal-backdrop:rgba(0,0,0,0.1);
    --clr-modal-bg:whitesmoke;
    --clr-neutral-300:#ddd;
    --size-200:20px;
    --size-200:30px;
    --size-400:40px;
    --size-500:50px;

    color:#111;
}
.modal{
    background-color:var(--clr-modal-bg);
    /* padding:var(--size-300); */
    border-radius:15px;
    overflow:hidden;
    box-shadow:0px 4px 5px rgba(0,0,0,0.2);
    /* min-width:350px; */
    max-width:600px;
    margin-top:50px;
    /* margin-top:200px; */
}
.modal-btn{
    border-radius:50%;
}

:deep(button){
    background-color:var(--dodgerblue);
    padding:10px 15px;
    border-radius:20px;
    color:whitesmoke;
    border:none;
    display:inline-block;
    width:max-content;
    font-weight:bold;

    &:hover{
        background-color:var(--teal);
    }
}


header{
    display:flex;
    align-items:center;
    font-size:var(--fs-650);
    background-color:var(--clr-neutral-300);
    /* padding:var(--size-300) var(--size-500); */
    padding:10px 20px;
    font-weight:bold;
    text-transform:uppercase;
    /* font-family:monospace; */

    /* border-bottom:solid 5px var(--clr-accent-400); */
}
footer{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:var(--size-400);
    justify-content:end;
    gap:10px;
    padding:var(--size-300);
    padding:10px;
}
footer:not(:has(*)){
    display:none;
}
main{
    padding:var(--size-500);
    overflow-y:scroll;
    overflow-x:hidden;
    max-height:calc(100vh - 200px);
    /* margin-top:150px; */
}
.b-close{
    margin-left:auto;
}

:deep(.form){
    width:300px;
}

</style>