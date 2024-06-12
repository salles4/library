<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";
  import { onMount } from "svelte";

  let totalAmount = 200;
  let totalLate = 10;
  let avgLate = 10;

  let paymentList;
  let paymentReport
  async function getPayments(){
    const {data, error} = await supabase.rpc("getpayments")
    if (error) console.error(error);
    paymentList = data

    const {data:pReport, error:pError} = await supabase.rpc("paymentreport").single()
    if (pError) console.error(pError);
    paymentReport = pReport
  }
  onMount(getPayments)
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Payments Report" print={true}/>
  <div class="d-flex justify-content-center gap-5 my-3">
    {#if paymentReport}
    <div>
      <div>Overall Total Payment</div>
      <h1>₱{paymentReport.total}</h1>
    </div>
    <div>
      <div>Total Late Returns</div>
      <h1>{paymentReport.count}</h1>
    </div>
    <div>
      <div>Average Payment</div>
      <h1>{paymentReport.average}</h1>
    </div>
    <div>
      <div>Highest Payment</div>
      <h1>{paymentReport.highest}</h1>
    </div>
    {/if}
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
      {#if paymentList}
      {#each paymentList as row}
      <tr>
        <td>{row.ref_num}</td>
        <td>{row.fname} {row.lname}</td>
        <td>₱{row.amount}</td>
        <td>{row.amount / 50}</td>
      </tr>
      {/each}
      {/if}
    </tbody>
  </table>
</main>
