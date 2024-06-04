<script>
    export let name;
    export let link;
    export let icon = "";
  </script>
  
  <div
      class="card col-md-3 col-5 border-1 py-2">
    <div class="d-flex justify-content-center" style="font-size: 3em;">
        <i class="bi bi-{icon}"></i>
    </div>
      <div class="card-body p-1">
        <h5 class="card-title text-center my-2"><a class="stretched-link" href="./#/{link}">{name}</a></h5>
      </div>
  </div>
  
  <style>
    .card:hover a{
      text-decoration: underline;
    }
    a{
      text-decoration: none;
      color: var(--bs-body-color);
    }
  </style>