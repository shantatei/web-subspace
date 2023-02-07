import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { CommunityUser } from "../../../utils/types";
import { communityapi } from "../../../api/community";
import { SimpleGrid, Text, VStack, Progress } from "@chakra-ui/react";
import { CommunityCard } from "../../../components/community/CommunityCard";
import { resetLeftCommunity } from "../../../redux/authSlice";

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
  const dispatch = useDispatch();
  const leftCommunity = useSelector(
    (state: RootState) => state.auth.leftCommunity
  );
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  const fetchCommunitiesUser = () => {
    setFetchingData(true);
    communityapi.get(`communityByUserId/${user?.id}`).then(
      (res) => {
        setCommunitiesUser({
          communitedOwned: res.data.communities_owned,
          communitiesJoined: res.data.communities_joined,
        });
        setFetchingData(false);
      },
      (error) => {
        setFetchingData(false);
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    dispatch(resetLeftCommunity());
    setCommunitiesUser({
      communitedOwned: [],
      communitiesJoined: [],
    });
    fetchCommunitiesUser();
  }, [user, leftCommunity == true]);

  return (
    <>
      {fetchingData == true ? (
        <Text>
          <Progress size="xs" isIndeterminate />
          Fetching Data ...
        </Text>
      ) : (
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
      )}
    </>
  );
};

export default ProfileCommunities;
