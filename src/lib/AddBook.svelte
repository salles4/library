<script>
  // $(".form-group").addClass(`col-sm-12 col-lg-6`)
  //   $(".form-row").addClass("my-3 row")
  //   $(".form-label").addClass("col-sm-4 col-md-3 col-form-label")
  //   $(".form-input").addClass("col-sm-8 col-md-9")

import Input from "./forms/Input.svelte";
import Label from "./forms/Label.svelte";
import Row from "./forms/Row.svelte";

  
</script>

<!--! Main Section ------------------------------------------------->
<section class="my-1 container px-5">
  <div class="container-fluid py-3">
    <!--* Section Label ------------------------------------------------->
    <div
      id="title"
      class="border-bottom border-2 border-black d-flex justify-content-between"
    >
      <legend><i class="bi bi-journal-plus"></i> Add Book</legend>
    </div>
    <!--* Section Content (2col if large) ------------------------------------------------->
    <div class="row justify-content-center">
      <!--* Grouped Form ------------------------------------------------->
      <div class="form-group">
        <Row >
          <Label>Book Title</Label>
          <Input>
            <input class="form-control" type="text" id="book-name" />
          </Input>
        </Row>
        <div class="form-row">
          <label class="form-label" for="book-description"
            >Book Description:
          </label>
          <div class="form-input">
            <textarea class="form-control" id="book-description" rows="4"
            ></textarea>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label" for="book-isbn">Book Cover: </label>
          <div class="form-input">
            <input
              class="form-control"
              type="file"
              id="book-cover"
              accept="image/*"
            />
          </div>
        </div>
        <div class="form-row d-none" id="preview-row">
          <label for="cover-preview" class="form-label align-self-center"
            >Preview:
          </label>
          <div class="form-input" id="preview-div">
            <img src="" alt="Preview" id="cover-preview" height="150">
            <button class="btn btn-sm btn-danger">Remove</button>
          </div>
        </div>
      </div>
      <!--* Grouped Form ------------------------------------------------->
      <div class="form-group">
        <div class="form-row">
          <label class="form-label" for="book-category">Category: </label>
          <div class="form-input">
            <input class="form-control" type="text" id="book-category" />
          </div>
        </div>
        <div class="form-row">
          <label class="form-label" for="book-author">Author: </label>
          <div class="form-input">
            <input
              list="authors"
              class="form-control"
              type="text"
              id="book-author"
            />
          </div>
        </div>
        <div class="form-row">
          <label class="form-label" for="book-publisher">Publisher: </label>
          <div class="form-input">
            <input
              list="publishers"
              class="form-control"
              type="text"
              id="book-publisher"
            />
          </div>
        </div>
        <div class="form-row">
          <label class="form-label" for="book-isbn">ISBN: </label>
          <div class="form-input">
            <input class="form-control" type="text" id="book-isbn" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--* Form Actions ------------------------------------------------->
  <div class="my-3">
    <button class="btn btn-success" disabled id="add"
      ><i class="bi bi-plus-circle"></i> Add Book</button
    >
    <a href="index.html">
      <button class="btn btn-danger" id="cancel"
        ><i class="bi bi-x-circle"></i> Cancel</button
      >
    </a>
  </div>
  <!--* Datalists (Invisible) ------------------------------------------------->
  <datalist id="authors">
    <option value="Jemma Development Group"> </option><option
      value="Richard Osman"
    >
    </option></datalist
  >
  <datalist id="publishers"> <option value="Jemma Inc."> </option></datalist>
</section>
