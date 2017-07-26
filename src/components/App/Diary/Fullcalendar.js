import React from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import juvo from 'juvo';

class Fullcalendar extends React.Component {
  componentDidMount() {
    const calendar = this.calendar;
    const { user, fetch, events, move } = this.props;
    const dateFormat = 'YYYY-MM-DD HH:mm';
    const lvcal = $(calendar);
    lvcal.fullCalendar({
      events,
      firstDay: (user && user.diaryStart) || 0,
      height: 'auto',
      header: {
        left: '',
        center: '',
        // left: 'prev,next today',
        // center: 'title',
        right: 'title prev,next today month,agendaWeek,agendaDay'
      },
      defaultDate: this.props.defaultDate || moment().format(),
      slotDuration: '00:15:00',
      snapDuration: '00:05:00',
      defaultView: localStorage.getItem('calendarView') || 'agendaWeek',
      minTime: '08:00:00',
      maxTime: '20:00:00',
      allDaySlot: false,
      editable: true,
      droppable: true,
      timezone: 'local',
      viewRender: (view) => {
        console.log(view);
        const req = {
          start_date: view.start.format(dateFormat),
          end_date: view.end.format(dateFormat),
        };
        fetch(req, view.type);
      },
      eventResize: (event) => {
        move({
          id: event.id,
          start_date: event.start.format(dateFormat),
          end_date: event.end.format(dateFormat),
        });
      },
      eventDrop: (event) => {
        move({
          id: event.id,
          start_date: event.start.format(dateFormat),
          end_date: event.end.format(dateFormat),
        });
      },
      eventClick: (event) => {
        console.log('Click on appointment');
        browserHistory.push(juvo.diary.infoLink(event.id));
        // select(event.id);
      },
      // eslint-disable-next-line
      // drop: function (date) {
      //   const $this = $(this);
      //   const clonedEvent = $.extend({}, $this.data('event'));
      //   if (date.format('HH:mm') === '00:00') {
      //     date.set({
      //       hour: 12,
      //       minute: 0,
      //       second: 0
      //     });
      //   }
      //   const dateEndTemp = date.clone();
      //   const defaultDuration = moment.duration(lvcal.fullCalendar('option', 'defaultTimedEventDuration'));
      //   const dateEnd = dateEndTemp.add(defaultDuration);
      //   clonedEvent.start = date;
      //   clonedEvent.end = dateEnd;
      //   clonedEvent.allDay = false;
      //   clonedEvent.backgroundColor = $this.css('background-color');
      //   clonedEvent.borderColor = $this.css('border-color');
      //   const newAppointment = {
      //     category_id: $this.attr('id'),
      //     start_date: date.format('YYYY-MM-DD HH:mm'),
      //     end_date: dateEnd.format('YYYY-MM-DD HH:mm'),
      //     title: clonedEvent.title,
      //   };
      //   add(newAppointment);
      //   if ($('#drop-remove').is(':checked')) {
      //     $(this).remove();
      //   }
      // },
    });
  }
  componentWillReceiveProps(props) {
    if (props.events) {
      const calendar = this.calendar;
      const lvcal = $(calendar);
      lvcal.fullCalendar('removeEvents');
      lvcal.fullCalendar('addEventSource', props.events);
      lvcal.fullCalendar('refetchEventSources', props.events);
      lvcal.fullCalendar('render');
    }
  }
  componentWillUnmount() {
    const calendar = this.calendar;
    $(calendar).fullCalendar('destroy');
  }
  render() {
    return (<div ref={(c) => { this.calendar = c; }} />);
  }
}

Fullcalendar.propTypes = {
  user: React.PropTypes.object,
  fetch: React.PropTypes.func.isRequired,
  // add: React.PropTypes.func.isRequired,
  move: React.PropTypes.func.isRequired,
  // select: React.PropTypes.func.isRequired,
  events: React.PropTypes.array,
};

export default Fullcalendar;
