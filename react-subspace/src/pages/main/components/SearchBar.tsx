import { FC } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { themeColor } from "../../../utils/theme";

const SearchBar: FC = () => {
  return (
    <FormControl width={{ base: "100%", md: "400px" }}>
      <InputGroup >
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input placeholder="Search" focusBorderColor={themeColor.primary} />
      </InputGroup>
    </FormControl>
  );
};

export default SearchBar;
