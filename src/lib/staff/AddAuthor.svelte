<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { supabase } from "../../supabase";

  let files;
  let fileInput;
  let previewClass = "d-none";
  let previewSrc;

  $: if (files && files[0]) {
    console.log(files);
    previewClass = "";
    const img = URL.createObjectURL(files[0]);
    previewSrc = img;
  } else {
    previewClass = "d-none";
  }

  let nameValue;
  let bioValue = "";
  let linkValue;

  let nameClass;
  let bioClass
  let linkClass;
  async function addAuthor(){
    nameClass = !nameValue ? "is-invalid" : "";
    linkClass = !linkValue ? "is-invalid" : "";

    console.log(nameClass, bioClass, linkClass);
    if(nameClass || bioClass || linkClass) return;

    const {error} = await supabase
    .from("author")
    .insert({name:nameValue, bio:bioValue, link:linkValue})
    if(error) {
      console.error(error);
      return
    }

    // record into report
    const {error:reportError} = await supabase
    .from("reports")
    .insert({
      report_type:"Add Author",
      report_details:`Added ${nameValue}`,
      staff_id: localStorage.getItem("user_id"),
    })
    if(reportError) console.error(reportError);
  }

</script>

<section class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Add Author" />
  <div class="justify-content-around row">
    <div class="col-sm-12 col-lg-6">
      <Row label="Author Name:" id="author-name">
        <input class="form-control {nameClass}" type="text" id="author-name" bind:value={nameValue} on:keyup={() => nameClass = ""}/>
        <div class="invalid-feedback">Author Name is Required</div>
      </Row>
      <Row label="Author Bio:" id="author-bio">
        <textarea class="form-control {bioClass}" id="author-bio" rows="4" bind:value={bioValue} on:keyup={() => bioClass = ""}/>
      </Row>
      <Row label="Author Link:" id="author-link">
        <input type="text" id="author-link" class="form-control {linkClass}" bind:value={linkValue} on:keyup={() => linkClass = ""}/>
        <div class="invalid-feedback">Author Link is Required</div>
      </Row>
      <Row label="Picture:" id="author-pic">
        <input
          class="form-control"
          type="file"
          id="author-pic"
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
          <img src={previewSrc} alt="Preview" id="cover-preview" height="150" />
          <button
            class="btn btn-sm btn-danger"
            on:click={() => {
              fileInput.value = "";
              files = "";
            }}>Remove</button
          >
        </div>
      </div>
      <div class="float-end">
        <button class="btn btn-success" on:click={addAuthor}
          ><i class="bi bi-plus-circle" /> Add Author</button
        >
        <a href="./#/"><button class="btn btn-danger"
          ><i class="bi bi-x-circle" /> Cancel</button
        ></a>
      </div>
    </div>
  </div>
</section>
