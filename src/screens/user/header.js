import { Box, Image, Text } from "react-native-ficus-ui";

export const Header = ({ user, children, ...props }) => (
  <Box flexDirection="row" alignItems="center" {...props}>
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

    {children}
  </Box>
);
