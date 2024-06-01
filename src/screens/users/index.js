import {
  Box,
  Image,
  List,
  Text,
  TouchableOpacity,
} from "react-native-ficus-ui";
import { useUsers } from "../../hooks/users";
import { router } from "expo-router";

const UsersListing = () => {
  const { users, isLoading, refresh } = useUsers();

  const handleOpenUserDetails = () => {
    router.push("/user");
  };

  return (
    <Box h="100%" p="xl">
      <List
        ListHeaderComponent={
          <Text fontSize="6xl" fontWeight="bold" mb="xl">
            Users
          </Text>
        }
        ItemSeparatorComponent={<Box h={10} />}
        refreshing={isLoading}
        onRefresh={refresh}
        data={users}
        keyExtractor={(item) => item?.email}
        renderItem={({ item: user }) => (
          <TouchableOpacity onPress={handleOpenUserDetails}>
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
  );
};

export default UsersListing;
