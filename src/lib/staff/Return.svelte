<script>
  import moment from "moment";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import RowPreview from "../forms/RowPreview.svelte";
  import { supabase } from "../../supabase";

  let today = moment().format("YYYY-MM-DD HH:mm");

  let returnDate = today
  let returnDue = moment().subtract("5", "days");
  $: daysGap = moment(returnDate).diff(moment(returnDue).format("YYYY-MM-DD"), "days") * -1
  
  const staffID = localStorage.getItem("user_id")

  let preview = true
  let borrowID;
  let bookName;
  let bookBarcode;
  let studID;
  let studName;
  let noteValue;
  let conditionValue;

  async function togglePreview(){
    const {data:borrowInfo, error} = await supabase.rpc("getborrowinfo", {borrowid: borrowID})
    console.error(error);
    console.table(borrowInfo)
    
    let data = borrowInfo[0]
    studName = `${data.fname} ${data.lname}`
    studID = data.stud_id;
    bookName = data.title;
    bookBarcode = data.barcode;
    returnDue = data.due_date
  }
  function returnBook(){

  }
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Return Book" />
  <div class="row justify-content-around">
    <div class="col-sm-12 col-lg-6">
      <Row label="Borrow ID:" id="book-id">
        <input class="form-control" type="text" id="book-id" bind:value={borrowID}/>
      </Row>
      <Row label="Condition:" id="book-condition">
        <select class="form-select" id="book-condition" bind:value={conditionValue}>
          <option>New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </Row>
      <Row label="Note:" id="book-note">
        <textarea class="form-control" rows="3" id="book-note" bind:value={noteValue}/>
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
            on:click={() => returnDate = today}
            class="w-100 btn btn-outline-primary">Now</button
          >
        </div>
      </div>
      <!-- Row -->
      
      <div class="float-end">
        <button class=" btn btn-success" on:click={togglePreview}
          ><i class="bi bi-receipt"></i> Preview</button
        >
        <a href="./#/" class=" btn btn-danger">
          <i class="bi bi-x-circle"></i> Cancel
        </a>
      </div>
    </div>
    {#if preview}
      <div class="col-sm-12 col-lg-5 border border-1 px-5" transition:fly={{ duration: 400, y:-60 }}>
        <h3 class="py-4 text-center">Borrow Preview</h3>
        <RowPreview key="Borrow ID" value={borrowID} />
        <RowPreview key="Name" value="{studName} ({studID})" />
        <RowPreview key="Book Title" value="{bookName} ({bookBarcode})" />
        <RowPreview key="Condition" value={conditionValue} />
        {#if noteValue}
          <RowPreview key="Return Note" value={noteValue} />
        {/if}
        <RowPreview key="Received by" value="Francis James E. Salles ({staffID})" />
        <RowPreview
          key="Return Due"
          value={moment(returnDue).format("MMMM DD, YYYY")}
        />
        <RowPreview
          key="Return Date"
          value="{moment(returnDate).format('MMMM DD, YYYY hh:mm a')} ({daysGap} days)"
        />

        <div class="float-end my-2">
          <button class=" btn btn-secondary" on:click={returnBook}
            ><i class="bi bi-arrow-up-circle"></i> Return</button
          >
        </div>
      </div>
    {/if}
  </div>
</main>
