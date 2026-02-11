import { google } from "googleapis";

selectMonth = document.getElementById("month");
selectYear = document.getElementById("year");

const monthsMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

monthNumber = monthsMap[selectMonth];
yearNumber = parseInt(selectYear.value);
//The getDate() method of Date instances returns the day of the month for this date according to local time.
endOfSelectMonth = 32 - new Date(yearNumber, monthNumber - 1, 32).getDate();

month = monthNumber.toString(); 
year = yearNumber.toString();

timeMinValue = year + "-" + month.padStart(2, "0") + "-01T00:00:00Z";
timeMaxValue = year + "-" + month.padStart(2, "0") + "-" + endOfSelectMonth.toString().padStart(2, "0") + "T23:59:59Z";


export default async function handler(request, response) {

    const calendar = google.calendar({
        version: "v3",
        auth: process.env.GOOGLE_CAL_API_KEY, // API key only works for PUBLIC calendars
    });

    //when i get my promise back .THEN(i will do this)
    const res = await calendar.events.list({
        calendarId: "c_6c371d91700f944faa41f0885a53ef93e08b9eb4519ea076f2981edddb92f659@group.calendar.google.com",
        //the version jason helped code, getting the next 30 days of events, starting from the client's current time.
        //timeMin: new Date().toISOString(),
        //timeMax: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),

        //the version i coded, getting the events for the month and year selected by the client. unfortunately, this version is not working
        //timeMax: new Date(new Date(parseInt(selectYear.value), parseInt(selectMonth.value) + 1, 0, 23, 59, 59, 999).toISOString()),
        
        //new version, which should get the events for the month and year selected by the client.
        timeMin: new Date(timeMinValue).toISOString(),
        timeMax: new Date(timeMaxValue).toISOString(),
        singleEvents: true,
        orderBy: "startTime",
    });

    response.status(200).json(res.data.items);

    console.log(res.data.items);



}
