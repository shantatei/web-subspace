import { VStack, Box, Image } from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import { useLocation } from "react-router-dom";
import { Community } from "../../utils/types";
import { CommunityBanner } from "./components/CommunityBanner";

const CommunityPage = () => {
  const location = useLocation();
  const community: Community = location.state.community;

  function Banner() {
    if (community.community_banner_url) {
      return (
        <Image
          src={community.community_banner_url}
          objectFit="cover"
          w="full"
          h={40}
        />
      );
    }
    return <Box bgColor={themeColor.secondary} w="full" h={40} />;
  }

  return (
    <VStack w="100%" h="100%" mt={`0 !important`}>
      <Banner />
      <CommunityBanner community={community} />
    </VStack>
  );
};

export default CommunityPage;
