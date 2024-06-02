import { Text } from "react-native-ficus-ui";

export const SectionTitle = ({ children, ...props }) => (
  <Text fontSize="lg" fontWeight="bold" {...props}>
    {children}
  </Text>
);
