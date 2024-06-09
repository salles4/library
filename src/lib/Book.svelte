<script>

  import TitleLabel from "./components/TitleLabel.svelte";
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { accType } from "../store";
  import Loading from "./components/Loading.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";
  import Modal from "./components/Modal.svelte";
  import InvalidLink from "./InvalidLink.svelte";

  let logged;
  accType.subscribe((value) => (logged = value));
  const loggedID = localStorage.getItem("user_id")

  export let params;
  const bookID = params.bookID;
  let noData = false
  // Book Details
  let book;
  let categories;
  async function getData() {
    const { data, error } = await supabase
      .from("books")
      .select("*, author(author_id, name), publisher(publisher_id, name), category(name)")
      .eq("book_id", bookID);
    console.table(data[0]);
    book = data[0];
    if(data.length == 0) noData = true

    const {data: categoriesData, error:categoriesError} = await supabase
    .from("books_category")
    .select("category(category_id, name)")
    .eq("book_id", bookID)
    console.log("category", categoriesData);
    if(categoriesError) console.error(categoriesError);
    if (categoriesData.length == 0) {categories = {0:{name:"Uncategorized", id:0}}}
    else{
      categories = categoriesData
    }

  }
  onMount(getData);
  // Staff
  let barcodeValue;
  async function getHoldingsData() {
    const {data, error} = await supabase.rpc("get_holdings", {bookid: bookID})
    if(error){console.error(error)}
    console.table(data);
    holdings = data
  }
  async function addCopy(){
    const {data} = await supabase
    .from("library_holdings")
    .select()
    .eq("barcode", barcodeValue)
    if(data.length != 0) {
      return
    }

    const {error} = await supabase
    .from("library_holdings")
    .insert({book_id:bookID, barcode:barcodeValue})
  }
  let holdings;
  if(logged == "staff"){
    getHoldingsData();
    supabase
    .channel('holdings')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'library_holdings' }, ()=>{getHoldingsData()})
    .subscribe()
  }
  // Client
  let reserveID
  let borrowID;
  let holdingCount = 0
  $: reserveButtonText = `Reserved (${reserveID})`
  let reserveButtonClass = "btn-secondary"
  if(logged == "client"){
    isBorrowed();
    if(!borrowID){
      isReserved()
      countHoldings();
    }
  }
  async function isReserved(){
    const { data, error } = await supabase.rpc("isreserved", {bookid:bookID, studid:loggedID})
    reserveID = data
  }
  async function countHoldings(){
    const {data:holding, error:holdingError} = await supabase
      .from("library_holdings")
      .select("barcode, holding_id")
      .eq("book_id", bookID)
      .eq("status", "Available")
      holdingCount = holding.length
  }
  async function isBorrowed(){
    const { data, error } = await supabase.rpc("isborrowed", {bookid:bookID, studid:loggedID})
    borrowID = data
  }
  async function reserve(){
    const {data:holding, error:holdingError} = await supabase
    .from("library_holdings")
    .select("barcode, holding_id")
    .eq("book_id", bookID)
    .eq("status", "Available")
    .limit(1)
    .single();
    if(holdingError) {console.error(holdingError); return;}

    const {error:insertError} = await supabase
    .from("book_reservation")
    .insert({
      reservation_id: await generateID(),
      stud_id:loggedID, 
      holding_id: holding.holding_id 
    })
    if(insertError) {console.error(insertError); return;}

    const {data:updateData, error:updateError} = await supabase
    .from("library_holdings")
    .update({status: "Reserved"})
    .eq("barcode", holding.barcode)
    .select("holding_id")
    .single()
    if(updateError) {console.error(updateError); return;}
    isReserved();
  }
  async function unreserve(){
    const {data, error} = await supabase
    .from("book_reservation")
    .update({active: false})
    .eq("reservation_id", reserveID)
    .select()
    .single()

    const {error:holdingError} = await supabase
    .from("library_holdings")
    .update({status:"Available"})
    .eq("holding_id", data.holding_id);

    if(!error || !holdingError){
      isReserved()
      countHoldings()
    }else{
      console.error(error)
      console.error(holdingError);
    }
  }
    function getRandomInt() {
    const min = 1000;
    const max = 9999;
    return 3000000 + Math.floor(Math.random() * (max - min + 1));
  }
  async function generateID(){
    let randomID = getRandomInt()
    const {data, error} = await supabase
    .from("book_reservation")
    .select()
    .eq("reservation_id", randomID)
    console.log(data);
    if(data.length != 0){
      //if exists, generate again
      randomID = getRandomInt()
      console.log("exists");
    }
    //to return
    console.log(randomID);
    return randomID;

  }
  //temp
  let src = bookID > 4 ? "./book-cover.png" : `./${bookID}.jpg`;
  
</script>

