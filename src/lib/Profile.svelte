<script>
  import { fade } from "svelte/transition";


  const accType = localStorage.getItem("accType");
</script>

<main class="container" in:fade={{duration: 500}}>
  <div id="cont">
    <div id="left">
        <table>
            <tr>
                <td class="info">Student ID:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">First Name:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">Last Name:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">Email:</td>
                <td class="input">asd</td>
            </tr>
        </table>
    </div>

    <div id="right">
        <table>
            <tr>
                <td class="info">Contact:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">Address:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">Year Level:</td>
                <td class="input">asd</td>
            </tr>
            <tr>
                <td class="info">Course:</td>
                <td class="input">asd</td>
            </tr>
        </table>
    </div>
  </div>

  <div class="container1">

  </div>
</main>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}
body{
    background-color: black;
    width: 100%;
    
}
#cont{
    display: inline-flex;
    justify-content: space-evenly;
    width: 100%;
    height: 200px;
    margin-top: 5%;
    margin-left: 5%;
}
#left{
    background-color: white;
    width: 42.5%;
    height: 100%;
}
#right{
    background-color: white;
    width: 42.5%;
    height: 100%;
} 
table{
    width: 100%;
    height: 100%;
}
table tr .info{
    text-align: right;
    width: 150px;
    font-weight: bold;
}
table tr .input{
    padding-left: 10px;
}

.container1{
    width: 100%;
    height: 400px;
    margin-top: 30px;
}
</style>
