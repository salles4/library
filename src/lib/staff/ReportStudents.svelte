<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";

  //Inventory of each student will be stored here
  const data = [
    {stud_id:218791, name:"Kaysha Dela Pena", reserved: 2, borrowed: 0},
    {stud_id:218791, name:"Rich James Lozano", reserved: 5, borrowed: 1},
    {stud_id:102378, name:"Aaryanah Gayo", reserved: 2, borrowed: 8},
    {stud_id:201919, name:"Knicole Bataclan", reserved: 0, borrowed: 5},
    {stud_id:201845, name:"Chloey Eusebio", reserved: 0, borrowed: 1},
    {stud_id:218581, name:"Tristan Aquino", reserved: 2, borrowed: 4},
    {stud_id:201919, name:"Kirsten Torrenueva", reserved: 0, borrowed: 7},
    {stud_id:201919, name:"Mark Anthony Gipit", reserved: 0, borrowed: 1},
    {stud_id:201919, name:"Raven Baldueza", reserved: 0, borrowed: 1},
    {stud_id:201919, name:"Henreizh Nathan Aruta", reserved: 5, borrowed: 1}
  ]
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
      {#each data as row}  
      <tr>
        <td>{row.stud_id}</td>
        <td>{row.name}</td>
        <td>{row.reserved}</td>
        <td>{row.borrowed}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</main>