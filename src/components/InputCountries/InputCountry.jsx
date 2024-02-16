import React from "react";
import { useCountries } from "use-react-countries";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export function InputCountries() {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags } = countries[country];

  return (
    <div className="relative flex w-full">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex gap-2 justify-start items-center h-[50px] bg-countries w-full"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-5 w-5 rounded-full object-cover"
            />
            <span
              className="countryLabel"
              style={{ textTransform: "capitalize" }}
            >
             <span className="countryLabel">{name}</span>
            </span>
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem]">
          {countries.map(({ name, flags }, index) => (
            <MenuItem
              key={name}
              value={name}
              className="flex items-center gap-2"
              onClick={() => setCountry(index)}
            >
              <img
                src={flags.svg}
                alt={name}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span style={{ textTransform: "capitalize" }}>{name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
