<script>
  export let id = 0;
  export let title;

</script>

<div class="card col-lg-3 col-6">
  <img src="./{id}.jpg" alt="book cover"/>
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <a href="/#/book/{id}" class="btn btn-primary btn-sm stretched-link">Details</a>
    <a class="btn btn-danger btn-sm" href="/#/book/{id}"><i class="bi bi-heart"></i></a>
  </div>
</div>
<style>
  .card:hover {
      transform: scale(102%);
  }

  /* .card {
      transition: 300ms;
      cursor: pointer;
  } */

  .card img {
      height: 200px;
      object-fit: contain;
      padding: 1rem;
  }

  .card .btn {
      visibility: hidden;
  }

  .card:hover .btn {
      visibility: visible;
  }
</style>