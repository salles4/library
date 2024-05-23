<script>
  /**Id of the book*/
  export let id = 0;
  /**Title of the book*/
  export let title;
  export let author;
</script>

<div class="card col-lg-3 col-6">
  <img src="./{id}.jpg" alt="book cover"/>
  <div class="card-body">
    <h5 class="card-title"><a class="stretched-link" href="./#/book/{id}">{title}</a></h5>
    <small class="card-text"><i class="bi bi-person"></i> {author}</small>
  </div>
</div>
<style>
  .card:hover {
      transform: scale(102%);
  }
  .card:hover a{
    text-decoration: underline;
  }
  .card img {
      height: 200px;
      object-fit: contain;
      padding-top: 1em;
  }
  a{
    text-decoration: none;
    color: white;
  }
</style>