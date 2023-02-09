import { FC } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { themeColor } from "../../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { resetFilteredPost, setFilteredPost } from "../../../redux/postSlice";
import { resetSearch, setSearch } from "../../../redux/searchSlice";
import { Post } from "../../../utils/types";

const SearchBar: FC = () => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchTerm
  );
  const posts = useSelector((state: RootState) => state.post.post);
  const dispatch = useDispatch();
  const filteredPosts: Array<Post> = [];
  const filterpost = () => {
    for (let index = 0; index < posts.length; index++) {
      let title = posts[index].title.toLowerCase();

      if (title.indexOf(searchKeyword.toLowerCase()) != -1) {
        filteredPosts.push(posts[index]);
      }
    }
    dispatch(setFilteredPost(filteredPosts));
  };

  return (
    <FormControl width={{ base: "100%", md: "400px" }}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          placeholder="Search"
          focusBorderColor={themeColor.primary}
          onKeyUp={() => filterpost()}
          onAbort={() => {
            dispatch(resetSearch());
            dispatch(resetFilteredPost());
          }}
          onClick={() => {
            dispatch(setSearch(searchKeyword));
            filterpost();
          }}
          onChange={(event) => {
            if (event.target.value == "") {
              dispatch(resetSearch());
              dispatch(resetFilteredPost());
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
