import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import LoginForm from "../form/LoginForm";
import SignUpForm from "../form/SignUpForm";
import { theme, themeColor } from "../../../../utils/theme";
import { useColorModeValue } from "@chakra-ui/react";

interface AuthModalProps {
  state: { index: number; isOpen: boolean };
  setState: Dispatch<SetStateAction<{ index: number; isOpen: boolean }>>;
}

const AuthModal = ({ state, setState }: AuthModalProps) => {
  const handleTabsChange = (index: number) =>
    setState({ ...state, index: index });
  const closeModal = () => setState({ ...state, isOpen: false });

  return (
    <Modal
      closeOnEsc
      preserveScrollBarGap
      isOpen={state.isOpen}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          Subspace
        </ModalHeader>
        <ModalCloseButton top={3.5} />

        <ModalBody pb={4}>
          <Tabs isFitted index={state.index} onChange={handleTabsChange}>
            <TabList>
              <Tab>Log in</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm onClose={closeModal} />
              </TabPanel>
              <TabPanel>
                <SignUpForm onClose={closeModal} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
