<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";

  let totalAmount = 200;
  let totalLate = 10;
  let avgLate = 10;

  const data = [
    {ref:"09124812", name:"Kaysha Dela Pena", daysLate:3},
    {ref:"235789321", name:"Rich James Lozano", daysLate:2},
    {ref:"902345789", name:"Aaryanah Gayo", daysLate:1},
    {ref:"237892431", name:"Knicole Bataclan", daysLate:2},
    {ref:"2356789235", name:"Chloey Eusebio", daysLate:5},
    {ref:"234578923", name:"Tristan Aquino", daysLate:7},
    {ref:"291716781", name:"Kirsten Torrenueva", daysLate:2},
    {ref:"192782712", name:"Mark Anthony Gipit", daysLate:1},
    {ref:"214789234", name:"Raven Baldueza", daysLate:6},
    {ref:"123478623", name:"Henreizh Nathan Aruta", daysLate:2}
  ]
  data.forEach(row=> totalAmount += row.daysLate * 50)
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
      {#each data as row}
      <tr>
        <td>{row.ref}</td>
        <td>{row.name}</td>
        <td>₱{row.daysLate * 50}</td>
        <td>{row.daysLate}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</main>
