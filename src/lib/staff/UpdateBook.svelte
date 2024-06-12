<script>
  import { fade } from "svelte/transition";
  import Row from "../forms/Row.svelte";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { pop, replace, querystring } from "svelte-spa-router"
  import { supabase } from "../../supabase";

  const queryParams = new URLSearchParams($querystring);
  const bookID = queryParams.get("id")
  if(!bookID) {
    replace("#/invalid-link")
  }else{
    getData();
  }

  let titleValue;
  let descriptionValue;
  let categoryValue;
  let authorValue;
  let publisherValue;
  let shelfValue;
  let isbnValue;
  let categoriesIDs;

  let categoryClass;
  let authorClass;
  let publisherClass;

  let files;
  let fileInput;
  let previewClass = "d-none";
  let previewSrc = `https://oatzrwezibkcabfwxppo.supabase.co/storage/v1/object/public/books/${bookID}.jpg`;

  $: if (files && files[0]) {
    console.log(files);
    previewClass = "";
    const img = URL.createObjectURL(files[0]);
    previewSrc = img;
  } else {
    console.log(files);
    previewClass = "d-none";
  }

  async function getData(){
    const { data, error } = await supabase
      .from("books")
      .select("*, author(author_id, name), publisher(publisher_id, name)")
      .eq("book_id", bookID)
      .single()

    if(error){
      console.error(error);
      replace("#/invalid-link")
      return
    }

    titleValue = data.title;
    descriptionValue = data.description;
    authorValue = data.author.name
    publisherValue = data.publisher.name
    shelfValue = data.shelf_number
    isbnValue = data.isbn

  }
  async function submit(){
    if(!(await checkNames())) return
    const {error} = await supabase.rpc("updatebook",{
      bookid: bookID,
      titlevalue: titleValue,
      descriptionvalue: descriptionValue,
      author_name: authorValue,
      publisher_name: publisherValue,
      shelf_numbervalue: shelfValue,
      isbnvalue: isbnValue,
    })
    if(files && files[0]){
      const {data:imageData, error:imageError} = await supabase.storage
      .from('books').upload(`${bookID}.jpg`, files[0], {upsert:true})
      if(imageError) console.error(imageError);
    }else{
      const {data:imageData, error:imageError} = await supabase.storage
      .from('books').remove([`${bookID}.jpg`])
      if(imageError) console.error(imageError);
    }
    
    if(error){console.error(error); alert(error.details); alert(error.hint); return}
    alert("Succesfully Updated")

    const {error:deleteCategoriesError} = await supabase.from("books_category").delete().eq("book_id", bookID)
    if(deleteCategoriesError) console.error(deleteCategoriesError);
    let categoryPushed = true
    for (const categoryID in categoriesIDs){
      console.log(categoryID);
      const {data:categoryData, error:categoryError} = await supabase
      .from("books_category")
      .insert({book_id:bookID, category_id:categoriesIDs[categoryID]})
      if(categoryError) {
        console.error(categoryError);
        categoryPushed = false
      }
    }

    if(!categoryPushed) alert("Had problem while pushing categories, Update book later")

    // record into report
    const {error:reportError} = await supabase
    .from("reports")
    .insert({
      report_type:"Update Book",
      report_details:`Changed Details of ${titleValue}`,
      book_id: bookID,
      staff_id: localStorage.getItem("user_id"),
    })
    if(reportError) console.error(reportError);

    pop()
  }
  async function checkNames(){
    const { data: authorID, error: authorError } = await supabase
      .from("author")
      .select("author_id")
      .eq("name", authorValue)
      .single();

    const { data: publisherID, error: publisherError } = await supabase
      .from("publisher")
      .select("publisher_id")
      .eq("name", publisherValue)
      .single();

    let complete = true;
    if (authorError || !authorID) {
      authorClass = "is-invalid";
      complete = false
    }
    if (publisherError || !publisherID) {
      publisherClass = "is-invalid";
      complete = false
    }
    if (!(await validateCategories())) {
      if (categoriesIDs.length != 0) return;
      categoryClass = "is-invalid";
      complete = false;
    }

    return complete
  }
  async function validateCategories() {
    if (categoryValue == "") {
      return false;
    }

    let valid = true;
    let validCategoryID = [];

    let categoriesArray = categoryValue.split(",").map((item) => item.trim());
    console.log(categoriesArray);
    for (const category of categoriesArray) {
      console.log(category);
      const { data: categoryID, error: categoryError } = await supabase
        .from("category")
        .select("category_id")
        .eq("name", category)
        .single();
      if (categoryError) {
        valid = false;
        console.error(categoryError);
      } else {
        validCategoryID.push(categoryID.category_id);
      }
      console.log(valid);
    }

    console.log(categoriesArray, validCategoryID);
    categoriesIDs = valid ? validCategoryID : [];
    console.log(valid, categoriesIDs);
    return valid;
  }
