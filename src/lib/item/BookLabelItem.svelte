<script>
  /**Id of the book*/
  export let id = 0;
  /**Title of the book*/
  export let title;
  // export let author;
  export let label;
  export let color;

  let src = id > 4 ? "./book-cover.png" : `./${id}.jpg`;
</script>

<div class="card col-md-3 col-10">
  <!-- <img {src} alt="book cover"/> -->
  <div class="card-body">
    <h5 class="card-title"><a class="stretched-link" href="./#/book/{id}">{title}</a></h5>
    <!-- <small class="card-text"><i class="bi bi-person"></i> {author}</small> -->
    <div>
      <span class="badge rounded-pill text-bg-{color}">{label}</span>
    </div>
  </div>
</div>
<style>
  .card:hover {
      transform: scale(102%);
  }
  /* .card img {
    height: 200px;
    object-fit: contain;
    padding-top: 1em;
  } */
  .card:hover a{
    text-decoration: underline;
  }
  a{
    text-decoration: none;
    color: var(--bs-body-color);
  }
</style>