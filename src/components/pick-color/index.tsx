import React, {
  memo, useMemo,
  useState,
  useCallback,
} from 'react';
import {  useSelector } from 'react-redux'
import {
  SketchPicker,
  GithubPicker,
  SwatchesPicker,
  TwitterPicker,
  CustomPicker,
  ChromePicker,
} from 'react-color';
import { Popover } from 'antd';
import lg from '../../static/language.json'

import './index.less';

interface IProps {
  themColor: string;
  onChangeComplete: (color: string) => void;
  type?: string;
  position?: string;
  small?: boolean;
}

const pikers: {
  [key: string]: React.ReactNode,
} = {
  sketch: SketchPicker,
  chrome: ChromePicker,
  github: GithubPicker,
  twitter: TwitterPicker,
  custom: CustomPicker,
  swatches: SwatchesPicker,
};

const PickColor: React.FC<IProps> = (props) => {
  const {
    type = 'sketch',
    position = 'bottom',
    themColor,
    onChangeComplete,
  } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { language } = useSelector((state: any) => state.layout);
  const [color, setColor] = useState(themColor);

  const Picker: any = pikers[type];

  // 颜色选择的change事件
  const handleChange = () => {

  }

  const handleChangeComplete = useCallback(
    (color: any) => {
      onChangeComplete(color.hex);
      setColor(color.hex);
    }
    , [onChangeComplete])
  const handleClosePicker = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  // 展示色块的点击
  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);


  const { swatch, picker } = useMemo(() => {
    const styles: any = {
      wrapper: {
        position: 'inherit',
        zIndex: 100,
      },
    };
    if (position === 'top') {
      styles.wrapper.transform = 'translateY(-100%)';
      styles.wrapper.paddingBottom = 8;
    }

    const swatch = (
      <Popover
        content={`${lg[language]["theme"]}`}
      >
        <div
          className="swatch"
          onClick={handleClick}
        >
          <div className="swatch-color" style={{
            background: color,
          }} />
        </div>
      </Popover>
    )

    const picker = displayColorPicker
      ? (
        <div className="popover">
          <div
            className="cover"
            onClick={handleClosePicker}
          />
          <div
            style={styles.wrapper}
          >
            <Picker
              {...props}
              color={color}
              onChange={handleChange}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </div>
      )
      : null;

    return {
      swatch,
      picker,
    }

  }, [position, handleClick, color, displayColorPicker, handleClosePicker, Picker, props, handleChangeComplete]);

  return (
    <div className="pick-color">
      {swatch}
      {picker}
    </div>
  );
};

export default memo(PickColor);
