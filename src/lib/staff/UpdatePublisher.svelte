<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import Row from "../forms/Row.svelte";
  import { supabase } from "../../supabase";
  import { pop, replace, querystring } from "svelte-spa-router"

  const queryParams = new URLSearchParams($querystring);
  const publisherID = queryParams.get("id")
  if(!publisherID) {
    replace("#/invalid-link")
  }else{
    getData();
  }

  let files;
  let fileInput;
  let previewClass = "d-none";
  let previewSrc = `https://oatzrwezibkcabfwxppo.supabase.co/storage/v1/object/public/publisher/${publisherID}.jpg`;

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
  async function getData(){
    const { data, error } = await supabase
      .from("publisher")
      .select("name, description, link")
      .eq("publisher_id", publisherID)
      .single()

    if(error){
      console.error(error);
      replace("#/invalid-link")
      return
    }
    nameValue = data.name
    descriptionValue = data.description;
    linkValue = data.link
  }
  async function addPublisher(){
    nameClass = !nameValue ? "is-invalid" : "";
    linkClass = !linkValue ? "is-invalid" : "";

    console.log(nameClass, linkClass);
    if(nameClass || linkClass) return;
    
    const {data, error} = await supabase
    .from("publisher")
    .update({name:nameValue, description:descriptionValue, link:linkValue})
    .eq("publisher_id", publisherID)
    .select("publisher_id")
    .single()
    if (error) {
      console.error(error);
      return;
    }
     if(files && files[0]){
      const {data:imageData, error:imageError} = await supabase.storage
      .from('publisher').upload(`${publisherID}.jpg`, files[0], {upsert:true})
      if(imageError) console.error(imageError);
    }else{
      if(previewSrc != ""){
        const {data:imageData, error:imageError} = await supabase.storage
        .from('publisher').remove([`${publisherID}.jpg`])
        if(imageError) console.error(imageError);
      }
    }
    // record into report
    const { error: reportError } = await supabase.from("reports").insert({
      report_type: "Update Publisher",
      report_details: `Updated ${nameValue}`,
      staff_id: localStorage.getItem("user_id"),
    });
    if (reportError) console.error(reportError);
    alert("Successfully Updated!")
    pop()
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
      {#if previewSrc}
        <div class="my-3 row">
          <label
            for="cover-preview"
            class="col-sm-4 col-md-3 col-form-label align-self-center"
          >
            Preview:
          </label>
          <div class="col-sm-8 col-md-9" id="preview-div">
            <img
              src={previewSrc}
              on:error={() => (previewSrc = "")}
              alt="Preview"
              id="cover-preview"
              height="150"
            />
            <button
              class="btn btn-sm btn-danger"
              on:click={() => {
                fileInput.value = "";
                files = "";
                previewSrc = "";
              }}>Remove</button
            >
          </div>
        </div>
      {/if}
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
