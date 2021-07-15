<template>
    <div class="toast" v-if="isShow">
        {{ title }}
    </div>
</template>

<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: .2rem;
    max-width: 50%;
    min-width: 20%;
    padding: .5rem;
    background: #333;
    color: #fff;
    font-size: 1rem;
    opacity: .9;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
}
</style>
