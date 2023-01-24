<script lang="ts">
  import Item from "./item.svelte";
  export let data: any = [];
 
</script>


<div class="table-grid">
  
    {#each data as { name }, i}
      <Item {name} />
    {/each}

</div>

<style>
  .table-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
  }
</style>
