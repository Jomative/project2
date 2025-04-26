<!-- ideas
- loading animation (pulsating opacity transition) while images are still loading 

-->
<script setup>
import Modal from '@/components/Modal.vue';
import { useTemplateRef } from 'vue';
const modal = useTemplateRef("modal")
    let props = defineProps({
        name:String,
        desc:String,
        state:String,
        image:String,
        data:Object

    });
    // if()
    

</script>
<template>
    <div class="entry-cont" @click="modal.open">
        <div class="img-cont" :style="{'background-image':`url(${image})`}">
            <!-- <img class="img" :src="image"> -->
        </div>
        <div class="info-cont">
            <div class="name">{{ name }}</div>
            <!-- <div class="desc">{{ desc }}</div> -->
            <div class="state">Location: {{ state }}</div>
        </div>
    </div>
    <Modal ref="modal">
        <template #header>
            <div>{{ name }}</div>
        </template>
        <template #main>
            <div><img class="contidk" :src="data.images[1].url" alt=""></div>
            <div>{{ desc }}</div>
            <!-- {{ address, etc add other stuff check Brandon }} -->
        </template>
        <template #footer>
            <!-- <button>Add to Trip</button> -->
        </template>
    </Modal>
</template>
<style scoped>
.info-cont{
    background-color: black;
    color: bisque;
    padding: 10px;
    height:100px;
}
.img-cont{
    height:200px;
    background-size:cover;
}
.img{
    /* max-width:100px; */
    /* width:100%; */
}
.entry-cont{
    border:solid 1px gray;
    margin:auto;
    /* width:300px; */
    /* height: 300px; */
    /* padding: 20px; */
    overflow: hidden;
    border-radius: 20px;
    transition: translate 0.3s ease;
    width:400px;
    min-height:245px;
    /* height:200px; */
}
.entry-cont:hover{
    translate: 0px -10px;
}
.name{
    font-weight: bold;
}
.state{

}
.desc{
    max-width:400px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size: 14px;
}
.contidk{
    /* width:90%; */
    max-height: 300px;
}
</style>