import { maduraiData } from './madurai';
import { chennaiData } from './chennai';
import { ootyData } from './ooty';
import { kodaikanalData } from './kodaikanal';
import { kanyakumariData } from './kanyakumari';
import { thanjavurData } from './thanjavur';
import { rameswaramData } from './rameswaram';
import { yercaudData } from './yercaud';
import { mahabalipuramData } from './mahabalipuram';

export const destinationsList = [
  maduraiData,
  chennaiData,
  ootyData,
  kodaikanalData,
  kanyakumariData,
  thanjavurData,
  rameswaramData,
  yercaudData,
  mahabalipuramData
];

export const destinationsMap = destinationsList.reduce((acc, dest) => {
  acc[dest.id] = dest;
  return acc;
}, {});
