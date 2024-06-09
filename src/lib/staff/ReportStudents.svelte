<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";

  //Inventory of each student will be stored here
</script>

<main class="container" in:fade={{duration:500}}>
  <TitleLabel text="Student Inventory Report" />
  <table class="table table=striped table-bordered text-center">
    <thead>
      <tr>
        <th>Student ID</th>
        <th>Student Name</th>
        <th>Reserved</th>
        <th>Borrowed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>263690</td>
        <td>Francis James Salles</td>
        <td>2</td>
        <td>4</td>
      </tr>
    </tbody>
  </table>
</main>