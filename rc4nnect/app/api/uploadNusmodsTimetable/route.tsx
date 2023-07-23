import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'
import iCalDateParser from 'ical-date-parser'
var ical2json = require("ical2json")

export async function POST(request: any) {
  function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  }

  const body:FormData = await request.formData()
  const file:File = body.get('file')
  const residentEmail:string = body.get('residentEmail')

  if (!file.name.endsWith('.ics')) {
    return new NextResponse('Only .ics files are allowed', { status: 400 })
  }

  if (file.size > 100000) {
    return new NextResponse('File cannot be bigger than 100KB', { status: 400 })
  }

  const icsData = await file.text()
  // const modsData = icsToJson(icsData)
  const modsData = ical2json.convert(icsData).VCALENDAR[0].VEVENT
  // const modsData = ical.parseString(icsData)
  // const jcalData = ICAL.parse(icsData)

  const lessonsInfo = modsData.map((lessonObj) => {
    const duration = Math.abs(iCalDateParser(lessonObj.DTSTART) - iCalDateParser(lessonObj.DTEND)) / 36e5
    const name = lessonObj.SUMMARY
    const location = lessonObj.LOCATION

    if (lessonObj.hasOwnProperty('RRULE')) {  // means lesson is recurring
      const exdates = lessonObj.EXDATE.map((icsDateStr) => iCalDateParser(icsDateStr).getTime()) // each exdate is in getTime() format

      return Array(14)
      .fill(iCalDateParser(lessonObj.DTSTART))
      .map((date, index) => ({ // for NUSMods, by default, recur for 14 times
        startDateTime: addWeeks(new Date(date), index),
        duration: duration,
        name: name,
        location: location
      }))
      .filter((obj) => !exdates.includes(obj.startDateTime.getTime())) // returns an array of lessons
    } else {  // means lesson is not recurring
      return {
        startDateTime: iCalDateParser(lessonObj.DTSTART),
        duration: duration,
        name: name,
        location: location
      }
    }
  })
  .flat()  // returns an array of lessons for all modules
  .map((lesson) => ({...lesson, residentEmail: residentEmail})) 

  console.log(lessonsInfo)

  const createLessons = await prisma.$transaction([
    prisma.lesson.deleteMany({ where: { residentEmail: residentEmail }}),
    prisma.lesson.createMany({ data: lessonsInfo })
  ])

  return NextResponse.json(createLessons)
  }

