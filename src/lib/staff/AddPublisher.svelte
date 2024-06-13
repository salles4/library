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
  let descriptionValue;
  let linkValue;

  let nameClass;
  let descriptionClass
  let linkClass;
  async function addPublisher(){
    nameClass = !nameValue ? "is-invalid" : "";
    linkClass = !linkValue ? "is-invalid" : "";

    console.log(nameClass, descriptionClass, linkClass);
    if(nameClass || descriptionClass || linkClass) return;
    
    const {data, error} = await supabase
    .from("publisher")
    .insert({name:nameValue, description:descriptionValue, link:linkValue})
    .select("publisher_id")
    .single()

     if (files && files[0]) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("puublisher")
        .upload(`${data.publisher_id}.jpg`, files[0]);
      if (imageError) console.error(imageError);
    }
  }

</script>

<section class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Add Publisher" />
  <div class="justify-content-around row">
    <div class="col-sm-12 col-lg-6">
      <Row label="Publisher Name:" id="publisher-name">
        <input class="form-control {nameClass}" type="text" id="publisher-name" bind:value={nameValue} on:keyup={() => nameClass = ""}/>
      </Row>
      <Row label="Publisher Description:" id="publisher-description">
        <textarea class="form-control {descriptionClass}" id="publisher-description" rows="4" bind:value={descriptionValue} on:keyup={() => descriptionClass = ""}/>
      </Row>
      <Row label="Publisher Link:" id="publisher-link">
        <input type="text" id="publisher-link" class="form-control {linkClass}" bind:value={linkValue} on:keyup={() => linkClass = ""}/>
      </Row>
      <Row label="Picture:" id="publisher-pic">
        <input
          class="form-control"
          type="file"
          id="publisher-pic"
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
        <button class="btn btn-success" on:click={addPublisher}
          ><i class="bi bi-plus-circle" /> Add Publisher</button
        >
        <a href="./#/"><button class="btn btn-danger"
          ><i class="bi bi-x-circle" /> Cancel</button
        ></a>
      </div>
    </div>
  </div>
</section>
