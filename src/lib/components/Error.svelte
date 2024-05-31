<script>
  export let code = "err";
  export let message;
</script>

<div class="d-flex align-items-center justify-content-center my-3">
    <div class="text-center">
        <h2>Error</h2>
        <p>{code}: {message}</p>
        <a href="./#/" class="fw-bold">Reload</a> 
    </div>
</div>