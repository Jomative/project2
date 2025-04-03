<script setup lang="ts">
import Logo from './icons/Logo.vue';

</script>

<template>
    <header class="navbar">
        <div class="logo-cont">
            <Logo></Logo>
        </div>

        <nav class="btn-cont">
            <RouterLink to="/main">
                <div class="icon-cont">
                    <div class="icon">home</div>
                </div>
                <div class="icon-text">Home</div>
            </RouterLink>
            <RouterLink to="/trips">
                <div class="icon-cont">
                    <!-- <div class="icon">map_search</div> -->
                    <div class="icon">location_on</div>
                </div>
                <div class="icon-text">Trips</div>
            </RouterLink>
            <RouterLink to="/explore">
                <div class="icon-cont">
                    <div class="icon">map_search</div>
                </div>
                <div class="icon-text">Explore</div>
            </RouterLink>
            <RouterLink to="/profile">
                <div class="icon-cont">
                    <div class="icon">account_circle</div>
                </div>
                <div class="icon-text">Profile</div>
            </RouterLink>
        </nav>
    </header>


</template>

<style scoped>
.navbar{
    display:flex;
    flex-direction:column;
    gap:125px;
    padding: 20px;
    align-items: center;
    /* background-color: var(--dodgerblue); */
    background-color: var(--anakiwa);
    height: 100vh;
}
.logo-cont{
    /* margin-right: auto; */
    /* border: 5px solid var(--teal); */
    border-radius: 10px;
    overflow: hidden;
    /* aspect-ratio: 1; */
    
}
:deep(img){
    height: 40px;
    margin: 0px;
    display:block;
}
.icon{
    font-family: "Material Symbols Outlined";
    font-size: larger;
    font-weight: bold;
    color: var(--fog);

}
.icon-cont{
    color: var(--clr-primary-text);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dodgerblue);
    /* background-color: var(--malibu); */
    border-radius: 20px;
    padding:6px 8px;
    display:inline-block;
    /* aspect-ratio: 1; */
    position:absolute;
    translate:0px -100%;

    transition: padding 0.1s ease ;
}
.icon-text{
    color: var(--clr-primary-text);
    font-size: smaller;
    font-weight: bold;
    text-align: center;
}
.btn-cont{
    display:flex;
    flex-direction: column;
    gap: 45px;
}
nav > :deep(a){
    /* text-align: center; */
    display:flex;
    flex-direction:column;
    align-items:center;
}
nav > :deep(a):hover > .icon-cont,
nav > :deep(a).router-link-active > .icon-cont{
    background-color: teal;
    padding:6px 20px;
}
</style>