<main class="container" in:fade={{ duration: 500 }}>
  {#if noData}
    <InvalidLink />
  {/if}
  <section>
    <!-- * Label  -->
    <TitleLabel text="Book Details" />
    <!-- * Book Details Block -->
    {#if book}
      <div class="d-md-flex d-block">
        <div
          class="d-flex flex-column justify-content-center align-items-center gap-2"
        >
          <img
            id="img-cover"
            class="border p-3"
            {src}
            alt="book cover"
            height="300"
            width="300"
            style="object-fit: contain"
          />
          <small class="text-secondary">ISBN: {book.isbn}</small>
          {#if logged == "client"}
            {#if borrowID}
              <button class="btn btn-secondary w-75" disabled>Borrowed (#{borrowID})</button>
            {:else if reserveID}
            <button
              class="btn {reserveButtonClass} w-75"
              on:mouseenter={() => {
                reserveButtonText = "Cancel Reservation"
                reserveButtonClass = "btn-danger"
              }}
              on:mouseleave={() => {
                reserveButtonText = `Reserved (#${reserveID})`;
                reserveButtonClass = "btn-secondary"
              }}
              on:click={unreserve}
              ><i class="bi bi-x-circle"></i> {reserveButtonText}</button
            >
            {:else if holdingCount == 0}
            <button
              disabled
              class="btn btn-secondary w-50"
              >Unavailable</button
            >  
            {:else}
            <button
              disabled={false}
              class="btn btn-primary w-50"
              on:click={reserve}
              >Reserve</button
            >
            {/if}
          {/if}
        </div>

        <div id="details-container" class="container mt-md-0 mt-3">
          <h1 id="book-title" class="mb-2 pb-2">
            {book.title}
          </h1>
          <p id="book-description">
            {book.description}
          </p>
          <p>
            <b>Author:</b>
            <a href="./#/author/{book.author.author_id}">
              {book.author.name}
            </a>
          </p>
          <p>
            <b>Publisher:</b>
            <a href="./#/publisher/{book.publisher.publisher_id}">
              {book.publisher.name}
            </a>
          </p>
          <p>
            <b>Category:</b>
            {#if categories}
            {#each Object.entries(categories) as [i, category]}
              <a href="./#/">
                {category.category.name}
              </a>
              &nbsp;
            {/each}
            {/if}
          </p>
          <p>
            <b>Shelf No.: </b>
            {book.shelf_number}
          </p>
        </div>
      </div>
    {:else}
      <Loading />
    {/if}
  </section>
  <!-- {#if logged == "client"}
    <SectionLabel title="To Do" icon="check2-square">
      <div class="my-5">a</div>
    </SectionLabel>
  {/if} -->
  {#if logged == "staff"}
    <SectionLabel title="Status" icon="journal">
      <div class="row justify-content-center align-items-center my-3">
        <label for="copy" class="form=control col-auto">Add Copy:</label>
        <div class="col-4">
          <input
            bind:value={barcodeValue}
            type="text"
            class="form-control"
            id="copy"
            placeholder="Barcode Number"
          />
        </div>
        <button on:click={addCopy} class="btn btn-primary col-2">Add</button>
      </div>
      {#if holdings}
        {#if holdings.length <= 0}
          <div class="text-center my-5">
            <h3>No Library Holdings.</h3>
            <small>Add a copy above</small>
          </div>
        {:else}
          <table
            class="table table-bordered table-striped text-center align-middle"
          >
            <thead>
              <tr>
                <th class="py-3 col-3">Barcode</th>
                <th class="py-3 col-5">Student</th>
                <th class="py-3 col-2">Status</th>
                <th class="py-3 col-1">Actions</th>
              </tr>
            </thead>

            <tbody>
              {#each Object.entries(holdings) as [i, data]}
                <tr>
                  <td>{data.barcode}</td>
                  <td
                    >{data.status != "Available"
                      ? `${data.fname} ${data.lname}`
                      : "--"}</td
                  >
                  <td
                    class={data.status == "Available"
                      ? "text-bg-success"
                      : data.status == `Reserved`
                        ? "text-bg-secondary"
                        : "text-bg-danger"}>{data.status} {data.reservation_id ? `(${data.reservation_id})` : data.borrow_id ? `(${data.borrow_id})` : ""}</td
                  >
                  <td
                    ><a
                      href={data.status == "Available"
                        ? `./#/borrow?barcode=${data.barcode}`
                        : data.status == `Reserved`
                        ? `./#/borrow?reserve_id=${data.reservation_id}`
                        : `./#/return?borrow_id=${data.borrow_id}`}
                      class="btn btn-outline-primary btn-sm"
                      ><small
                        >{data.status == "Borrowed"
                        ? `Return`
                        : "Borrow"} <i class="bi bi-box-arrow-up-right"></i></small
                      ></a
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      {/if}
      
    </SectionLabel>
  {/if}
  <div class="my-5"></div>
</main>
