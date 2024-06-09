<script>
  import { fade } from "svelte/transition";
  import SectionLabel from "../components/SectionLabel.svelte";
  import FunctionItem from "../item/FunctionItem.svelte";
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <SectionLabel title="Welcome!" icon="wrench-adjustable">
    <div class="row justify-content-center gap-4">
      <FunctionItem name="Borrow" link="borrow" icon="journal-arrow-up" />
      <FunctionItem name="Return" link="return" icon="journal-arrow-down" />
    </div>
  </SectionLabel>
  <SectionLabel title="Add Data" icon="plus-circle">
    <div class="row justify-content-center gap-5">
      <FunctionItem name="Add Book" link="add-book" icon="journal-plus" />
      <FunctionItem name="Add Author" link="add-author" icon="person-fill-add" />
      <FunctionItem
        name="Add Publisher"
        link="add-publisher"
        icon="building-add"
      />
      <FunctionItem name="Manage Categories" link="" icon="collection" />
    </div>
  </SectionLabel>
  <SectionLabel title="Reports" icon="receipt">
    <div class="row justify-content-center gap-5 mb-5">
      <FunctionItem name="Books Report" link="book-report" icon="journals" />
      <FunctionItem name="Students Report" link="student-report" icon="person-fill" />
      <FunctionItem name="Payments Report" link="payment-report" icon="cash" />
      <FunctionItem name="Transactions Report" link="reports" icon="arrow-left-right" />
    </div>
  </SectionLabel>
</main>
