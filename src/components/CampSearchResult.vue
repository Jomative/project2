<template>

    <div class="result" @click="loadInfo()">{{ props.data.name }}</div>
    <Modal ref="modal">
        <template #header>
            <div>{{ props.data.name }}</div>
        </template>
        <template #main>
            <div ref="desc">Description: {{props.data.description}}</div>
        </template>
        <template #footer>
            <!-- <button @click="modal.close">Close</button> -->
            <!-- <button>Submit</button> -->
        </template>
    </Modal>
</template>
<script setup>
import { useTemplateRef } from 'vue';
import Modal from './Modal.vue';
    const props = defineProps({
        data:Object
    })
    console.log(props.data)

const modal = useTemplateRef("modal")
function loadInfo(){
    modal.value.open();
}

</script>

<style scoped>
.result{
    color:black;
    border:solid 1px gray;
    padding: 3px;
    background-color: var(--fog);

}
    
</style>