import { google } from "googleapis";


export default async function handler(request, response) {

    const calendar = google.calendar({
        version: "v3",
        auth: process.env.GOOGLE_CAL_API_KEY, // API key only works for PUBLIC calendars
    });

    //when i get my promise bach .THEN(i will do this)
    const res = await calendar.events.list({
        calendarId: "c_6c371d91700f944faa41f0885a53ef93e08b9eb4519ea076f2981edddb92f659@group.calendar.google.com",
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        orderBy: "startTime",
    });

    response.status(200).json(res.data.items);

    console.log(res.data.items);



}
