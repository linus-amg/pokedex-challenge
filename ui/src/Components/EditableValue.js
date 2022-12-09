import { Checkbox, Input } from '@chakra-ui/react';

export default function EditableValue({
  type,
  defaultValue,
  editMode,
  handleChange,
}) {
  if (type === 'checkbox') {
    return (
      <Checkbox
        defaultChecked={defaultValue}
        variant={editMode ? 'outline' : 'ghost'}
        onChange={handleChange}
        readOnly={!editMode}
      />
    );
  }
  return (
    <Input
      width="auto"
      size="sm"
      defaultValue={defaultValue}
      pl={editMode ? 2 : 0}
      variant={editMode ? 'outline' : 'ghost'}
      onChange={handleChange}
      readOnly={!editMode}
    />
  );
}
