import { createEvent } from './functions'

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
hoy.setDate(hoy.getDate() - 1);
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

const weekday = "mon";
const week = 1;
const openHour = 8;
const closeHour = 14;
const result = createEvent(weekday, week, openHour, closeHour);

test('Validation a event title and content basic', () => {
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, "hour"]);
});

test('Validation start date', () => {
    expect(result.start).toEqual(hoy);
});

test('Validation date', () => {
    expect(result.date).toEqual(new Date(hoy).toLocaleDateString('es-ES', options));
});


test('Validation illegal arguments', () => {
    const error = () => {
        createEvent(weekday, -3, openHour, closeHour);
    };
    expect(error).toThrow(Error);
});


test('create an event list of at least 10 events', () => {
    const listEvent = [
        {
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 12
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 12
        },
        {
            weekday: 'wed',
            week: 3,
            openHour: 8,
            closeHour: 15
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 8,
            closeHour: 15
        },
        {
            weekday: 'mon',
            week: 5,
            openHour: 8,
            closeHour: 16
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 16
        },
        {
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 17
        },
        {
            weekday: 'thu',
            week: 1,
            openHour: 8,
            closeHour: 17
        }

    ]

    listEvent.map(eventData => {
        const duration = [eventData.closeHour - eventData.openHour, "hour"]

        const result = createEvent(eventData.weekday, eventData.week, eventData.openHour, eventData.closeHour)

        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })
});