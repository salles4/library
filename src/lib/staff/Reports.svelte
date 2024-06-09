<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";

  //All transactions will be recorded here
</script>

<main class="container" in:fade={{duration:500}}>
  <TitleLabel text="Transaction Report" />
  <table class="table table=striped table-bordered text-center">
    <thead>
      <tr>
        <th>Student</th>
        <th>Staff</th>
        <th>Transaction</th>
        <th>Time</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Some Student Name</td>
        <td>Francis James Salles</td>
        <td>Borrowed</td>
        <td>06/09/2024/ 10:18am</td>
        <td>Name borrowed "Book title"</td>
      </tr>
    </tbody>
  </table>
</main>