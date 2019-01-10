import { Mode } from './Model';

export function twoDigits (n:number) {
  return n < 10 ? `0${n}` : `${n}`
}

export function formatHours (hours:number, mode:Mode) {
  const isPm = hours >= 12
  if (mode === '24h') {
    return { hours, isPm }
  } else if (hours === 0 || hours === 12) {
    return { hours: 12, isPm }
  } else if (hours < 12) {
    return { hours, isPm }
  } else {
    return { hours: hours - 12, isPm }
  }
}

function mod (a:number, b:number) {
  return a - Math.floor(a / b) * b
}

export function getShortestAngle (from:number, to:number) {
  const difference = to - from
  return from + mod(difference + 180, 360) - 180
}
