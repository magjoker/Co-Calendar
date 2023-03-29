var start_time;
var end_time;
const calID = document.querySelector('#calendar-container');
const calendar_id = calID.dataset.id;
var eventList;

document.addEventListener('DOMContentLoaded', function(data) {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      height: '100%',
      events: function(info, successCallback, failureCallback) {
        fetch(`/api/events/calendar_id/${calendar_id}`)
        .then((response) => response.json())
        .then(data => {eventList = data})
        .then(() => {
          successCallback(
               eventList
              )
        });
      
        },
      themeSystem: 'bootstrap5',
      selectable: true,
      selectHelper: true,
      select: function(start, end, allDay) {
       
        start_time = start.startStr;
        end_time = start.endStr; 
        
        console.log(start_time);
        console.log(end_time)
        $('#myModal').modal('toggle')
      },
    });
    
    calendar.render();
  })



const eventSetter = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#name_id').value.trim();
  let start = start_time;
  let end = end_time;

  console.log(title)
  console.log(start_time)
  console.log(end_time)
  console.log(calendar_id)

  if (title && start && end && calendar_id) {
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({ title, start, end, calendar_id }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      location.reload()
    } else {
      alert(response.statusText)
    }
  }
}

document
.querySelector('#submit')
.addEventListener('click', eventSetter)
