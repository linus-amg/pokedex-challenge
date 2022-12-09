import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import useAPI from '../../hooks/use-api';
import http from '../../transports/http';
import { CancelOrSaveButtons, EditButton } from './Buttons';
import editableCharacteristics from './editableCharacteristics';
import EditableValue from '../EditableValue';
import { SPRITE_URL } from '../../utils';

const SUCCESS_MESSAGE_DURATION = 3000;

function PokemonDetail() {
  const [editMode, setEditMode] = useState(false);
  const [pokemonPatchData, setPokemonPatchData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { pokemonId } = useParams();
  const {
    data: pokemon,
    isLoading,
    mutate,
  } = useAPI(`/api/pokemons/${pokemonId}`);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const hideSuccessMessageSoon = () => {
    setInterval(() => {
      setShowSuccessMessage(false);
    }, SUCCESS_MESSAGE_DURATION);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setPokemonPatchData({});
  };

  const handleSave = async () => {
    // only send patch via HTTP if there are changes to send
    if (Object.keys(pokemonPatchData).length > 0) {
      await http.patch(`/api/pokemons/${pokemonId}`, pokemonPatchData);
      setShowSuccessMessage(true);
      hideSuccessMessageSoon();
      mutate();
    }

    setPokemonPatchData({});

    toggleEditMode();
  };

  const handleChange = key => event => {
    setPokemonPatchData({
      ...pokemonPatchData,
      [key]: event.target.value || event.target.checked,
    });
  };

  return (
    <VStack>
      <Link to="/">&laquo; Back to Pokémon List</Link>
      <Card bg="white">
        <CardHeader height={18}>
          {editMode ? (
            <Input
              defaultValue={pokemon.name}
              onChange={handleChange('name')}
            />
          ) : (
            pokemon.name
          )}
        </CardHeader>
        <CardBody>
          <Flex justify="center">
            <Image
              height="100%"
              src={`${SPRITE_URL}${pokemon.original_id}.png`}
            />
          </Flex>
          <Table bg="white" size="sm">
            <Tbody>
              {editableCharacteristics.map(characteristic => (
                <Tr key={characteristic.name}>
                  <Td>{characteristic.name}</Td>
                  <Td>
                    <EditableValue
                      type={characteristic.type}
                      defaultValue={pokemon[characteristic.key]}
                      editMode={editMode}
                      handleChange={handleChange(characteristic.key)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
        <CardFooter justify="end">
          {editMode ? (
            <CancelOrSaveButtons
              handleSave={handleSave}
              toggleEditMode={toggleEditMode}
            />
          ) : (
            <EditButton toggleEditMode={toggleEditMode} />
          )}
        </CardFooter>
      </Card>

      {showSuccessMessage && (
        <Flex>
          <Alert status="success">
            <AlertIcon />
            The Pokémon has been updated!
          </Alert>
        </Flex>
      )}
    </VStack>
  );
}

export default PokemonDetail;
