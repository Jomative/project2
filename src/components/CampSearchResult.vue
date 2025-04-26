<template>

    <div class="result" @click="loadInfo()">{{ props.data.name }}</div>
    <Modal ref="modal">
        <template #header>
            <div>{{ props.data.name }}</div>
        </template>
        <template #main>
            <div class="campimg"><img :src="props.data.images[0].url" alt=""></div>
            <div ref="desc">Description: {{props.data.description}}</div>
        </template>
        <template #footer>
            <button @click="submitAddToTrip">Add to Trip</button>
        </template>
    </Modal>
</template>
<script setup>
import { useTemplateRef } from 'vue';
import Modal from './Modal.vue';
const props = defineProps({
    data:Object,
    onsubmit:Function
})

const modal = useTemplateRef("modal")
function loadInfo(){
    modal.value.open();
}

function submitAddToTrip(){
    modal.value?.close();

    if(props.onsubmit) props.onsubmit(props.data);
}

</script>

<style scoped>
.result{
    color:black;
    border:solid 1px gray;
    padding: 3px;
    background-color: var(--fog);
}
.campimg > img{
    width:100%
}
    
</style>