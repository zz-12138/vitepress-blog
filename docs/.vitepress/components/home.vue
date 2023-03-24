<template>
    <div class="index">
        <section class="home">
            <div class="home-content">
                <h3>Welcome!</h3>
                <h1>Call Me Wall</h1>
                <h3>And I'm a <span ref="typedRef"></span></h3>
                <p>Good Good Study Day Day Up!</p>
                <div class="social-media">
                    <a href="#" style="--i: 7"><i class="bx bx-code-alt"></i></a>
                    <a href="#" style="--i: 8"><i class='bx bx-ghost'></i></a>
                    <a href="#" style="--i: 9"><i class='bx bx-face'></i></a>
                </div>
                <a href="#" class="btn" @click="startCv">Start CV</a>
            </div>
            <div class="home-img">
                <img src="../../public/avatar2.jpg" alt="" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Typed from "typed.js"
import { useRouter } from "vitepress"

const typedRef = ref()
const router = useRouter()

onMounted(() => {
    console.log(typedRef.value)
    const options = {
        strings: ["Front-end trainee", "Cost engineer", "Tutang drum master"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    }
    const typed = new Typed(typedRef.value, options)
})

const startCv = () => {
    router.go("/vitepress-blog/notes/JavaScript/ES6-总结")
}
</script>

<style lang="less" scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
@import './style.less';
</style>
