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
  Spacer,
} from "@chakra-ui/react";
import { Community } from "../../../utils/types";
import { themeColor } from "../../../utils/theme";

interface CommunityFeedProps {
  communities: Array<Community>;
}

const CommunityFeed: FC<CommunityFeedProps> = ({
  communities,
}: CommunityFeedProps) => {
  return (
    <Card
      bgColor={useColorModeValue("white", "#1d1e1f")}
      width="80"
      borderRadius="md"
      borderWidth="1px"
      mr={4}
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
          {communities.map((community: Community) => {
            return (
              <Box key={community.id} w="100%">
                <Flex justifyContent="space-between" alignItems="center">
                  <HStack gap={4}>
                    <Avatar src={community.community_image_url} />
                    <Box mr={8}>
                      <Heading size="sm">{community.name}</Heading>
                      <Text> {community.about}</Text>
                    </Box>
                  </HStack>
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
