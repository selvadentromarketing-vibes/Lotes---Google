/**
 * "Add to calendar" for a single event: a Google Calendar link and an RFC 5545
 * .ics file (Apple Calendar, Outlook…). Times are UTC ("20261120T000000Z"), so
 * neither needs a time zone block. Also imported by vite.config.ts at build time.
 */
export interface CalendarEvent {
  uid: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
  url: string;
}

export const googleCalendarUrl = (event: CalendarEvent) =>
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.start}/${event.end}`,
    details: `${event.description}\n${event.url}`,
    location: event.location,
  }).toString();

// RFC 5545 §3.3.11: backslash, semicolon, comma and newline are escaped in text values.
const escapeText = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

// RFC 5545 §3.1: lines longer than 75 octets are folded with CRLF + a space,
// never inside a multi-byte character.
const fold = (line: string) => {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let part = '';
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (octets + size > (parts.length ? 74 : 75)) {
      parts.push(part);
      part = '';
      octets = 0;
    }
    part += char;
    octets += size;
  }
  parts.push(part);
  return parts.join('\r\n ');
};

const utcStamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export const icsFile = (event: CalendarEvent, now = new Date()) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Selvadentro Tulum//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
    `DESCRIPTION:${escapeText(`${event.description}\n${event.url}`)}`,
    `URL:${event.url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n') + '\r\n';
