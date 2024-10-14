import { ParameterCategory } from '../interfaces/parameter-category';

export const paramCats: ParameterCategory[] = [
  {
    categoryName: 'general',
    childrenParam: [
      {
        paramName: 'Input',
        type: 'knob',
      },
      {
        paramName: 'Output',
        type: 'knob',
      },
      {
        paramName: 'Bypass',
        type: 'button',
      },
      {
        paramName: 'Dry',
        type: 'knob',
      },
      {
        paramName: 'Wet',
        type: 'knob',
      },
      {
        paramName: 'HPF',
        type: 'knob',
      },
      {
        paramName: 'LPF',
        type: 'knob',
      },
      {
        paramName: 'Drive',
        type: 'knob',
      },
      {
        paramName: 'Oversample',
        type: 'button',
      },
      {
        paramName: 'Oversample',
        type: 'indent',
      },
      {
        paramName: 'Delta/listen',
        type: 'button',
      },
      {
        paramName: 'VU/GR',
        type: 'button',
      },
      {
        paramName: 'Link',
        type: 'button',
      },
      {
        paramName: 'Solo',
        type: 'button',
      },
      {
        paramName: 'Type / Mode',
        type: 'button',
      },
      {
        paramName: 'Power',
        type: 'button',
      },
      {
        paramName: 'Analog',
        type: 'button',
      },
    ],
  },
  {
    categoryName: 'dyn',
    childrenParam: [
      {
        paramName: 'Ext Sidechain',
        type: 'button',
      },
      {
        paramName: 'Link',
        type: 'button',
      },
      {
        paramName: 'MS/Stereo',
        type: 'button',
      },
      {
        paramName: 'Type',
        type: 'button',
      },
      {
        paramName: 'Mode',
        type: 'button',
      },
      {
        paramName: 'Fast Attack',
        type: 'button',
      },
      {
        paramName: 'Fast Release',
        type: 'button',
      },
      {
        paramName: 'Soft Clip',
        type: 'button',
      },
      {
        paramName: 'Hard Knee',
        type: 'button',
      },
      {
        paramName: 'Auto Gain',
        type: 'button',
      },
      {
        paramName: 'Threshold',
        type: 'knob',
      },
      {
        paramName: 'Ratio',
        type: 'knob',
      },
      {
        paramName: 'Attack',
        type: 'knob',
      },
      {
        paramName: 'Release',
        type: 'knob',
      },
      {
        paramName: 'Hold',
        type: 'knob',
      },
      {
        paramName: 'Knee',
        type: 'knob',
      },
      {
        paramName: 'Makeup Gain',
        type: 'knob',
      },
      {
        paramName: 'Sidechain Freq/Mid',
        type: 'knob',
      },
      {
        paramName: 'Ceiling',
        type: 'knob',
      },
      {
        paramName: 'RMS',
        type: 'knob',
      },
      {
        paramName: 'Trim',
        type: 'knob',
      },
      {
        paramName: 'Auto Gain',
        type: 'button',
      },
      {
        paramName: 'Auto Release',
        type: 'button',
      },
      {
        paramName: 'Hard Knee',
        type: 'button',
      },
      {
        paramName: 'Q',
        type: 'knob',
      },
      {
        paramName: 'Range',
        type: 'knob',
      },
      {
        paramName: 'Clip',
        type: 'knob',
      },
    ],
  },
];
