import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  FlashList,
  Icon,
  Image,
  Option,
  Select,
  Spinner,
  Switch,
  Text,
  TouchableOpacity,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "react-native-ficus-ui";
import EditUserModal from "./edit-user";
import { useUserImages } from "../../hooks/users";
import { useWindowDimensions } from "react-native";

const User = ({ userStringObj }) => {
  const { user: userString } = useLocalSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = JSON.parse(userStringObj || userString);

  const [userEmail, setUserEmail] = useState(user?.email);
  const [userPhone, setUserPhone] = useState(user?.phone);

  const [isInFavorites, setIsInFavorites] = useState(false);

  const selectRef = useRef();
  const [contactGroup, setContactGroup] = useState("⚽️ team");

  const {
    userImages,
    refresh: refreshImages,
    isLoading: isLoadingImages,
  } = useUserImages();

  const [isSmallScreen] = useMediaQuery({
    minWidth: 0,
    maxWidth: 480,
  });
  const { width: screenWidth } = useWindowDimensions();
  const imageWidth = (screenWidth - 40) / 3 / (isSmallScreen ? 1 : 2);

  useEffect(() => {
    refreshImages();
  }, [refreshImages, userString, userStringObj]);

  useEffect(() => {
    setUserEmail(user?.email);
    setUserPhone(user?.phone);
  }, [user?.email, user?.phone]);

  return (
    <Box h="100%" p="xl">
      <Box flexDirection="row" alignItems="center">
        <Image
          source={{ uri: user?.picture?.large }}
          w={80}
          h={80}
          borderRadius={100}
        />

        <Text
          fontSize="6xl"
          fontWeight="bold"
          ml="lg"
          numberOfLines={2}
          ellipsizeMode="tail"
          flex={1}
        >
          {`${user.name?.first} ${user.name?.last}`}
        </Text>

        <TouchableOpacity onPress={onOpen}>
          <Icon
            name="user-edit"
            fontFamily="FontAwesome5"
            color="green.500"
            fontSize="4xl"
          />
        </TouchableOpacity>
      </Box>

      <VStack spacing="xl" mt="xl">
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            ✉️ Email
          </Text>
          <Box mt="xs">
            <Text fontSize="xl">{userEmail}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            ☎️ Phone number
          </Text>
          <Box mt="xs">
            <Text fontSize="xl">{userPhone}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            📍 Address
          </Text>
          <Box mt="xs">
            <Text fontSize="xl">{`${user.location?.street?.number} ${user.location?.street?.name}`}</Text>
            <Text fontSize="xl">{`${user.location?.city} ${user.location?.state}`}</Text>
            <Text fontSize="xl">{user.location?.country}</Text>
          </Box>
        </Box>

        <Box flexDirection="row" alignItems="center" justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            ⭐️ In Favorites
          </Text>
          <Switch
            colorScheme="green"
            on={isInFavorites}
            onPress={() => setIsInFavorites(!isInFavorites)}
          />
        </Box>

        <Box flexDirection="row" alignItems="center" justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Contact group
          </Text>
          <Box>
            <Button
              colorScheme="white"
              color="black"
              borderColor="green.500"
              borderWidth={1}
              onPress={() => {
                if (selectRef.current) {
                  selectRef.current.open();
                }
              }}
            >
              {contactGroup}
            </Button>
            <Select
              submit
              onSelect={setContactGroup}
              ref={selectRef}
              value={contactGroup}
              title="Contact group"
              mt="md"
              pb="2xl"
              data={["⚽️ team", "💼 work team", "👨‍👩‍👦‍👦 family"]}
              renderItem={(item, index) => (
                <Option
                  value={item}
                  py="md"
                  px="xl"
                  prefix={
                    <Icon name="check" color="green.500" fontSize="2xl" />
                  }
                >
                  <Text>{item}</Text>
                </Option>
              )}
              renderSubmitButton={() => (
                <Button full colorScheme="green" m="xl">
                  Submit
                </Button>
              )}
            />
          </Box>
        </Box>
      </VStack>

      <Text fontSize="lg" fontWeight="bold" mt="xl" mb="lg">
        📸 Images
      </Text>

      {isLoadingImages ? (
        <Center flex={1}>
          <Spinner color="green.500" size="large" />
        </Center>
      ) : (
        <FlashList
          data={userImages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item?.url }}
              h={imageWidth}
              w={imageWidth}
              m="xs"
              resizeMode="cover"
            />
          )}
          numColumns={3}
          estimatedItemSize={imageWidth}
          h="100%"
        />
      )}

      <EditUserModal
        user={{
          email: userEmail,
          phone: userPhone,
        }}
        onChangeUser={(user) => {
          setUserEmail(user?.email);
          setUserPhone(user?.phone);
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default User;
