import React from 'react'

import { Col, InputNumber, Row, Slider } from 'antd';
import "./styles.css";

interface Props {
  onChange: ((value: number) => void) | undefined;
  inputValue: number | undefined;
  tipFormatter?: (value: number | bigint | undefined) => string;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  minSlider: number,
  maxSlider: number,
  minInput: number,
  maxInput: number,
  stepSlider: number,
  stepInput: number,
  ariaLabel?: string,
  simbol: string,
}

export const SliderWithInput: React.FC<Props> = ({
  tipFormatter,
  inputValue,
  onBlur,
  onChange,
  children,
  minInput,
  maxInput,
  minSlider,
  maxSlider,
  stepSlider,
  stepInput,
  ariaLabel,
  simbol
}) => {
  return (
    <>
  
      <span style={{ color: '#b3b2bf' }}>
        {children}
      </span>

      < Col >
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <InputNumber
            placeholder='teste'
            min={minInput}
            max={maxInput}
            style={{ margin: '0', width: '100%' }}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            aria-label="Present value"
            step={stepInput}
            addonBefore={simbol}
            size="large"
          />

          <Slider
            style={{ margin: '-5px 0 0 0', width: 'calc(100% - 40px)', placeSelf: 'flex-end' }}
            min={minSlider}
            max={maxSlider}
            onChange={onChange}
            value={inputValue}
            tipFormatter={tipFormatter}
            step={stepSlider}
            aria-label={ariaLabel}
            handleStyle={{ border: '6px solid #A27CCD', backgroundColor: '#fff', width: '18px', height: '18px', marginTop: '-8px' }}
            trackStyle={{ backgroundColor: "#A27CCD" }}
          />
        </div>


      </Col >
    </>
  )
}


