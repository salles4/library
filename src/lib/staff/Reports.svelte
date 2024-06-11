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
        <th>Time</th>
        <th>Staff</th>
        <th>Student</th>
        <th>Transaction</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>06/09/2024/ 10:18am</td>
        <td>Francis James Salles</td>
        <td>Some Student Name</td>
        <td>Borrowed</td>
        <td>Name borrowed "Book title"</td>
      </tr>
    </tbody>
  </table>
</main>