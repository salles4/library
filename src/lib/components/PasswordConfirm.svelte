<script>
  import { fly } from "svelte/transition";
  import Row from "../forms/Row.svelte";
  import { createEventDispatcher } from 'svelte';
  import { supabase } from "../../supabase";
  export let bookTitle;
  export let bookID;

	const dispatch = createEventDispatcher();

  let passwordValue;
  let bookValue;

  let passwordClass;
  let bookNameClass;

  async function deleteBook(){
    if(bookValue != bookTitle){
      bookNameClass = "is-invalid"
    }
    const {data:logData, error:logError} = await supabase
    .from("user_level")
    .select("user_id")
    .eq("user_id", localStorage.getItem("user_id"))
    .eq("password", passwordValue)
    .single()

    if(logError){
      console.error(logError);
      passwordClass = "is-invalid"
    }

    if(passwordClass||bookNameClass) return;

    const {error} = await supabase.rpc("delete_book", {id: bookID})
    if(error) {
      console.error(error);
      alert(`Failed to delete: ${error.message}`)
    }else{
      const {error:reportError} = await supabase
      .from("reports")
      .insert({
        report_type:"Delete",
        report_details:`All data of ${bookTitle} have been deleted`,
        staff_id: localStorage.getItem("user_id"),
      })
      if(reportError) console.error(reportError);

      alert(`Successfully deleted all data of ${bookTitle}`)

    }
  }
</script>
<div
  class="position-fixed top-50 start-50 translate-middle z-2 hid"
  style="background-color: var(--bs-body-bg); width:100vw; height:102vh; padding:0;"
  transition:fly={{ duration: 400, y: -900 }}
>
  <div
    class="d-flex align-items-center justify-content-center flex-column gap-2"
    style="height: 90vh"
  >
    <h1 class="text-danger">Book Deletion</h1>
    <div class="text-center mb-4">
      <p class="my-0">
        This action will delete all records of this book in the database including book details, library holdings, and reports.
      </p>
      <div class="text-secondary">If you want to hide the book from students, you can make the book <b>private</b></div>
    </div>
    <div class="mb-4">Please enter your password and name of the book <b>"{bookTitle}"</b> to confirm deletion.</div>
    <div class="mb-4 row col-4">
      <label class="col-4 col-form-label" for="password">Password:</label>
      <div class="col-8 ">
        <input class="form-control {passwordClass}" type="password" id="password" on:keyup={() => passwordClass = ""} bind:value={passwordValue}>
        <div class="invalid-feedback">Wrong Password</div>
      </div>
    </div>
    <div class="mb-4 row col-4">
      <label class="col-4 col-form-label" for="bookname">Book Name:</label>
      <div class="col-8 ">
        <input class="form-control {bookNameClass}" type="text" id="bookname" on:keyup={() => bookNameClass = ""} bind:value={bookValue}>
        <div class="invalid-feedback">Book Name does not match</div>
      </div>
    </div>
    <div>
      <button class="btn btn-danger" on:click={deleteBook}>Confirm</button>
      <button class="btn btn-outline-success" on:click={()=>dispatch('cancel')}>Cancel</button>
    </div>
  </div>
</div>