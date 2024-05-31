<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";

  let today = moment().format("YYYY-MM-DD HH:mm");

  let borrowDate = today;
  let returnDate = moment(today).add(5, 'days').format("YYYY-MM-DD");
  


</script>

<main class="container">
  <TitleLabel text="Return Book" />
  <div class="row justify-content-center">
    <div class="col-sm-12 col-lg-6">
      <Row label="Borrow ID:" id="book-name">
        <input class="form-control" type="text" id="book-name" />
      </Row>
      <Row label="Note:" id="book-barcode">
        <textarea class="form-control" rows="3" id="book-barcode" />
      </Row>
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="borrow-date"
          >Borrow Time:</label
        >
        <div class="col-sm-5 col-md-6 col-7">
          <input
            class="form-control"
            type="datetime-local"
            id="borrow-date"
            bind:value={borrowDate}
          />
        </div>
        <div class="col-sm-3 col-md-3 col-auto">
          <button
            on:click|preventDefault={() => borrowDate = today}
            class="w-100 btn btn-outline-primary">Today</button
          >
        </div>
      </div>
      <!-- Row -->
      
      <div class="float-end">
        <button class=" btn btn-success"
          ><i class="bi bi-arrow-down-circle"></i> Return</button
        >
        <a href="./#/" class=" btn btn-danger">
          <i class="bi bi-x-circle"></i> Cancel
        </a>
      </div>
    </div>
  </div>
</main>
