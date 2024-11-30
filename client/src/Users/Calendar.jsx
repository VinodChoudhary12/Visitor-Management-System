import { useState, useEffect } from 'react';

const Calendar = () => {
    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const themes = [
        { value: 'blue', label: 'Blue Theme' },
        { value: 'red', label: 'Red Theme' },
        { value: 'yellow', label: 'Yellow Theme' },
        { value: 'green', label: 'Green Theme' },
        { value: 'purple', label: 'Purple Theme' },
    ];

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [noOfDays, setNoOfDays] = useState([]);
    const [blankDays, setBlankDays] = useState([]);
    const [events, setEvents] = useState([
        {
            event_date: new Date(2020, 3, 1),
            event_title: "April Fool's Day",
            event_theme: 'blue',
        },
        {
            event_date: new Date(2020, 3, 10),
            event_title: 'Birthday',
            event_theme: 'red',
        },
        {
            event_date: new Date(2020, 3, 16),
            event_title: 'Upcoming Event',
            event_theme: 'green',
        }
    ]);

    const [openEventModal, setOpenEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTheme, setEventTheme] = useState('blue');

    useEffect(() => {
        getNoOfDays();
    }, [month, year]);

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);
        return today.toDateString() === d.toDateString();
    };

    const getNoOfDays = () => {
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let dayOfWeek = new Date(year, month).getDay();
        let blankdaysArray = Array(dayOfWeek).fill(null);

        let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        setBlankDays(blankdaysArray);
        setNoOfDays(daysArray);
    };

    const showEventModal = (date) => {
        setOpenEventModal(true);
        setEventDate(new Date(year, month, date).toDateString());
    };

    const addEvent = () => {
        if (eventTitle === '') {
            return;
        }

        const newEvent = {
            event_date: eventDate,
            event_title: eventTitle,
            event_theme: eventTheme,
        };

        setEvents([...events, newEvent]);
        setEventTitle('');
        setEventDate('');
        setEventTheme('blue');
        setOpenEventModal(false);
    };

    return (
        <div className="antialiased sans-serif bg-gray-100 h-screen">
            <div className="container mx-auto px-4 py-2 md:py-24">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex items-center justify-between py-2 px-6">
                        <div>
                            <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                            <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
                        </div>
                        <div className="border rounded-lg px-1" style={{ paddingTop: '2px' }}>
                            <button
                                type="button"
                                className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
                                disabled={month === 0}
                                onClick={() => {
                                    setMonth(month - 1);
                                }}
                            >
                                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="border-r inline-flex h-6"></div>
                            <button
                                type="button"
                                className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
                                disabled={month === 11}
                                onClick={() => {
                                    setMonth(month + 1);
                                }}
                            >
                                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="-mx-1 -mb-1">
                        <div className="flex flex-wrap" style={{ marginBottom: '-40px' }}>
                            {DAYS.map((day, index) => (
                                <div key={index} style={{ width: '14.26%' }} className="px-2 py-2">
                                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{day}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap border-t border-l">
                            {blankDays.map((_, index) => (
                                <div key={index} style={{ width: '14.28%', height: '120px' }} className="text-center border-r border-b px-4 pt-2"></div>
                            ))}
                            {noOfDays.map((date, dateIndex) => (
                                <div key={dateIndex} style={{ width: '14.28%', height: '120px' }} className="px-4 pt-2 border-r border-b relative">
                                    <div
                                        onClick={() => showEventModal(date)}
                                        className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
                                            }`}
                                    >
                                        {date}
                                    </div>
                                    <div style={{ height: '80px' }} className="overflow-y-auto mt-1">
                                        {events
                                            .filter(
                                                (event) => new Date(event.event_date).toDateString() === new Date(year, month, date).toDateString()
                                            )
                                            .map((event, index) => (
                                                <div
                                                    key={index}
                                                    className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${event.event_theme === 'blue'
                                                        ? 'border-blue-200 text-blue-800 bg-blue-100'
                                                        : event.event_theme === 'red'
                                                            ? 'border-red-200 text-red-800 bg-red-100'
                                                            : event.event_theme === 'yellow'
                                                                ? 'border-yellow-200 text-yellow-800 bg-yellow-100'
                                                                : event.event_theme === 'green'
                                                                    ? 'border-green-200 text-green-800 bg-green-100'
                                                                    : 'border-purple-200 text-purple-800 bg-purple-100'
                                                        }`}
                                                >
                                                    <p className="text-sm truncate leading-tight">{event.event_title}</p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {openEventModal && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                    <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                        <div
                            className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                            onClick={() => setOpenEventModal(false)}
                        >
                            <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.607 16.242 13.365 12 17.607 7.758z"></path>
                            </svg>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h4 className="text-2xl font-semibold mb-6">Create Event for {eventDate}</h4>
                            <input
                                className="w-full mb-4 px-4 py-2 border rounded-lg"
                                type="text"
                                placeholder="Event Title"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                            <select
                                className="w-full mb-4 px-4 py-2 border rounded-lg"
                                value={eventTheme}
                                onChange={(e) => setEventTheme(e.target.value)}
                            >
                                {themes.map((theme) => (
                                    <option key={theme.value} value={theme.value}>
                                        {theme.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={addEvent}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
                            >
                                Save Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
