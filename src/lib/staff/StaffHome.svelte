<script>
  import { fade } from "svelte/transition";
  import SectionLabel from "../components/SectionLabel.svelte";
  import FunctionItem from "../item/FunctionItem.svelte";
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <SectionLabel title="Welcome!" icon="wrench-adjustable">
    <div class="row justify-content-center gap-2">
      <FunctionItem name="Borrow" link="borrow" icon="journal-arrow-up" />
      <FunctionItem name="Return" link="return" icon="journal-arrow-down" />
    </div>
  </SectionLabel>
  <SectionLabel title="Add Data" icon="plus-circle">
    <div class="row justify-content-center gap-4">
      <FunctionItem name="Add Book" link="add-book" icon="journal-plus" />
      <FunctionItem name="Add Author" link="add-author" icon="journal-plus" />
      <FunctionItem
        name="Add Publisher"
        link="add-publisher"
        icon="journal-plus"
      />
    </div>
  </SectionLabel>
</main>
