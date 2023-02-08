import { FC } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { themeColor } from "../../../utils/theme";
import { postapi } from "../../../api/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setFilteredPost } from "../../../redux/postSlice";
import { resetSearch, setSearch } from "../../../redux/searchSlice";

const SearchBar: FC = () => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchTerm
  );
  const dispatch = useDispatch();

  const fetchSearchList = () => {
    postapi.get(`/queryPost?keyword=${searchKeyword}&sortOrder=dsc`).then(
      (res) => {
        dispatch(setFilteredPost(res.data.posts));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  return (
    <FormControl width={{ base: "100%", md: "400px" }}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          placeholder="Search"
          focusBorderColor={themeColor.primary}
          onKeyUp={() => fetchSearchList()}
          onChange={(event) => {
            if (event.target.value == "") {
              dispatch(resetSearch());
            } else {
              dispatch(setSearch(event.target.value));
            }
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchBar;
