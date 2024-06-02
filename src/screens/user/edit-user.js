import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  Text,
  VStack,
  useToast,
} from "react-native-ficus-ui";

const EditUserModal = ({ isOpen, onClose, user, onChangeUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalUserEmail, setModalUserEmail] = useState(user?.email);
  const [modalUserPhone, setModalUserPhone] = useState(user?.phone);

  const { show } = useToast();

  return (
    <Modal h="60%" isOpen={isOpen} onBackdropPress={onClose}>
      <Box flex={1} p="xl" justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Edit user
        </Text>

        <VStack mt="xl" spacing="xl" flex={1}>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              ✉️ Email
            </Text>
            <Input
              placeholder="Email"
              p={10}
              focusBorderColor="green.500"
              value={modalUserEmail}
              onChangeText={setModalUserEmail}
              mt="md"
              onChange={(e) => console.log({ e })}
            />
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              ☎️ Phone number
            </Text>
            <Input
              placeholder="Phone number"
              p={10}
              focusBorderColor="green.500"
              value={modalUserPhone}
              onChangeText={setModalUserPhone}
              mt="md"
            />
          </Box>
        </VStack>

        <Button
          full
          isLoading={isEditing}
          colorScheme="green"
          onPress={() => {
            setIsEditing(true);
            // eslint-disable-next-line no-undef
            setTimeout(() => {
              onChangeUser({
                email: modalUserEmail,
                phone: modalUserPhone,
              });
              show({
                type: "success",
                text1: "User edited",
                text2: "User successfully edited",
              });
              onClose();
              setIsEditing(false);
            }, 2000);
          }}
        >
          Edit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
