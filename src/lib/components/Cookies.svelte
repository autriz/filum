<script>
    import { onMount } from 'svelte';
    let showCookieBanner = false;
    onMount(() => {
        const accepted = localStorage.getItem('cookiesAccepted');
        showCookieBanner = !accepted;
    });
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        showCookieBanner = false;
    }
</script>
{#if showCookieBanner}
<div class="cookie-banner">
    <div>
        Мы используем файлы Cookie для работы сайта.
    </div>
    <button 
        on:click={acceptCookies} 
        class="ml-4 w-full text-base font-semibold h-10 px-4 py-2 rounded-sm bg-primary-600 hover:bg-primary-800">
        Разрешить
    </button>
</div>
{/if}
<style lang="scss">
    .cookie-banner {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #323232;
        color: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slide-up 0.5s ease-out;
        @keyframes slide-up {
            from {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%);
                opacity: 1;
            }
        }
    }
    .cookie-banner button {
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>