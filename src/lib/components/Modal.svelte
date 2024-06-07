<script>
  export let title = "Modal";
  export let id = "modal";
  export let pButton = "Confirm"
  export let sButton = "Cancel"
</script>

<!-- 
  @component
  Activate with 
  ```tsx
  <button ... data-bs-toggle="modal" data-bs-target="#{id}"/>
  ```
-->

<div class="modal fade" id={id} tabindex="-1"aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss={id} aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss={id}>{sButton}</button>
        <button type="button" class="btn btn-primary" on:click>{pButton}</button>
      </div>
    </div>
  </div>
</div>