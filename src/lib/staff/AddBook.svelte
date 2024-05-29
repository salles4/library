<script>
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { fade } from "svelte/transition";

  let files;
  let fileInput;
  let previewClass = "d-none";
  let previewSrc;
  //   function previewChange(){
  //     if(files.length === 0){
  //       previewClass = "d-none"
  //       return;
  //     }
  //     console.log(files);
  //     previewClass = ""
  //     const img = URL.createObjectURL(files[0])
  //     previewSrc = img;
  //}
  $: if (files && files[0]) {
    console.log(files);
    previewClass = "";
    const img = URL.createObjectURL(files[0]);
    previewSrc = img;
  } else {
    console.log(files);
    previewClass = "d-none";
  }
</script>

<!--! Main Section ---------------------------->
<section class="my-1 container" in:fade={{ duration: 500 }}>
  
    <!--* Section Label --------------------->
    <TitleLabel text="Add Book" />
    <!--* Section Content (2col if large) ---------->
    <div class="row justify-content-center">
      <!--* Grouped Form ---------------------------->
      <div class="col-sm-12 col-lg-6">
        <Row label="Book Title:" id="book-name">
          <input class="form-control" type="text" id="book-name" />
        </Row>
        <Row label="Book Description:" id="book-description">
          <textarea class="form-control" id="book-description" rows="4"
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
          <input class="form-control" type="text" id="book-category" />
        </Row>
        <Row label="Author: " id="book-author">
          <input
            list="authors"
            class="form-control"
            type="text"
            id="book-author"
          />
        </Row>
        <Row label="Publisher: " id="book-publisher">
          <input
            list="publishers"
            class="form-control"
            type="text"
            id="book-publisher"
          />
        </Row>
        <Row label="Category: " id="book-category">
          <input class="form-control" type="text" id="book-isbn" />
        </Row>
      </div>
    </div>
  
  <!--* Form Actions ----------------------------------->
  <div class="my-3">
    <button class="btn btn-success" disabled id="add"
      ><i class="bi bi-plus-circle"></i> Add Book</button
    >
    <a href="./#/">
      <button class="btn btn-danger" id="cancel"
        ><i class="bi bi-x-circle"></i> Cancel</button
      >
    </a>
  </div>
  <!--* Datalists (Invisible) ---------------------->
  <datalist id="authors">
    <option value="Jemma Development Group"> </option><option
      value="Richard Osman"
    >
    </option></datalist
  >
  <datalist id="publishers"> <option value="Jemma Inc."> </option></datalist>
</section>
