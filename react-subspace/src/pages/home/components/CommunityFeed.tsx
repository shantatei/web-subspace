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
  Button,
  Flex,
} from "@chakra-ui/react";
import { Community } from "../../../utils/types";

interface CommunityFeedProps {
  communities: Array<Community>;
}

const CommunityFeed: FC<CommunityFeedProps> = ({
  communities,
}: CommunityFeedProps) => {
  return (
    <Card
      bgColor={useColorModeValue("white", "#1d1e1f")}
      width="100%"
    >
      <CardHeader>
        <Heading size="md">Recommended Communities</Heading>
      </CardHeader>

      <CardBody>
        <VStack divider={<StackDivider />} alignItems="start">
          {communities.map((community: Community) => {
            return (
              <Box key={community.id}>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    src={community.community_image_url}
                  />
                  <Box mr={8}>
                    <Heading size="sm">{community.name}</Heading>
                    <Text> {community.about}</Text>
                  </Box>
                  <Button>Join</Button>
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
