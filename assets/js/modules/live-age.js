import { $, $$, pad2 } from "./dom.js";

const BIRTH = new Date("2009-04-17T00:00:00+06:00");

function ageAt(now) {
  const totalSeconds = Math.floor((now.getTime() - BIRTH.getTime()) / 1000);
  let years = now.getFullYear() - BIRTH.getFullYear();
  let months = now.getMonth() - BIRTH.getMonth();
  let days = now.getDate() - BIRTH.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { Years: years, Months: months, Days: days, Hours: now.getHours(), Minutes: now.getMinutes(), Seconds: now.getSeconds(), totalSeconds };
}

export function initLiveAge() {
  const cells = $$("[data-age]");
  const total = $("[data-age-total]");
  if (!cells.length) return;
  const update = () => {
    const age = ageAt(new Date());
    cells.forEach((cell) => {
      cell.textContent = pad2(age[cell.dataset.age]);
    });
    if (total) total.textContent = `${age.totalSeconds.toLocaleString()} seconds alive`;
  };
  update();
  setInterval(update, 1000);
}
