<template>

    <div class="result" @click="loadInfo()">{{ props.data.name }}</div>

</template>
<script setup>
    const props = defineProps({
        data:Object
    })
    console.log(props.data)
function loadInfo(){
    
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