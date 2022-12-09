import { Button } from '@chakra-ui/react';

export function EditButton({ toggleEditMode }) {
  return (
    <Button variant="outline" onClick={toggleEditMode}>
      Edit this Pokémon
    </Button>
  );
}

export function CancelOrSaveButtons({ toggleEditMode, handleSave }) {
  return (
    <>
      <Button variant="ghost" onClick={toggleEditMode}>
        Cancel
      </Button>
      <Button ml={2} variant="outline" onClick={handleSave}>
        Save Changes
      </Button>
    </>
  );
}
