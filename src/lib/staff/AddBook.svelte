<script>
  import { supabase } from "../../supabase";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { fade } from "svelte/transition";

  let files;
  let fileInput;
  let previewClass = "d-none";
  let previewSrc;

  $: if (files && files[0]) {
    previewClass = "";
    const img = URL.createObjectURL(files[0]);
    previewSrc = img;
  } else {
    previewClass = "d-none";
  }

  let titleValue;
  let descriptionValue;
  let categoryValue = "";
  let authorValue;
  let publisherValue;
  let shelfValue;
  let isbnValue;
  let categoriesIDs = [];

  let categoryClass;
  let authorClass;
  let publisherClass;
  async function submit() {
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

    // const { data: categoryID, error: categoryError } = await supabase
    //   .from("category")
    //   .select("category_id")
    //   .eq("name", categoryValue)
    //   .single();
    let complete = true;
    if (authorError || !authorID) {
      authorClass = "is-invalid";
      complete = false;
    }
    if (publisherError || !publisherID) {
      publisherClass = "is-invalid";
      complete = false;
    }
    if (!(await validateCategories())) {
      if (categoriesIDs.length != 0) return;
      categoryClass = "is-invalid";
      complete = false;
    }
    if (!complete) {
      return;
    }
    const { data, error } = await supabase
      .from("books")
      .insert({
        title: titleValue,
        description: descriptionValue,
        author_id: authorID.author_id,
        publisher_id: publisherID.publisher_id,
        shelf_number: shelfValue,
        isbn: isbnValue,
      })
      .select("book_id")
      .single();
    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }
    let categoryPushed = true
    for (const categoryID in categoriesIDs){
      const {data:categoryData, error:categoryError} = await supabase
      .from("books_category")
      .insert({book_id:data.book_id, category_id:categoriesIDs[categoryID]})
      if(categoryError) {
        console.error(categoryError);
        categoryPushed = false
      }
    }
    alert(`Successfully Added ${titleValue}!`);
    if(!categoryPushed) alert("Had problem while adding categories, Update book later")
    
    if (files && files[0]) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("books")
        .upload(`${data.book_id}.jpg`, files[0]);
      if (imageError) console.error(imageError);
    }
  }
  async function validateCategories() {
    if (categoryValue == "") {
      return false;
    }

    let valid = true;
    let validCategoryID = [];

    let categoriesArray = categoryValue.split(",").map((item) => item.trim());
    for (const category of categoriesArray) {
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

  // for autocomplete
  async function getAuthors() {
    const { data, error } = await supabase
      .from("author")
      .select("name")
      .order("name", { ascending: true });
    return data;
  }
  async function getPublishers() {
    const { data, error } = await supabase
      .from("publisher")
      .select("name")
      .order("name", { ascending: true });
    return data;
  }
  async function getCategories() {
    const { data, error } = await supabase
      .from("category")
      .select("name")
      .neq("name", "Uncategorized")
      .order("name", { ascending: true });
    return data;
  }
</script>

<!--! Main Section ---------------------------->
<section class="my-1 container" in:fade={{ duration: 500 }}>
  <!--* Section Label --------------------->
  <TitleLabel text="Add Book" />
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
            required
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
        <div class="my-3 row {previewClass}">
          <label
            for="cover-preview"
            class="col-sm-4 col-md-3 col-form-label align-self-center"
          >
            Preview:
          </label>
          <div class="col-sm-8 col-md-9" id="preview-div">
            <img
              src={previewSrc}
              alt="Preview"
              id="cover-preview"
              height="150"
            />
            <button
              class="btn btn-sm btn-danger"
              on:click={() => {
                fileInput.value = "";
                files = "";
              }}>Remove</button
            >
          </div>
        </div>
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
            list="authors"
            class="form-control {authorClass}"
            type="text"
            id="book-author"
            autocomplete="off"
            required
            on:keyup={() => (authorClass = "")}
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
            list="publishers"
            class="form-control {publisherClass}"
            type="text"
            id="book-publisher"
            autocomplete="off"
            required
            on:keyup={() => (publisherClass = "")}
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
            min="0"
            max="6"
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
        ><i class="bi bi-plus-circle"></i> Add Book</button
      >
      <button
        class="btn btn-secondary"
        type="reset"
        on:click={() => {
          fileInput.value = "";
          files = "";
        }}><i class="bi bi-plus-circle"></i> Reset</button
      >
      <a href="./#/">
        <button class="btn btn-danger" type="button"
          ><i class="bi bi-x-circle"></i> Cancel</button
        >
      </a>
    </div>
  </form>
  {#await getAuthors() then authors}
    <datalist id="authors">
      {#each Object.entries(authors) as [i, author]}
        <option value={author.name} />
      {/each}
    </datalist>
  {/await}
  {#await getPublishers() then publishers}
    <datalist id="publishers">
      {#each Object.entries(publishers) as [i, publisher]}
        <option value={publisher.name} />
      {/each}
    </datalist>
  {/await}
  {#await getCategories() then categories}
    <datalist id="categories">
      {#each Object.entries(categories) as [i, category]}
        <option value={category.name} />
      {/each}
    </datalist>
  {/await}
</section>
