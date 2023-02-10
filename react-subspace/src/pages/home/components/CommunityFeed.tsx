import { FC } from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  StackDivider,
  Box,
  Text,
  useColorModeValue,
  HStack,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { themeColor } from "../../../utils/theme";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../utils/routes";
import { useDispatch } from "react-redux";
import { setSelectedCommunity } from "../../../redux/communitySlice";
import { Community } from "../../../utils/types";

interface CommunityFeedProps {
  communities: Array<Community>;
}

const CommunityFeed: FC<CommunityFeedProps> = ({
  communities,
}: CommunityFeedProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NavigateCommunityPage = (community: Community) => {
    dispatch(setSelectedCommunity(community));
    navigate(AppRoute.Community, {
      state: { community: community },
    });
  };
  return (
    <Card
      id="communityfeed"
      bgColor={useColorModeValue("white", "#1d1e1f")}
      width="80"
      borderRadius="md"
      borderWidth="1px"
      mr={4}
      position="sticky"
      top={"5rem"}
    >
      <Box
        bgColor={themeColor.secondary}
        objectFit="cover"
        borderTopRadius="md"
        objectPosition="center"
        boxSize="10"
        w="100%"
      />
      <CardHeader>
        <Heading fontSize="md">Recommended Communities</Heading>
      </CardHeader>

      <CardBody>
        <VStack divider={<StackDivider />} alignItems="start">
          {communities
            .slice(0, Math.min(communities.length, 5))
            .map((community: Community) => {
              return (
                <Box
                  key={community.id}
                  w="100%"
                  cursor="pointer"
                  onClick={() => NavigateCommunityPage(community)}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <HStack gap={4}>
                      <Avatar src={community.community_image_url} />
                      <Box mr={8}>
                        <Heading size="sm">{community.name}</Heading>
                        <Text> {community.about}</Text>
                      </Box>
                    </HStack>
                  </Flex>
                </Box>
              );
            })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CommunityFeed;
