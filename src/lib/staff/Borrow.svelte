<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import RowButton from "../forms/RowButton.svelte";
  import RowPreview from "../forms/RowPreview.svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../../supabase";
  import { querystring } from "svelte-spa-router";

  const today = moment().format("YYYY-MM-DD HH:mm");
  const daysDue = 14;

  let borrowDate = today;
  let returnDate = moment(today).add(daysDue, "days").format("YYYY-MM-DD");
  $: daysGap = moment(returnDate)
            .subtract(borrowDate, "days")
            .subtract(1, "days")
            .format('DD')

  let preview = false;
  let reserveID;
  let studID;
  let bookBarcode;

  const queryParams = new URLSearchParams($querystring);
  reserveID = queryParams.get("reserve_id") || "";
  bookBarcode = queryParams.get("barcode") || "";

  let studName;
  let bookName;

  let reserveClass;
  let studClass;
  let barcodeClass;
  async function togglePreview() {
    const { data: stud, error: studError } = await supabase
      .from("account_details")
      .select("fname, lname")
      .eq("user_id", studID)
      .single();
    if (studError) {
      studClass = "is-invalid";
    }else{
      studName = `${stud.fname} ${stud.lname}`;
    }

    const { data: book, error: bookError } = await supabase
      .from("library_holdings")
      .select("books(title)")
      .eq("barcode", bookBarcode)
      .single();
    if (bookError || !book) {
      barcodeClass = "is-invalid";
    }else{
      // @ts-ignore
      bookName = book.books.title;
    }
    preview = !preview;
  }
  async function fetchReserve(){
    const {data, error} = await supabase
    .from("book_reservation")
    .select("stud_id, library_holdings(barcode)")
    .eq("reservation_id", reserveID)
    .single()

    if (error || !data) {
      reserveClass = "is-invalid"
      console.error(error);
    }else{
      studID = data.stud_id;
      // @ts-ignore
      bookBarcode = data.library_holdings.barcode;
      togglePreview()
    }
  }
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Borrow Book" />
  <div class="row justify-content-around">
    <div class="col-sm-12 col-lg-6">
      <RowButton
        label="Reservation ID:"
        id="reserve"
        button="Fetch"
        on:click={fetchReserve}
      >
        <input
          class="form-control {reserveClass}"
          type="number"
          id="reserve"
          bind:value={reserveID}
          on:keyup={() => (reserveClass = "")}
        />
        <div class="invalid-feedback">Cannot Find Reservation</div>
      </RowButton>
      <hr class="mb-4">
      <Row label="Student ID:" id="stud-id">
        <input
          class="form-control {studClass}"
          type="text"
          id="stud-id"
          bind:value={studID}
          on:keyup={() => (studClass = "")}
        />
        <div class="invalid-feedback">Cannot Find Student</div>
      </Row>
      <Row label="Book Barcode:" id="book-barcode">
        <input
          class="form-control {barcodeClass}"
          type="text"
          id="book-barcode"
          bind:value={bookBarcode}
          on:keyup={() => (barcodeClass = "")}
        />
        <div class="invalid-feedback">Cannot Find Book</div>
      </Row>
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="borrow-date"
          >Borrow Date:</label
        >
        <div class="col-sm-5 col-md-6 col-7">
          <input
            class="form-control"
            type="datetime-local"
            id="borrow-date"
            max={moment(returnDate).format("YYYY-MM-DD HH:mm")}
            bind:value={borrowDate}
          />
        </div>
        <div class="col-sm-3 col-md-3 col-auto">
          <button
            on:click={() => (borrowDate = today)}
            class="w-100 btn btn-outline-primary">Today</button
          >
        </div>
      </div>
      <!-- Row -->
      <div class="mb-4 row justify-content-center">
        <label class="col-sm-4 col-md-3 col-form-label" for="return-date"
          >Return Due:</label
        >
        <div class="col-sm-5 col-md-6 col-7">
          <input
            class="form-control"
            type="date"
            id="return-date"
            min={moment(borrowDate).format("YYYY-MM-DD")}
            bind:value={returnDate}
          />
        </div>
        <div class="col-sm-3 col-md-3 col-auto">
          <button
            on:click={() =>
              (returnDate = moment(borrowDate)
                .add(daysDue, "days")
                .format("YYYY-MM-DD"))}
            class="w-100 btn btn-outline-primary">~{daysDue} Days</button
          >
        </div>
      </div>
      <!-- Row -->
      <div class="float-end">
        <button
          class=" btn btn-success"
          on:click={() => {
            togglePreview();
          }}><i class="bi bi-receipt"></i> Preview</button
        >
        <a href="./#/" class=" btn btn-danger">
          <i class="bi bi-x-circle"></i> Cancel
        </a>
      </div>
    </div>
    {#if preview}
      <div class="col-sm-12 col-lg-5 border border-1 px-5">
        <h3 class="py-4 text-center">Borrow Preview</h3>
        <RowPreview key="Borrow ID" value="-- Preview --" />
        <RowPreview key="Name" value={studName} />
        <RowPreview key="Book Title" value="{bookName} ({bookBarcode})" />
        <RowPreview key="Staff Name" value="Francis James E. Salles (153827)" />
        <RowPreview
          key="Borrow Date"
          value={moment(borrowDate).format("MMMM DD, YYYY - hh:mm a")}
        />
        <RowPreview
          key="Return Due"
          value="{moment(returnDate).format('MMMM DD, YYYY')} ({daysGap} days)"
        />

        <div class="float-end my-2">
          <button class=" btn btn-secondary"
            ><i class="bi bi-arrow-up-circle"></i> Borrow</button
          >
        </div>
      </div>
    {/if}
  </div>
</main>
