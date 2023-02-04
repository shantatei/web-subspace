import Select from "react-select";
import { HStack, Avatar, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Community } from "../../../utils/types";
import { RefCallBack, ControllerRenderProps } from "react-hook-form";


interface SelectCommunityProps {
  // setCommunityId: Dispatch<SetStateAction<number | null>>;
  ref: RefCallBack;
  onChange: (...event: any[]) => void;
  value: number | null;
}

interface Options {
  value: number;
  label: string;
  key: number;
  image: string;
}

const SelectCommunity = ({ ref, onChange, value }: SelectCommunityProps) => {
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );

  return (
    <Select
      ref={ref}
      onChange={(option: Options | null) => onChange(option?.value)}
      // onChange={(option: Options | null) => {
      //   if (option?.value == null) {
      //     setCommunityId(null);
      //   } else {
      //     setCommunityId(option?.value);
      //   }
      // }}
      options={communities.map((community: Community) => {
        return {
          label: community.name,
          value: community.id,
          key: community.id,
          image: community.community_image_url,
        };
      })}
      formatOptionLabel={(community) => (
        <HStack>
          <Avatar size="xs" src={community.image} />
          <span>{community.label}</span>
        </HStack>
      )}
      isSearchable
      isClearable
      placeholder="Choose a Community"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: useColorModeValue("white", "#1d1e1f"),
          border: "none",
          boxShadow: "none",
        }),
        option: (styles, state) => ({
          ...styles,
          backgroundColor: state.isSelected ? "" : "",
          ":hover": {
            cursor: "pointer",
          },
        }),
        container: (base) => ({
          ...base,
          width: "100%",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: useColorModeValue("white", "#1d1e1f"),
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: "1em",
          color: useColorModeValue("black", "white"),
          fontWeight: 400,
        }),
        singleValue: (base) => ({
          ...base,
          color: useColorModeValue("black", "white"),
        }),
      }}
    />
  );
};

export default SelectCommunity;
