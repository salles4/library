<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import RowPreview from "../forms/RowPreview.svelte";
  import { supabase } from "../../supabase";
  import { querystring } from "svelte-spa-router";
  import Modal from "../components/Modal.svelte";

  let today = moment().format("YYYY-MM-DD HH:mm");

  let returnDate = today;
  let returnDue = "";
  $: daysGap = moment(returnDate).diff(moment(returnDue), "days") * -1;

  const staffID = localStorage.getItem("user_id");

  let borrowID;
  let borrowIDClass = "";
  const queryParams = new URLSearchParams($querystring);
  borrowID = queryParams.get("borrow_id") || "";

  let preview = false;
  let returnID;
  let bookName;
  let bookBarcode;
  let studID;
  let studName;
  let noteValue;
  let conditionValue;

  async function togglePreview() {
    const { data: borrowIDData, error: IDError } = await supabase
      .from("book_borrow")
      .select()
      .eq("borrow_id", borrowID)
      .eq("active", true)
      .maybeSingle();

    if (!borrowIDData) {
      borrowIDClass = "is-invalid";
      return;
    }
    const { data: borrowInfo, error } = await supabase.rpc("getborrowinfo", {
      borrowid: borrowID,
    });
    console.error(error);
    console.table(borrowInfo);

    let data = borrowInfo[0];
    studName = `${data.fname} ${data.lname}`;
    studID = data.stud_id;
    bookName = data.title;
    bookBarcode = data.barcode;
    returnDue = data.due_date;
    returnID = await generateID();
    preview = true;
  }
  async function returnBook() {
    const { data, error } = await supabase
      .from("book_return")
      .insert({
        return_id: await generateID(),
        borrow_id: borrowID,
        staff_id: staffID,
        note: noteValue,
        return_date: moment(returnDate).format("YYYY-MM-DDTHH:MMZ"),
        condition: conditionValue,
      })
      .select();
    if (error) {
      console.error(error);
      return;
    }
    console.table(data);
    const { data: updateHoldings, error: errorHoldings } = await supabase
      .from("library_holdings")
      .update({ status: "Available", condition: conditionValue })
      .eq("barcode", bookBarcode)
      .select();

    const { data: borrowUpdate, error: errorBorrow } = await supabase
      .from("book_borrow")
      .update({ active: false })
      .eq("borrow_id", borrowID)
      .select();
    if (errorHoldings || errorBorrow) {
      console.error(errorHoldings);
      console.error(errorBorrow);
      return;
    }
    console.log(updateHoldings, borrowUpdate);
  }

  //Random id generator
  function getRandomInt() {
    const min = 1000;
    const max = 9999;
    return "500" + Math.floor(Math.random() * (max - min + 1));
  }
  async function generateID() {
    let randomID = getRandomInt();
    const { data, error } = await supabase
      .from("book_return")
      .select()
      .eq("return_id", randomID);
    console.log(data);
    if (data.length != 0) {
      //if exists, generate again
      randomID = getRandomInt();
      console.log("exists");
    }
    //to return
    console.log(randomID);
    return randomID;
  }
  $: paymentValue = daysGap * -50;
  let refNum;
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Return Book" />
  <div class="row justify-content-around">
    <div class="col-sm-12 col-lg-6 mb-sm-4">
      <Row label="Borrow ID:" id="book-id">
        <input
          class="form-control {borrowIDClass}"
          on:keyup={() => (borrowIDClass = "")}
          type="text"
          id="book-id"
          bind:value={borrowID}
        />
        <div class="invalid-feedback">Borrow ID not found.</div>
      </Row>
      <Row label="Condition:" id="book-condition">
        <select
          class="form-select"
          id="book-condition"
          bind:value={conditionValue}
        >
          <option>New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </Row>
      <Row label="Note:" id="book-note">
        <textarea
          class="form-control"
          rows="3"
          id="book-note"
          bind:value={noteValue}
        />
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
            bind:value={returnDate}
          />
        </div>
        <div class="col-sm-3 col-md-3 col-auto">
          <button
            on:click={() => (returnDate = today)}
            class="w-100 btn btn-outline-primary">Now</button
          >
        </div>
      </div>
      <!-- Row -->

      <div class="float-end">
        <button
          class=" btn btn-{preview ? 'secondary' : 'success'}"
          on:click={togglePreview}><i class="bi bi-receipt"></i> Preview</button
        >
        <a href="./#/" class=" btn btn-danger">
          <i class="bi bi-x-circle"></i> Cancel
        </a>
      </div>
    </div>
    {#if preview}
      <div
        class="col-sm-12 col-lg-5 border border-1 px-5"
        transition:fly={{ duration: 400, y: -60 }}
      >
        <h3 class="py-4 text-center">Return Preview</h3>
        <RowPreview key="Borrow ID" value={borrowID} />
        <RowPreview key="Return ID" value={returnID} />
        <RowPreview key="Name" value="{studName} ({studID})" />
        <RowPreview key="Book Title" value="{bookName} ({bookBarcode})" />
        <RowPreview key="Condition" value={conditionValue} />
        {#if noteValue}
          <RowPreview key="Return Note" value={noteValue} />
        {/if}
        <RowPreview
          key="Received by"
          value="Francis James E. Salles ({staffID})"
        />
        <RowPreview
          key="Return Due"
          value={moment(returnDue).format("MMMM DD, YYYY")}
        />
        <RowPreview
          key="Return Date"
          value="{moment(returnDate).format(
            'MMMM DD, YYYY hh:mm a'
          )} ({daysGap > 0 ? `+${daysGap}` : daysGap} days)"
        />
        {#if daysGap < 0}
          <div class="mb-2 row">
            <div class="col-sm-4 col-md-4"><b>Late Return Fee:</b></div>
            <div class="col-sm-8 col-md-8">
              {paymentValue} pesos
            </div>
          </div>
        {/if}

        <div class="float-end my-2">
          <button class=" btn btn-success" on:click={returnBook}
            ><i class="bi bi-arrow-up-circle"></i> Return</button
          >
          {#if daysGap < 0}
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#payModal"
              on:click={() => {}}><i class="bi bi-cash"></i> Pay</button
            >
          {/if}
        </div>
      </div>
    {/if}
  </div>
  <Modal
    title="Process Payment"
    id="payModal"
    pButton="Done"
    on:click={() => {
      
    }}
  >
    <div class="container row">
      <div>Amount to pay:</div>
      <h1 class="text-center">₱{paymentValue}</h1>
      <hr class="my-4" />
      <Row label="Ref No.:" id="ref">
        <input class="form-control" type="text" id="ref" bind:value={refNum} />
      </Row>
      <Row label="Payment Method:" id="payment_method">
        <select name="payment_method" class="form-select" id="payment_method">
          <option value="cash">Cash</option>
          <option value="GCash">GCash</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </Row>
    </div>
  </Modal>
</main>
