<script setup>
import { onMounted, useTemplateRef } from 'vue';

const d = useTemplateRef("d");

const props = defineProps({
    text:String
});

onMounted(()=>{
    d.value.innerHTML = props.text;
});

</script>

<template>
    <div ref="d"></div>
</template>