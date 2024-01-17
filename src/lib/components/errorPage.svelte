<script lang="ts">
    import cryingCat from '$lib/assets/crying-cat.gif'
    export let errorText: string
</script>

<div class="w-full h-screen flex flex-col gap-2 items-center justify-center">
    <p class="text-4xl">{errorText}</p>
    <img src="{cryingCat}" alt="Cat crying" width="40%" height="40%">
</div>
