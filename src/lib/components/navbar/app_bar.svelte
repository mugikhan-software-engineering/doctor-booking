
<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import newLogo from '$lib/assets/png/new_logo.png';
</script>

<AppBar background="bg-primary-500">
    {#snippet lead()}
        <a href="/">
            <img
            alt="The project logo"
            class="h-auto xs:h-[30px] w-[200px]"
            src={newLogo}
            loading="lazy"/>
        </a>
    {/snippet}
    {#snippet trail()}
        <div class="hidden md:flex gap-5">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/treatments">Treatments</a>
        </div>
        <div class="md:hidden">
            <button
                type="button"
                data-collapse-toggle="#navbar-default"
                class="md:hidden btn-icon preset-filled bg-slate-100 inline-flex items-center justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
                on:click={
                    () => {
                        console.log('clicked');
                    }
                }
                ><span class="sr-only">Open main menu</span>
                <svg
                    class="w-7 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 23 14"
                >
                    <path
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg></button
            >
        </div>
    {/snippet}
    </AppBar>