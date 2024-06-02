import {
  Box,
  Image,
  List,
  Text,
  TouchableOpacity,
  useMediaQuery,
} from "react-native-ficus-ui";
import { useUsers } from "../../hooks/users";
import { useRouter } from "expo-router";
import User from "../user";
import { useState } from "react";

const UsersListing = () => {
  const { users, isLoading, refresh } = useUsers();
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  const [isSmallScreen] = useMediaQuery({
    minWidth: 0,
    maxWidth: 480,
  });

  const handleOpenUserDetails = (user) => () => {
    if (isSmallScreen) {
      router.push({
        pathname: "/user",
        params: { user: JSON.stringify(user) },
      });
    } else {
      setCurrentUser(JSON.stringify(user));
    }
  };

  return (
    <Box h="100%" p="xl" flexDirection="row" justify="space-between">
      <Box flex={isSmallScreen ? 1 : 0.5}>
        <Text fontSize="6xl" fontWeight="bold" mb="xl">
          Users
        </Text>

        <List
          ItemSeparatorComponent={() => <Box h={10} />}
          refreshing={isLoading}
          onRefresh={refresh}
          data={users}
          keyExtractor={(item) => item?.email}
          renderItem={({ item: user }) => (
            <TouchableOpacity onPress={handleOpenUserDetails(user)}>
              <Box
                flexDirection="row"
                alignItems="center"
                bg="gray.100"
                p="sm"
                borderRadius={30}
              >
                <Image
                  source={{ uri: user?.picture?.medium }}
                  w={50}
                  h={50}
                  borderRadius={100}
                />
                <Box ml="lg">
                  <Text
                    fontSize="lg"
                    fontWeight="700"
                  >{`${user.name?.first} ${user.name?.last}`}</Text>
                  <Text>{user.email}</Text>
                </Box>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>

      {!isSmallScreen &&
        (currentUser ? (
          <Box flex={0.5}>
            <User userStringObj={currentUser} />
          </Box>
        ) : (
          <Box flex={0.5} />
        ))}
    </Box>
  );
};

export default UsersListing;
