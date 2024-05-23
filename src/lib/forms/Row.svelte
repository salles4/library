<script>
  /**Label for the input*/
  export let label;
  /**ID of the input element*/
  export let id;

</script>
<!-- 
  @component
  Creates a row of label and input element with responsive design.
  - Use inside a form-group class and 
  - Contain any input tag (textarea, select)

  - Usage:
  ```tsx
  <div class="col-sm-12 col-lg-6">
    <Row label="Form ID" id="FormID">
      <input class="form-control" id="FormID" />
    </Row>
  </div>
  ```
 -->
<div class="my-3 row">
  <label class="col-sm-4 col-md-3 col-form-label" for={id} >{label}</label>
  <div class="col-sm-8 col-md-9">
    <slot />
  </div>
</div>