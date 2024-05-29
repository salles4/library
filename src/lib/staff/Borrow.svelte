<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";

  let today = moment().format("YYYY-MM-DD");

  let borrowDate = today;
  let returnDate = moment(today).add(5, 'days').format("YYYY-MM-DD");
  


</script>

<main class="container">
  <TitleLabel text="Borrow Book" />
  <div class="row justify-content-center">
    <div class="col-sm-12 col-lg-6">
      <Row label="Student ID:" id="book-name">
        <input class="form-control" type="text" id="book-name" />
      </Row>
      <Row label="Book Barcode:" id="book-barcode">
        <input class="form-control" type="text" id="book-barcode" />
      </Row>
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="borrow-date"
          >Borrow Date:</label
        >
        <div class="col-sm-6 col-md-6 col-7">
          <input
            class="form-control"
            type="date"
            id="borrow-date"
            bind:value={borrowDate}
          />
        </div>
        <div class="col-sm-2 col-md-3 col-auto">
          <button
            on:click|preventDefault={() => borrowDate = today}
            class="w-100 btn btn-outline-primary">Today</button
          >
        </div>
      </div>
      <!-- Row -->
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="return-date"
          >Return Date:</label
        >
        <div class="col-sm-6 col-md-6 col-7">
          <input
            class="form-control"
            type="date"
            id="return-date"
            bind:value={returnDate}
          />
        </div>
        <div class="col-sm-2 col-md-3 col-auto">
          <button
            on:click={() => returnDate = moment(borrowDate).add(5, 'days').format("YYYY-MM-DD")}
            class="w-100 btn btn-outline-primary">5 Days</button
          >
        </div>
      </div>
      <!-- Row -->
    </div>
  </div>
</main>
