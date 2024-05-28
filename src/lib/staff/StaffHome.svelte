<script>
  import { fade } from "svelte/transition";
    import SectionLabel from "../components/SectionLabel.svelte";
    import FunctionItem from "../item/FunctionItem.svelte";


</script>

<main class="container" in:fade={{ duration: 500 }}>
    <SectionLabel title="Welcome!" icon="wrench-adjustable" />
    <div class="row">
        <FunctionItem name="Borrow" link="borrow" icon="journal-arrow-up" />
        <FunctionItem name="Return" link="return" icon="journal-arrow-down" />
        <FunctionItem name="Add Book" link="add-book" icon="journal-plus" />
        <FunctionItem name="Manage" link="manage" icon="journal-album" />
    </div>
</main>