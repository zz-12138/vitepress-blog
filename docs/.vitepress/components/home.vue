<template>
	<div class="index">
		<section class="home">
			<div class="home-content">
				<h3>Welcome!</h3>
				<h1>Call Me Wall</h1>
				<h3>And I'm a <span ref="typedRef"></span></h3>
				<p>
					Good Good Study
					Day Day Up!
				</p>
				<div class="social-media">
					<a href="#" style="--i: 7"><i class="bx bxl-tiktok"></i></a>
					<a href="#" style="--i: 8"><i class="bx bxl-facebook-circle"></i></a>
					<a href="#" style="--i: 9"><i class="bx bxl-google"></i></a>
					<a href="#" style="--i: 10"><i class="bx bxl-linkedin-square"></i></a>
				</div>
				<a href="#" class="btn" @click="startCv">Start CV</a>
			</div>
			<div class="home-img">
				<img src="../../public/avatar2.JPG" alt="" />
			</div>
		</section>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import Typed from 'typed.js'
	import {
		useRouter
	} from 'vitepress';

	const typedRef = ref()
	const router = useRouter()

	onMounted(() => {
		console.log(typedRef.value)
		const options = {
			strings: ['Front-end trainee', "Cost engineer", "Tutang drum master"],
			typeSpeed: 100,
			backSpeed: 100,
			backDelay: 1000,
			loop: true
		}
		const typed = new Typed(typedRef.value, options)
	})

	const startCv = () => {
		router.go('/notes/JavaScript/ES6-总结')
	}
</script>

<style lang="less" scoped>
	@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

	.index {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: "Poppins", sans-serif;


		.home {
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 200px 14% 0;
		}

		.home-content {
			max-width: 600px;
		}

		.home-content h3 {
			font-size: 32px;
			font-weight: 700;
			opacity: 0;
			animation: slideBottom 1s ease forwards;
			animation-delay: .7s;
		}

		.home-content h3:nth-of-type(2) {
			margin-bottom: 30px !important;
			opacity: 0;
			animation: slideTop 1s ease forwards;
			animation-delay: .7s;
		}

		.home-content h3 span {
			color: #b7b2a9;
		}

		.home-content h1 {
			font-size: 56px;
			font-weight: 700;
			margin: 30px 0;
			opacity: 0;
			animation: slideRight 1s ease forwards;
			animation-delay: 1s;
		}

		.home-content p {
			font-size: 16px;
			opacity: 0;
			animation: slideLeft 1s ease forwards;
			animation-delay: 0.7s;
		}

		.home-img img {
			max-width: 450px;
			border-radius: 50%;
			margin-right: -20px;
			// box-shadow: 0 0 20px #b7b2a9;
			opacity: 0;
			animation: zoomIn 1s ease forwards, floatImage 4s ease-in-out infinite;
			animation-delay: 2s, 3s;
		}

		.social-media a {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			background: transparent;
			border: 2px solid #b7b2a9;
			border-radius: 50%;
			color: #b7b2a9;
			font-size: 20px;
			text-decoration: none;
			margin: 30px 15px 30px 0;
			transition: 0.5s ease;
			opacity: 0;
			animation: slideLeft 1s ease forwards;
			animation-delay: calc(0.2s * var(--i));
		}

		.social-media a:hover {
			background: #b7b2a9;
			color: #1f242d;
			box-shadow: 0 0 20px #b7b2a9;
		}

		.btn {
			display: inline-block;
			padding: 12px 28px;
			background: #b7b2a9;
			text-decoration: none;
			border-radius: 40px;
			box-shadow: 0 0 10px #b7b2a9;
			font-size: 16px;
			color: #1f242d;
			letter-spacing: 1px;
			font-weight: 600;
			transition: 0.5s ease;
			opacity: 0;
			animation: slideTop 1s ease forwards;
			animation-delay: 2s;
		}

		.btn:hover {
			box-shadow: 0 0 20px #b7b2a9;
		}

		.btn:active {
			background: none;
			color: #b7b2a9;
			border: 2px solid #b7b2a9;
		}

		/* 动画 */

		@keyframes slideRight {
			0% {
				transform: translateX(-100px);
			}

			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideLeft {
			0% {
				transform: translateX(100px);
			}

			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideTop {
			0% {
				transform: translateY(100px);
			}

			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}

		@keyframes slideBottom {
			0% {
				transform: translateY(-100px);
			}

			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}

		@keyframes zoomIn {
			0% {
				transform: scale(0);
			}

			100% {
				transform: scale(1);
				opacity: 1;
			}
		}

		@keyframes floatImage {
			0% {
				transform: translateY(0);
			}

			50% {
				transform: translateY(-24px);
			}

			100% {
				transform: translateY(0);
			}
		}
	}
</style>