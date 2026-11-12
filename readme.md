# Student Grade Calculator & Performance Tracker

> A simple, responsive tool for recording student marks, calculating grades, and monitoring class performance.

**Developed by Kisakye Paul — Software Developer**

[Live Demo](#live-demo) · [Features](#features) · [Contact / Project Enquiries](#need-a-similar-solution)

---

## Overview

The Student Grade Calculator & Performance Tracker helps teachers, tutors, trainers, and learning centres record student results and review key class-performance figures from one screen.

Add a student's name, select a subject, and enter a mark out of 100. The application saves the record in the browser and updates the results table and performance overview.

It is designed as a lightweight, easy-to-use starting point for individuals and small learning environments that need a straightforward way to manage marks.

## Features

- **Student result entry:** Record a student's name, subject, and mark.
- **Automatic grading:** Convert marks into grades using the configured grading scale.
- **Results table:** View saved student-subject records, including a generated record number.
- **Performance overview:** Display the number of records, class average, highest mark, and top grade.
- **Browser-based storage:** Save records in the browser with `localStorage`, so they remain available in that browser after a refresh.
- **Input feedback:** Show messages when entered information needs attention.
- **Responsive interface:** Use the application on desktop and smaller screens, depending on the layout and styling in the project.

## Grading scale

The current JavaScript grading function uses the following ranges:

|   Mark | Grade |
| -----: | :---: |
| 90–100 |   A   |
|  80–89 |   B   |
|  70–79 |   C   |
|  60–69 |   D   |
|  50–59 |   E   |
|   0–49 |   F   |

The grading ranges can be changed in the `calculateMarks()` function to match an institution's assessment policy.

## Live demo

Add your published application URL here before sharing this README publicly:

**[Open the Grade Calculator](https://pauldeveloper73.github.io/grade-calculator-pro/)**

## How to use the application

1. Open the application in a modern web browser.
2. Enter the student's full name.
3. Choose the subject.
4. Enter the mark out of 100.
5. Submit the form to save the record.
6. Review the results table and performance overview.
7. Refresh the page. Records saved in that browser should load again.

**Important:** `localStorage` is specific to the browser and device being used. It is not a shared school database. Clearing browser data, using a different browser, or moving to another device will not automatically transfer the records. Export and cloud backup are not included unless separately implemented.

## Run locally

This is a browser-based JavaScript project.

1. Download or clone the project repository.
2. Open the project folder in your code editor.
3. Open the main HTML file in a browser, or run it with the VS Code **Live Server** extension if the project uses separate local files.
4. Start entering student results.

No backend server or database is required for the current `localStorage` version.

## Technologies

- **HTML5** — page structure and form elements.
- **CSS / Tailwind CSS utilities** — interface styling, where included in the project.
- **JavaScript (Vanilla JS)** — form handling, validation, grade calculation, DOM updates, and performance summaries.
- **Web Storage API (`localStorage`)** — saving records in the current browser.

## How the performance figures are calculated

- **Total records:** Number of saved student-subject entries.
- **Class average:** Sum of the valid recorded marks divided by the number of valid marks.
- **Highest mark:** The highest valid mark in the saved records.
- **Top grade:** The grade corresponding to the highest mark.

The current version calculates the average across saved subject records. When a student has more than one subject entry, each subject mark contributes to the average as a separate record.

## Current scope and future enhancements

The current version is a lightweight, browser-based grade tracker. The following are possible custom additions and should not be considered implemented until they are built and tested:

- Edit and delete student records.
- Multiple subjects grouped under one student, with student-level totals and averages.
- Class, stream, term, and academic-year management.
- Search, sorting, and filtering.
- Export to Excel, CSV, or PDF and printable report cards.
- User accounts and role-based access for teachers and administrators.
- A central database, cloud backup, and secure multi-device access.
- School branding, custom grading scales, and analytics reports.

## Need a similar solution?

Do you run a school, tuition centre, training institute, or education programme that needs a digital system for managing student information and results?

I develop practical web applications tailored to real business and organisational workflows. The grade tracker can be used as a starting point for a more complete solution, with features selected to fit your processes.

**Let's discuss your project.** I can help plan and develop solutions such as:

- Student and class management systems.
- Examination, grading, and report-card systems.
- Attendance and academic-performance dashboards.
- School or organisation websites and custom business applications.

### Request a project discussion

- **Developer:** Kisakye Paul — Software Developer
- **Email:** kisakyepaul73@gmail.com
- **WhatsApp / Phone:** +256 774 185 964
- **Portfolio:** https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/

---

## Project note

This project is intended for demonstration and small-scale browser-based record keeping in its current form. Before using it for official school records or sensitive student information, add appropriate access controls, reliable backups, server-side storage, and data-protection measures.

**Developed By: Kisakye Paul – Software Developer**
