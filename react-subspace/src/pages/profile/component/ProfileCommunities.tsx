import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Community, CommunityUser } from "../../../utils/types";
import { communityapi } from "../../../api/community";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { CommunityCard } from "../../../components/community/CommunityCard";

interface UserCommunities {
  communitedOwned: Array<CommunityUser>;
  communitiesJoined: Array<CommunityUser>;
}

const ProfileCommunities: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [communitiesUser, setCommunitiesUser] = useState<UserCommunities>({
    communitedOwned: [],
    communitiesJoined: [],
  });

  const fetchCommunitiesUser = () => {
    communityapi.get(`communityByUserId/${user?.id}`).then(
      (res) => {
        setCommunitiesUser({
          communitedOwned: res.data.communities_owned,
          communitiesJoined: res.data.communities_joined,
        });
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchCommunitiesUser();
  }, []);

  return (
    <VStack w="100%" align="start">
      <Text fontWeight="bold">Communities Owned</Text>
      <SimpleGrid columns={3} spacing={10} w="100%">
        {!communitiesUser.communitedOwned.length ? (
          <Text>This user has yet to owned any community</Text>
        ) : (
          communitiesUser.communitedOwned.map(
            (communityuser: CommunityUser) => {
              return (
                <CommunityCard
                  key={communityuser.id}
                  community={communityuser.community}
                  bgColorDark="#1d1e1f"
                ></CommunityCard>
              );
            }
          )
        )}
      </SimpleGrid>
      <Text fontWeight="bold">Communities Joined</Text>
      <SimpleGrid columns={3} spacing={10} w="100%">
        {!communitiesUser.communitiesJoined.length ? (
          <Text>This user has yet to join any community</Text>
        ) : (
          communitiesUser.communitiesJoined.map(
            (communityuser: CommunityUser) => {
              return (
                <CommunityCard
                  key={communityuser.id}
                  community={communityuser.community}
                  bgColorDark="#1d1e1f"
                ></CommunityCard>
              );
            }
          )
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default ProfileCommunities;
