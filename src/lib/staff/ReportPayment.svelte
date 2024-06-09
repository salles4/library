<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";

  let totalAmount = 200;
  let totalLate = 27;
  let avgLate = 10;

  
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Payments Report" />
  <div class="d-flex justify-content-center gap-5 my-3">
    <div>
      <div>Overall Total Payment</div>
      <h1>₱{totalAmount}</h1>
    </div>
    <div>
      <div>Total Late Returns</div>
      <h1>{totalLate}</h1>
    </div>
  </div>

  <table class="table table-bordered table-striped text-center">
    <thead>
      <tr>
        <th class="col-3">Reference No.</th>
        <th>Student Name</th>
        <th class="col-2">Amount</th>
        <th class="col-2">Days Late</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>091238120</td>
        <td>Francis James E. Salles</td>
        <td>200</td>
        <td>4</td>
      </tr>
    </tbody>
  </table>
</main>
