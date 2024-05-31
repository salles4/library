<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { fade } from "svelte/transition";

  let today = moment().format("YYYY-MM-DD HH:mm");

  let borrowDate = today;
  let returnDate = moment(today).add(5, 'days').format("YYYY-MM-DD");
  


</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Return Book" />
  <div class="row justify-content-center">
    <div class="col-sm-12 col-lg-6">
      <Row label="Borrow ID:" id="book-id">
        <input class="form-control" type="text" id="book-id" />
      </Row>
      <Row label="Condition:" id="book-condition">
        <select class="form-select" id="book-condition">
          <option>New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </Row>
      <Row label="Note:" id="book-note">
        <textarea class="form-control" rows="3" id="book-note" />
      </Row>
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="return-time"
          >Return Time:</label
        >
        <div class="col-sm-5 col-md-6 col-7">
          <input
            class="form-control"
            type="datetime-local"
            id="return-time"
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
