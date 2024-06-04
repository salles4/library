import { writable } from 'svelte/store';

export const accType = writable(localStorage.getItem("accType" || ""));
export const user_id = writable(localStorage.getItem("user_id" || ""));

window.addEventListener('storage', function (event) {
  let previousValue;
  user_id.subscribe((val) => previousValue = val)
  if (localStorage.getItem("user_id") != previousValue){
    if (localStorage.getItem("user_id") == ""){
      accType.set("")
      user_id.set("")
    }else{
      user_id.set(localStorage.getItem("user_id" || ""))
      accType.set(localStorage.getItem("accType" || ""))
    }
  }
});