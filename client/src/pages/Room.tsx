import style from "./Room.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
export const Room = () => {
  return (
    <div className="min-h-screen  bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/11816425/pexels-photo-11816425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div
        className="grid h-screen py-40 m-auto text-2xl text-center"
        id={style.main_room}
      >
        <Tabs variant="soft-rounded" colorScheme="blue" margin={"auto"}>
          <TabList mb="1em" gap={4}>
            <Tab fontSize="2xl" color="white">
              Join Room
            </Tab>
            <Tab fontSize="2xl" color="white">
              Create Room
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack gap={6}>
                <Input
                  placeholder="User Name"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                />
                <Input
                  placeholder="Secret Room Key"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                />
                <button
                  className="w-4/5 py-2 m-auto rounded-md  sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
                  id={style.drop_box}
                >
                  Join Room
                </button>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack gap={6}>
                <Input
                  placeholder="User Name"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                />
                <Input
                  placeholder="Enter Room Name"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                />
                <button
                  className="w-4/5 py-2 m-auto rounded-md  sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
                  id={style.drop_box1}
                >
                  Create Room
                </button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
