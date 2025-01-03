<script>
  import { breadcrumbs } from "$lib/stores/breadcrumb";
</script>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    {#each $breadcrumbs as crumb, index}
      <li
        class="breadcrumb-item {index === $breadcrumbs.length - 1
          ? 'active'
          : ''}"
      >
        {#if index !== $breadcrumbs.length - 1}
          <a href={crumb.href}>{crumb.label} / </a>
        {:else}
          <span>{crumb.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumb {
    display: flex;
    gap: 0.5rem;
    list-style: none;
  }
  .breadcrumb-item {
    font-size: 0.875rem;
    color: #555;
  }
  .breadcrumb-item a {
    text-decoration: none;
    color: #555;
  }
  .breadcrumb-item.active {
    color: #2faf7a;
    pointer-events: none;
  }
</style>
