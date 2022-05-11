import { InputNumber, Row, Slider } from 'antd';
import React from 'react'

interface Props {
  onChange: ((value: number) => void) | undefined;
  inputValue: number | undefined;
  formatter: (value: number | bigint | undefined) => string;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;

}

export const SliderWithInput: React.FC<Props> = ({
  formatter,
  inputValue,
  onBlur,
  onChange,
  children
}) => {
  return (
    <>
      <span>
        {children}
      </span>
      < Row >
        <Slider
          style={{ flex: 1 }}
          min={1}
          max={100000}
          onChange={onChange}
          value={inputValue}
          tipFormatter={formatter}
          step={100}
          aria-label="Present value"
        />

        <div>
          <span style={{margin: '0 0 0 16px'}}>
            R$
          </span>
          <InputNumber
            placeholder='teste'
            min={1}
            max={1000000000}
            style={{ margin: '0 16px', width: "100px" }}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            aria-label="Present value"
          />
        </div>
      </Row >
    </>
  )
}