</script>
<section class="my-1 container" in:fade={{ duration: 500 }}>
  <!--* Section Label --------------------->
  <TitleLabel text="Update Book" />
  <!--* Section Content (2col if large) ---------->
  <form on:submit|preventDefault={submit}>
  <div class="row justify-content-center">
    <!--* Grouped Form ---------------------------->
    <div class="col-sm-12 col-lg-6">
      <Row label="Book Title:" id="book-name">
        <input
          bind:value={titleValue}
          class="form-control"
          type="text"
          id="book-name"
          autocomplete="off"
          required
        />
      </Row>
      <Row label="Book Description:" id="book-description">
        <textarea
          bind:value={descriptionValue}
          class="form-control"
          id="book-description"
          rows="6"
          autocomplete="off"
        ></textarea>
      </Row>
      <Row label="Book Cover:" id="book-cover">
        <input
          class="form-control"
          type="file"
          id="book-cover"
          accept="image/*"
          bind:files
          bind:this={fileInput}
        />
      </Row>
      {#if previewSrc}
      <div class="my-3 row">
        <label
          for="cover-preview"
          class="col-sm-4 col-md-3 col-form-label align-self-center"
        >
          Preview:
        </label>
        <div class="col-sm-8 col-md-9" id="preview-div">
          <img src={previewSrc} on:error={()=>previewSrc = ""} alt="Preview" id="cover-preview" height="150" />
          <button
            class="btn btn-sm btn-danger"
            on:click={() => {
              fileInput.value = "";
              files = "";
              previewSrc = ""
            }}>Remove</button
          >
        </div>
      </div>
      {/if}
    </div>
    <!--* Grouped Form ------------------------->
    <div class="col-sm-12 col-lg-6">
      <Row label="Category:" id="book-category">
        <input
          bind:value={categoryValue}
          list="categories"
          class="form-control {categoryClass}"
          type="text"
          id="book-category"
          autocomplete="off"
          required
            on:keyup={() => (categoryClass = "")}
        />
        <div class="form-text">
            Use comma to separate multiple categories. e.g(Science, Technology)
          </div>
          <div class="invalid-feedback">
            Category Not Found. Check format and spelling or <a
              target="_blank"
              href="./#/add-category"
              >add new category. <i class="bi bi-box-arrow-up-right" /></a
            >
          </div>
      </Row>
      <Row label="Author: " id="book-author">
        <input
          bind:value={authorValue}
          on:keyup={()=>authorClass = ""}
          list="authors"
          class="form-control {authorClass}"
          type="text"
          id="book-author"
          autocomplete="off"
          required
        />
        <div class="invalid-feedback">
          Author Not Found. Check spelling or <a
            target="_blank"
            href="./#/add-author"
            >add new author. <i class="bi bi-box-arrow-up-right" /></a
          >
        </div>
      </Row>
      <Row label="Publisher: " id="book-publisher">
        <input
          bind:value={publisherValue}
          on:keyup={()=>publisherClass = ""}
          list="publishers"
          class="form-control {publisherClass}"
          type="text"
          id="book-publisher"
          autocomplete="off"
          required
        />
        <div class="invalid-feedback">
          Publisher Not Found. Check spelling or <a
            target="_blank"
            href="./#/add-publisher"
            >add new publisher. <i class="bi bi-box-arrow-up-right" /></a
          >
        </div>
      </Row>
      <Row label="Shelf #: " id="book-shelf">
        <input
          bind:value={shelfValue}
          class="form-control"
          type="number"
          id="book-shelf"
          autocomplete="off"
          required
        />
      </Row>
      <Row label="ISBN: " id="book-isbn">
        <input
          bind:value={isbnValue}
          class="form-control"
          type="text"
          id="book-isbn"
          autocomplete="off"
          required
        />
      </Row>
    </div>
  </div>
  
  <!--* Form Actions ----------------------------------->
  <div class="my-3">
    <button class="btn btn-success" type="submit"
      ><i class="bi bi-arrow-clockwise"></i> Update Book</button
    >
      <button class="btn btn-danger" type="button" on:click={() => pop()}
        ><i class="bi bi-x-circle"></i> Cancel</button
      >
  </div>
  </form>
</section>