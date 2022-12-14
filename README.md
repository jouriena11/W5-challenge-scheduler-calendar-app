# **W5-challenge-scheduler-calendar-app**

In week 5 challenge, we're assigned to fix HTML and JavaScript codes to make the scheduler-calendar web application functional. The key requirements are:

- To add current date to the header

- To add more hourly rows. To resemble the mockup, I also make the scheduler only available between 9am to 5pm.

- To style the rows so that past item(s) has gray background, present item has red background, and future item(s) has green background. These styles (provided as a starter code) already exist in the CSS file using the same class name (i.e., .past .present .future)

- To save a scheduled item/content to a browser localStorage when the corresponding save button is clicked.

- To retrieve and display the saved scheduled item/content on the web application when the page is refreshed.

## Approaches to Solving the Challenge

**Functions Grouping**
Init -- get data + display 
Get Data
Render Data
Save Data

**Rows of textarea / scheduled items input**
Although starter codes are provided in the HTML, I understand that they only serve simply as examples of rendered results (i.e., past = gray, preset = red, and future = green), and that we don't have to keep them in the HTML files. After all, hardcoding the rest of the hourly rows in the HTML file would result in unnecessary lengthy codes, especially when this can be automatically generated with JavaScript with loop. In reference to Week 5 Student Activity # 10, it's also possible to assign a variable with the whole <div> element as value. Hence, this is deemed a much more efficient way to create scheduled item elements. These codes are put together inside the timeBlockRender() function.

**Deciding when to code with JavaScript and jQuery**
I've been told that JavaScript codes are processed at a much faster speed comparing to jQuery codes, regardless of actual human perception (i.e., the difference in speed might not be clearly noticeable to human users in real life), whereas jQuery make it much easier to write codes. But a good web developer should know how to code in both JavaScript and jQuery (as well as any other programming languages that are currently in demand)


const -- to avoid using the same variable name
let -- to make sure that its use is limited within a scope

## **Extended Personal Study**
- insertAdjacentHTML (https://css-tricks.com/comparing-methods-for-appending-and-inserting-with-javascript/)


## **Lessons Learnt**
- day.js().format('format') would return a string. To convert the string into a number so that calculation or comparison can be performed, it must be wrapped with number() method.

- 