<script>
  let src = '/cover.jpg'
</script>

<section>
  <div
    id="homeAdCarousel"
    class="carousel slide container"
    data-bs-ride="carousel"
    data-bs-interval="8000"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img {src} class="w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img {src} class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img {src} class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#homeAdCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#homeAdCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</section>
