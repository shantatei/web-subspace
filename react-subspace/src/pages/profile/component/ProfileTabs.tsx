import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import ProfilePosts from "./ProfilePosts";
import ProfileCommunities from "./ProfileCommunities";

const ProfileTabs = () => {
  const tabs = ["Post", "Communities"];
  return (
    <Tabs m={2}>
      <TabList>
        {tabs.map((tab: string) => {
          return <Tab key={tab}>{tab}</Tab>;
        })}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfilePosts />
        </TabPanel>
        <TabPanel>
          <ProfileCommunities />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
