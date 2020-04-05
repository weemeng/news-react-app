const { Dropdown } = require("semantic-ui-react");
const React = require("react");

const countryOptions = [
  { key: "us", value: "us", flag: "us", text: "United States" },
  { key: "sg", value: "sg", flag: "sg", text: "Singapore" },
];

const CountryList = ({ countryValue, updateCountry }) => {
  return (
    <div>
      <Dropdown
        placeholder="Select Country"
        search
        selection
        options={countryOptions}
        onChange={(event,data) => updateCountry(data.value)}
        header="Country"
        value={countryValue}
      />
    </div>
  );
};

export default CountryList;
