<script lang="ts">
    import ChevronsDownIcon from '~icons/mdi/chevron-double-down'
    let { scrollIntoView, text, href }: { scrollIntoView: (event: Event) => void, text: string, href: string } = $props();
</script>

<div class="flex flex-row items-center">
    <a
        class="text-sm md:text-lg text-white text-shadow-sm"
        href={href}
        onclick={scrollIntoView}>{text}</a
    >
    <ChevronsDownIcon style="width: 24px; height: 24px;" class="text-white" />
</div>