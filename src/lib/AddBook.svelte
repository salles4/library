<script>
  import TitleLabel from "./components/TitleLabel.svelte";
  import Row from "./forms/Row.svelte";
  import { fade } from "svelte/transition";
</script>

<!--! Main Section ---------------------------->
<section class="my-1 container px-5" in:fade="{{duration: 500}}">
  <div class="container-fluid ">
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
          />
        </Row>
        <div class="form-row d-none" id="preview-row">
          <label for="cover-preview" class="form-label align-self-center"
            >Preview:
          </label>
          <div class="form-input" id="preview-div">
            <img src="" alt="Preview" id="cover-preview" height="150" />
            <button class="btn btn-sm btn-danger">Remove</button>
          </div>
        </div>
      </div>
      <!--* Grouped Form ------------------------->
      <div class="col-sm-12 col-lg-6">
        <Row label="Category: " id="book-category">
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
  </div>
  <!--* Form Actions ----------------------------------->
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
  <!--* Datalists (Invisible) ---------------------->
  <datalist id="authors">
    <option value="Jemma Development Group"> </option><option
      value="Richard Osman"
    >
    </option></datalist
  >
  <datalist id="publishers"> <option value="Jemma Inc."> </option></datalist>
</section>
