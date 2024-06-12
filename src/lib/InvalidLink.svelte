<script>
  import { fade } from "svelte/transition";
</script>

<div
  class="position-absolute top-50 start-50 translate-middle z-2"
  style="background-color: var(--bs-body-bg); width:100vw; height:100vh"
>
  <div
    class="d-flex align-items-center justify-content-center flex-column gap-2"
    style="height: 70vh"
    in:fade={{ duration: 500 }}
  >
    <h1>Missing Link <i class="bi bi-link-45deg" /></h1>
    <div class="text-center mb-4">
      <p class="my-0">
        We couldn't find the page you requested. Please check the URL and try
        again.
      </p>
      <small class="text-secondary fw-bold">404 : Not Found</small>
    </div>
    <a href="./#/" class="fw-bold">Back to Home</a>
  </div>
</div>
