document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      height: '100%',
      events: 'https://fullcalendar.io/api/demo-feeds/events.json',
      themeSystem: 'bootstrap5',
      selectable: true,
      selectHelper: true,
      select: function(start, end, allDay) {
        $('#myModal').modal('toggle')
      },
    eventClick: function(info) {
        var eventObj = info.event;
  
        if (eventObj.url) {
          alert(
            'Clicked ' + eventObj.title + '.\n' +
            'Will open ' + eventObj.url + ' in a new tab'
          );
  
          window.open(eventObj.url);
  
          info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
        } else {
          alert('Clicked ' + eventObj.title);
        }
      },

    });
  
    calendar.render();
  });