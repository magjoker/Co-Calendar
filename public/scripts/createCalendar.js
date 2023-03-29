

const renderCalendars = async () => {
const calendar_code = document.querySelector('#code_id').value.trim();
var goToCal;

  if (calendar_code) {
    console.log(calendar_code)
    fetch(`/api/calendar/${calendar_code}`)
    .then((response) => response.json())
    .then(data => {window.location.replace(`/calendar/${data[0].id}`)})
  }

}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const calendarCreator = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#name_id').value.trim();
    const code = makeid(5);
    if (title && code) {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        body: JSON.stringify({ title, code }),
        headers: { 'Content-Type': 'application/json' },
      })
   
    if (response.ok) {
      alert(`Your calendar code is ${code}`)
      } else {
        alert(response.statusText);
      }
  } 
}

const gotToCalendar = async = (event) => {
  
}


  
  document
  .querySelector('#submit')
  .addEventListener('click', calendarCreator)
  
  document
  .querySelector("#goToCal")
  .addEventListener('click',  renderCalendars)
