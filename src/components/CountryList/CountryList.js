const { Dropdown } = require("semantic-ui-react");
const React = require("react");

const countryOptions = [
  { key: "us", value: "us", flag: "us", text: "United States" },
  { key: "sg", value: "sg", flag: "sg", text: "Singapore" },
];

const CountryList = ({ updateCountry }) => {
  return (
    <div>
      <Dropdown
        placeholder="Select Country"
        search
        selection
        options={countryOptions}
        onChange={(event,data) => updateCountry(data.value)}
      />
    </div>
  );
};

export default CountryList;