// EXAMPLE FORMAT OF modsData:
// [
//   {
//     UID: '92bi@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230815T060000Z',
//     DTEND: '20230815T080000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=TU',
//     EXDATE: [
//       '20230926T060000Z', '20200101T060000Z', '20200125T060000Z',
//       '20200127T060000Z', '20200410T060000Z', '20200501T060000Z',
//       '20200507T060000Z', '20200525T060000Z', '20200710T060000Z',
//       '20200731T060000Z', '20200810T060000Z', '20201114T060000Z',
//       '20201225T060000Z', '20210101T060000Z', '20210212T060000Z',
//       '20210213T060000Z', '20210402T060000Z', '20210501T060000Z',
//       '20210513T060000Z', '20210526T060000Z', '20210720T060000Z',
//       '20210809T060000Z', '20211104T060000Z', '20211225T060000Z',
//       '20220101T060000Z', '20220201T060000Z', '20220202T060000Z',
//       '20220415T060000Z', '20220501T060000Z', '20220502T060000Z',
//       '20220516T060000Z', '20220711T060000Z', '20220809T060000Z',
//       '20221024T060000Z', '20221226T060000Z', '20230101T060000Z',
//       '20230102T060000Z', '20230122T060000Z', '20230123T060000Z',
//       '20230124T060000Z', '20230407T060000Z', '20230501T060000Z',
//       '20230602T060000Z', '20230629T060000Z', '20230809T060000Z',
//       '20231112T060000Z', '20231113T060000Z', '20231225T060000Z'
//     ],
//     SUMMARY: 'BT2101 Lecture',
//     LOCATION: 'I3-AUD',
//     DESCRIPTION: 'Econometrics Modeling for Business Analytics\\nLecture Group 1'
//   },
//   {
//     UID: '95x3@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230816T040000Z',
//     DTEND: '20230816T050000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=WE',
//     EXDATE: [
//       '20230927T040000Z', '20230816T040000Z', '20230823T040000Z',
//       '20200101T040000Z', '20200125T040000Z', '20200127T040000Z',
//       '20200410T040000Z', '20200501T040000Z', '20200507T040000Z',
//       '20200525T040000Z', '20200710T040000Z', '20200731T040000Z',
//       '20200810T040000Z', '20201114T040000Z', '20201225T040000Z',
//       '20210101T040000Z', '20210212T040000Z', '20210213T040000Z',
//       '20210402T040000Z', '20210501T040000Z', '20210513T040000Z',
//       '20210526T040000Z', '20210720T040000Z', '20210809T040000Z',
//       '20211104T040000Z', '20211225T040000Z', '20220101T040000Z',
//       '20220201T040000Z', '20220202T040000Z', '20220415T040000Z',
//       '20220501T040000Z', '20220502T040000Z', '20220516T040000Z',
//       '20220711T040000Z', '20220809T040000Z', '20221024T040000Z',
//       '20221226T040000Z', '20230101T040000Z', '20230102T040000Z',
//       '20230122T040000Z', '20230123T040000Z', '20230124T040000Z',
//       '20230407T040000Z', '20230501T040000Z', '20230602T040000Z',
//       '20230629T040000Z', '20230809T040000Z', '20231112T040000Z',
//       '20231113T040000Z', '20231225T040000Z'
//     ],
//     SUMMARY: 'BT2101 Tutorial',
//     LOCATION: 'COM1-0212',
//     DESCRIPTION: 'Econometrics Modeling for Business Analytics\\nTutorial Group 5'
//   },
//   {
//     UID: '47gv@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20231204T090000Z',
//     DTEND: '20231204T110000Z',
//     SUMMARY: 'BT2101 Exam',
//     DESCRIPTION: 'Econometrics Modeling for Business Analytics'
//   },
//   {
//     UID: '2vjs@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230816T080000Z',
//     DTEND: '20230816T100000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=WE',
//     EXDATE: [
//       '20230927T080000Z', '20200101T080000Z', '20200125T080000Z',
//       '20200127T080000Z', '20200410T080000Z', '20200501T080000Z',
//       '20200507T080000Z', '20200525T080000Z', '20200710T080000Z',
//       '20200731T080000Z', '20200810T080000Z', '20201114T080000Z',
//       '20201225T080000Z', '20210101T080000Z', '20210212T080000Z',
//       '20210213T080000Z', '20210402T080000Z', '20210501T080000Z',
//       '20210513T080000Z', '20210526T080000Z', '20210720T080000Z',
//       '20210809T080000Z', '20211104T080000Z', '20211225T080000Z',
//       '20220101T080000Z', '20220201T080000Z', '20220202T080000Z',
//       '20220415T080000Z', '20220501T080000Z', '20220502T080000Z',
//       '20220516T080000Z', '20220711T080000Z', '20220809T080000Z',
//       '20221024T080000Z', '20221226T080000Z', '20230101T080000Z',
//       '20230102T080000Z', '20230122T080000Z', '20230123T080000Z',
//       '20230124T080000Z', '20230407T080000Z', '20230501T080000Z',
//       '20230602T080000Z', '20230629T080000Z', '20230809T080000Z',
//       '20231112T080000Z', '20231113T080000Z', '20231225T080000Z'
//     ],
//     SUMMARY: 'ST2334 Lecture',
//     LOCATION: 'LT27',
//     DESCRIPTION: 'Probability and Statistics\\nLecture Group 2'
//   },
//   {
//     UID: 'xn2r@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230816T050000Z',
//     DTEND: '20230816T060000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=WE',
//     EXDATE: [
//       '20230927T050000Z', '20200101T050000Z', '20200125T050000Z',
//       '20200127T050000Z', '20200410T050000Z', '20200501T050000Z',
//       '20200507T050000Z', '20200525T050000Z', '20200710T050000Z',
//       '20200731T050000Z', '20200810T050000Z', '20201114T050000Z',
//       '20201225T050000Z', '20210101T050000Z', '20210212T050000Z',
//       '20210213T050000Z', '20210402T050000Z', '20210501T050000Z',
//       '20210513T050000Z', '20210526T050000Z', '20210720T050000Z',
//       '20210809T050000Z', '20211104T050000Z', '20211225T050000Z',
//       '20220101T050000Z', '20220201T050000Z', '20220202T050000Z',
//       '20220415T050000Z', '20220501T050000Z', '20220502T050000Z',
//       '20220516T050000Z', '20220711T050000Z', '20220809T050000Z',
//       '20221024T050000Z', '20221226T050000Z', '20230101T050000Z',
//       '20230102T050000Z', '20230122T050000Z', '20230123T050000Z',
//       '20230124T050000Z', '20230407T050000Z', '20230501T050000Z',
//       '20230602T050000Z', '20230629T050000Z', '20230809T050000Z',
//       '20231112T050000Z', '20231113T050000Z', '20231225T050000Z'
//     ],
//     SUMMARY: 'ST2334 Tutorial',
//     LOCATION: 'S16-06118',
//     DESCRIPTION: 'Probability and Statistics\\nTutorial Group 8'
//   },
//   {
//     UID: 'u4da@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20231125T010000Z',
//     DTEND: '20231125T030000Z',
//     SUMMARY: 'ST2334 Exam',
//     DESCRIPTION: 'Probability and Statistics'
//   },
//   {
//     UID: 'b0r6@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230817T090000Z',
//     DTEND: '20230817T100000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=TH',
//     EXDATE: [
//       '20230928T090000Z', '20200101T090000Z', '20200125T090000Z',
//       '20200127T090000Z', '20200410T090000Z', '20200501T090000Z',
//       '20200507T090000Z', '20200525T090000Z', '20200710T090000Z',
//       '20200731T090000Z', '20200810T090000Z', '20201114T090000Z',
//       '20201225T090000Z', '20210101T090000Z', '20210212T090000Z',
//       '20210213T090000Z', '20210402T090000Z', '20210501T090000Z',
//       '20210513T090000Z', '20210526T090000Z', '20210720T090000Z',
//       '20210809T090000Z', '20211104T090000Z', '20211225T090000Z',
//       '20220101T090000Z', '20220201T090000Z', '20220202T090000Z',
//       '20220415T090000Z', '20220501T090000Z', '20220502T090000Z',
//       '20220516T090000Z', '20220711T090000Z', '20220809T090000Z',
//       '20221024T090000Z', '20221226T090000Z', '20230101T090000Z',
//       '20230102T090000Z', '20230122T090000Z', '20230123T090000Z',
//       '20230124T090000Z', '20230407T090000Z', '20230501T090000Z',
//       '20230602T090000Z', '20230629T090000Z', '20230809T090000Z',
//       '20231112T090000Z', '20231113T090000Z', '20231225T090000Z'
//     ],
//     SUMMARY: 'CS2040 Lecture',
//     LOCATION: 'COM3-MPH',
//     DESCRIPTION: 'Data Structures and Algorithms\\nLecture Group 1'
//   },
//   {
//     UID: 'qzgq@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230816T020000Z',
//     DTEND: '20230816T040000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=WE',
//     EXDATE: [
//       '20230927T020000Z', '20200101T020000Z', '20200125T020000Z',
//       '20200127T020000Z', '20200410T020000Z', '20200501T020000Z',
//       '20200507T020000Z', '20200525T020000Z', '20200710T020000Z',
//       '20200731T020000Z', '20200810T020000Z', '20201114T020000Z',
//       '20201225T020000Z', '20210101T020000Z', '20210212T020000Z',
//       '20210213T020000Z', '20210402T020000Z', '20210501T020000Z',
//       '20210513T020000Z', '20210526T020000Z', '20210720T020000Z',
//       '20210809T020000Z', '20211104T020000Z', '20211225T020000Z',
//       '20220101T020000Z', '20220201T020000Z', '20220202T020000Z',
//       '20220415T020000Z', '20220501T020000Z', '20220502T020000Z',
//       '20220516T020000Z', '20220711T020000Z', '20220809T020000Z',
//       '20221024T020000Z', '20221226T020000Z', '20230101T020000Z',
//       '20230102T020000Z', '20230122T020000Z', '20230123T020000Z',
//       '20230124T020000Z', '20230407T020000Z', '20230501T020000Z',
//       '20230602T020000Z', '20230629T020000Z', '20230809T020000Z',
//       '20231112T020000Z', '20231113T020000Z', '20231225T020000Z'
//     ],
//     SUMMARY: 'CS2040 Lecture',
//     LOCATION: 'COM3-MPH',
//     DESCRIPTION: 'Data Structures and Algorithms\\nLecture Group 1'
//   },
//   {
//     UID: 'rz8f@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230817T040000Z',
//     DTEND: '20230817T050000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=TH',
//     EXDATE: [
//       '20230928T040000Z', '20230817T040000Z', '20230824T040000Z',
//       '20200101T040000Z', '20200125T040000Z', '20200127T040000Z',
//       '20200410T040000Z', '20200501T040000Z', '20200507T040000Z',
//       '20200525T040000Z', '20200710T040000Z', '20200731T040000Z',
//       '20200810T040000Z', '20201114T040000Z', '20201225T040000Z',
//       '20210101T040000Z', '20210212T040000Z', '20210213T040000Z',
//       '20210402T040000Z', '20210501T040000Z', '20210513T040000Z',
//       '20210526T040000Z', '20210720T040000Z', '20210809T040000Z',
//       '20211104T040000Z', '20211225T040000Z', '20220101T040000Z',
//       '20220201T040000Z', '20220202T040000Z', '20220415T040000Z',
//       '20220501T040000Z', '20220502T040000Z', '20220516T040000Z',
//       '20220711T040000Z', '20220809T040000Z', '20221024T040000Z',
//       '20221226T040000Z', '20230101T040000Z', '20230102T040000Z',
//       '20230122T040000Z', '20230123T040000Z', '20230124T040000Z',
//       '20230407T040000Z', '20230501T040000Z', '20230602T040000Z',
//       '20230629T040000Z', '20230809T040000Z', '20231112T040000Z',
//       '20231113T040000Z', '20231225T040000Z'
//     ],
//     SUMMARY: 'CS2040 Tutorial',
//     LOCATION: 'COM1-0210',
//     DESCRIPTION: 'Data Structures and Algorithms\\nTutorial Group 05'
//   },
//   {
//     UID: '71de@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230818T040000Z',
//     DTEND: '20230818T060000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=FR',
//     EXDATE: [
//       '20230929T040000Z', '20230818T040000Z', '20230825T040000Z',
//       '20200101T040000Z', '20200125T040000Z', '20200127T040000Z',
//       '20200410T040000Z', '20200501T040000Z', '20200507T040000Z',
//       '20200525T040000Z', '20200710T040000Z', '20200731T040000Z',
//       '20200810T040000Z', '20201114T040000Z', '20201225T040000Z',
//       '20210101T040000Z', '20210212T040000Z', '20210213T040000Z',
//       '20210402T040000Z', '20210501T040000Z', '20210513T040000Z',
//       '20210526T040000Z', '20210720T040000Z', '20210809T040000Z',
//       '20211104T040000Z', '20211225T040000Z', '20220101T040000Z',
//       '20220201T040000Z', '20220202T040000Z', '20220415T040000Z',
//       '20220501T040000Z', '20220502T040000Z', '20220516T040000Z',
//       '20220711T040000Z', '20220809T040000Z', '20221024T040000Z',
//       '20221226T040000Z', '20230101T040000Z', '20230102T040000Z',
//       '20230122T040000Z', '20230123T040000Z', '20230124T040000Z',
//       '20230407T040000Z', '20230501T040000Z', '20230602T040000Z',
//       '20230629T040000Z', '20230809T040000Z', '20231112T040000Z',
//       '20231113T040000Z', '20231225T040000Z'
//     ],
//     SUMMARY: 'CS2040 Laboratory',
//     LOCATION: 'COM1-B112',
//     DESCRIPTION: 'Data Structures and Algorithms\\nLaboratory Group 3A'
//   },
//   {
//     UID: 'dgjs@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20231201T063000Z',
//     DTEND: '20231201T083000Z',
//     SUMMARY: 'CS2040 Exam',
//     DESCRIPTION: 'Data Structures and Algorithms'
//   },
//   {
//     UID: 'y4f0@nusmods.com',
//     SEQUENCE: '0',
//     DTSTAMP: '20230721T043540Z',
//     DTSTART: '20230817T020000Z',
//     DTEND: '20230817T040000Z',
//     RRULE: 'FREQ=WEEKLY;COUNT=14;BYDAY=TH',
//     EXDATE: [
//       '20230928T020000Z', '20200101T020000Z', '20200125T020000Z',
//       '20200127T020000Z', '20200410T020000Z', '20200501T020000Z',
//       '20200507T020000Z', '20200525T020000Z', '20200710T020000Z',
//       '20200731T020000Z', '20200810T020000Z', '20201114T020000Z',
//       '20201225T020000Z', '20210101T020000Z', '20210212T020000Z',
//       '20210213T020000Z', '20210402T020000Z', '20210501T020000Z',
//       '20210513T020000Z', '20210526T020000Z', '20210720T020000Z',
//       '20210809T020000Z', '20211104T020000Z', '20211225T020000Z',
//       '20220101T020000Z', '20220201T020000Z', '20220202T020000Z',
//       '20220415T020000Z', '20220501T020000Z', '20220502T020000Z',
//       '20220516T020000Z', '20220711T020000Z', '20220809T020000Z',
//       '20221024T020000Z', '20221226T020000Z', '20230101T020000Z',
//       '20230102T020000Z', '20230122T020000Z', '20230123T020000Z',
//       '20230124T020000Z', '20230407T020000Z', '20230501T020000Z',
//       '20230602T020000Z', '20230629T020000Z', '20230809T020000Z',
//       '20231112T020000Z', '20231113T020000Z', '20231225T020000Z'
//     ],
//     SUMMARY: 'IS1128 Lecture',
//     LOCATION: 'LT19',
//     DESCRIPTION: 'IT\\, Management and Organisation\\nLecture Group 1'
//   }
// ]