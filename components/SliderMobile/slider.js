import { Slider } from '@material-ui/core';

function PriceSlider(props) {
  const { value, onChange } = props;

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        min={0}
        max={5000}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default PriceSlider;