import { Alert, AlertIcon, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Image, Input, Table, Tbody, Td, Tr, VStack } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom'
import useAPI from '../hooks/use-api';
import { useState } from 'react';
import http from '../transports/http';

const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const SUCCESS_MESSAGE_DURATION = 3000;

function EditableValue({ type, defaultValue, editMode, handleChange }) {
  if (type === 'checkbox') {
    return <Checkbox defaultChecked={defaultValue} variant={editMode ? 'outline' : 'ghost'} onChange={handleChange} readOnly={!editMode} />
  } else {
    return <Input width="auto" size="sm" defaultValue={defaultValue} pl={editMode ? 2 : 0} variant={editMode ? 'outline' : 'ghost'} onChange={handleChange} readOnly={!editMode} />
  }
}

const editableCharacteristics = [
  {
    name: 'Pokedex Number',
    type: 'text',
    key: 'original_id'
  }, {
    name: 'Type 1',
    type: 'text',
    key: 'type1',
  }, {
    name: "Type 2",
    type: 'text',
    key: 'type2',
  }, {
    name: 'Legendary',
    type: 'checkbox',
    key: 'legendary'
  }, {
    name: 'HP',
    type: 'text',
    key: 'healthpoints'
  }, {
    name: 'Attack',
    type: 'text',
    key: 'attack'
  }, {
    name: 'Special Attack',
    type: 'text',
    key: 'special_attack'
  },
  {
    name: 'Defense',
    type: 'text',
    key: 'defense'
  },
  {
    name: 'Special Defense',
    type: 'text',
    key: 'special_defense'
  },
  {
    name: 'Speed',
    type: 'text',
    key: 'speed'
  },
  {
    name: 'Total',
    type: 'text',
    key: 'total'
  },
  {
    name: 'Generation',
    type: 'text',
    key: 'generation'
  }
];

function PokemonDetail() {
  const [editMode, setEditMode] = useState(false);
  const [pokemonPatchData, setPokemonPatchData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { pokemonId } = useParams();
  const { data: pokemon, isLoading, mutate } = useAPI(`/api/pokemons/${pokemonId}`);

  if (isLoading) {
    return <div>Loading</div>
  }

  const hideSuccessMessageSoon = () => {
    setInterval(() => {
      setShowSuccessMessage(false)
    }, SUCCESS_MESSAGE_DURATION);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setPokemonPatchData({});
  }

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
  }

  const handleChange = (key) => (event) => {
    setPokemonPatchData({
      ...pokemonPatchData,
      [key]: event.target.value || event.target.checked
    });
  }

  function EditButton() {
    return <Button variant="outline" onClick={toggleEditMode}>Edit this Pokémon</Button>
  }

  function CancelOrSaveButtons() {
    return <>
      <Button variant="ghost" onClick={toggleEditMode}>Cancel</Button>
      <Button ml={2} variant="outline" onClick={handleSave}>Save Changes</Button>
    </>
  }

  return (
    <VStack>
      <Link to="/">&laquo; Back to Pokémon List</Link>
      <Card bg="white">
        <CardHeader height={18}>{editMode ? <Input defaultValue={pokemon.name} onChange={handleChange('name')} /> : pokemon.name}</CardHeader>
        <CardBody>
          <Flex justify="center" >
            <Image height="100%" src={`${SPRITE_URL}${pokemon.original_id}.png`} />
          </Flex>
          <Table bg="white" size="sm">
            <Tbody>
              {editableCharacteristics.map((characteristic) => (
                <Tr>
                  <Td>{characteristic.name}</Td><Td><EditableValue type={characteristic.type} defaultValue={pokemon[characteristic.key]} editMode={editMode} handleChange={handleChange(characteristic.key)} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
        <CardFooter justify="end">
          {editMode ? <CancelOrSaveButtons /> : <EditButton />}
        </CardFooter>
      </Card>
              
      {showSuccessMessage && <Flex><Alert status='success'>
        <AlertIcon />
        The Pokémon has been updated!
      </Alert></Flex>}
    </VStack>
  );
}

export default PokemonDetail;