import moment from "moment";
import "moment/locale/ru";
function Time(date) {
  let stillUtc = moment.utc(date);
  let time = moment(stillUtc).local().format("hh:mm");
  return time;
}

export { Time };
