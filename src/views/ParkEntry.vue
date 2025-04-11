<!-- ideas
- loading animation (pulsating opacity transition) while images are still loading 

-->
<script setup>
    let props = defineProps({
        name:String,
        desc:String,
        state:String,
        image:String

    });
    // if()
    

</script>
<template>
    <div class="entry-cont">
        <div class="img-cont" :style="{'background-image':`url(${image})`}">
            <!-- <img class="img" :src="image"> -->
        </div>
        <div class="info-cont">
            <div class="name">{{ name }}</div>
            <!-- <div class="desc">{{ desc }}</div> -->
            <div class="state">Location: {{ state }}</div>
        </div>
    </div>
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
</style>