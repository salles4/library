<script>
  /** Title of the section */
  export let title;
  /** Bootstrap Icon Name */
  export let icon;
  /** Button href, hide button if not defined */
  export let link = "";
</script>

<div class="border-bottom border-2 d-flex justify-content-between mb-2">
  <h4 class="my-3"><i class="bi bi-{icon}"></i> {title}</h4>
  {#if link !== ""}
    <div class="align-middle align-self-center">
      <button class="btn btn-outline-primary btn-sm">
        See All <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  {/if}
</div>
