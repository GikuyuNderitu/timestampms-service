const Koa = require('koa');
const url = require('url');
const app = new Koa();
const PORT = process.env.PORT || 1337;

const monthToName = monthNumber => {
  switch(monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return monthNumber;
  }
}

/**
 * 
 * @param {Date} d 
 */
const dateToLanguage = d => `${monthToName(d.getMonth())} ${d.getDate()}, ${d.getFullYear()}`

app.use(async (ctx, next) => {
  let parsedUrl;
  try{
    parsedUrl = decodeURI(url.parse(ctx.request.url).path.substring(1));
  } catch (e) {
    ctx.response.body = JSON.stringify({
      uxix: null,
      natural: null
    }, null, 4)
    return;
  }
  if(parsedUrl === 'favicon.ico') return

  let date;
  date = new Date(parsedUrl * 1000);

  if(date.toString() ==='Invalid Date') date = new Date(parsedUrl);

  const response = date.toString() === 'Invalid Date' ? {
    unix: null,
    natural: null
  }: {
    unix: date.valueOf()/1000,
    natural: dateToLanguage(date)
  }

  ctx.response.body = JSON.stringify(response, null, 4);
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}.`)
})

