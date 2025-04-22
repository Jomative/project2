<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
    data:Object,
    onsubmit:Function
});

const modal = useTemplateRef("modal");

const desc = ref("");

onMounted(()=>{
    desc.value = props.data.shortDescription;
});

function submitFunc(){
    modal.value.close();
    if(props.onsubmit) props.onsubmit(props.data);
}

</script>

<template>
    <div class="activity-result" @click="modal?.open()">
        <div>{{ data.title }}</div>
        <Modal ref="modal">
            <template #header>
                <div>{{ data.title }}</div>
            </template>
            <template #main>
                <div class="desc">{{ desc }}</div>
                <!-- {{ address, etc add other stuff check Brandon }} -->
            </template>
            <template #footer>
                <button @click="submitFunc">Add to Trip</button>
            </template>
        </Modal>
    </div>
</template>

<style scoped>
</style>