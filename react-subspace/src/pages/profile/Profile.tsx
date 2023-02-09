import React from "react";
import { VStack, Box, Image } from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import ProfileBanner from "./component/ProfileBanner";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  function Banner() {
    if (user?.profile_image_url) {
      return (
        <Image
          borderRadius="md"
          borderBottomRadius="none"
          borderWidth="1px"
          src={user.profile_image_url}
          objectFit="cover"
          w="full"
          h={40}
        />
      );
    }
    return <Box bgColor={themeColor.secondary} w="full" h={40} />;
  }
  return (
    <VStack w={{ base: "90%", md: "70%" }} h="100%" pb={2}>
      <Banner />
      <ProfileBanner user={user} />
    </VStack>
  );
};

export default Profile;
