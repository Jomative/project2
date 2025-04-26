<template>

    <div class="result" @click="loadInfo()">{{ props.data.title }}</div>
    <Modal ref="modal">
        <template #header>
            <div>{{ props.data.title }}</div>
        </template>
        <template #main>
            <div class="todoimg"><img :src="props.data.images[0].url" alt=""></div>
            <div class="desc"></div>
        </template>
        <template #footer>
            <!-- <button @click="modal.close">Close</button> -->
            <!-- <button>Submit</button> -->
        </template>
    </Modal>

</template>
<script setup>
import { onMounted, provide, useTemplateRef } from 'vue';
import Modal from './Modal.vue';

const modal = useTemplateRef("modal");

const props = defineProps({
    data:Object
})
    // console.log(props.data)
function loadInfo(){
    //generate a new Modal.vue component?
    modal.value.open();
}

// const desc = useTemplateRef("desc2");
onMounted(()=>{
    // console.log(desc.value);
    // if(desc.value) desc.value.innerHTML = props.data.longDescription;
    // if(modal.value.main) modal.value.main.querySelector(".desc").innerHTML = props.data.longDescription;
});

provide("desc123",props.data.longDescription);

</script>

<style scoped>
.result{
    color:black;
    border:solid 1px gray;
    padding: 3px;
    background-color: var(--fog);

}
.todoimg > img{
    width:100%
}
    
</style>