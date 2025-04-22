<script setup>
import { useTemplateRef } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
    data:Object,
    onsubmit:Function
});

const parkModal = useTemplateRef("parkModal");

function submitPark(){
    console.log("submit 1")
    parkModal.value.close();
    if(props.onsubmit) props.onsubmit(props.data);
}

</script>

<template>
    <div class="park-result" @click="parkModal?.open()">
        <div>{{ data.name }}</div>
        <Modal ref="parkModal">
            <template #header>
                <div>{{ data.name }}</div>
            </template>
            <template #main>
                <div>{{ data.description }}</div>
                <!-- {{ address, etc add other stuff check Brandon }} -->
            </template>
            <template #footer>
                <button @click="submitPark">Add to Trip</button>
            </template>
        </Modal>
    </div>
</template>

<style scoped>
</style>