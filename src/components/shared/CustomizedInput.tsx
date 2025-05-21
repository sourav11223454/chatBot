import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const BlackBlueInput = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#90caf9',
    '&.Mui-focused': {
      color: '#42a5f5',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1e88e5',
    },
    '&:hover fieldset': {
      borderColor: '#42a5f5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: '#e0e0e0',
    backgroundColor: '#121212',
    borderRadius: '4px',
  },
});

const CustomizedInput = (props: TextFieldProps) => {
  return (
    <BlackBlueInput
      variant="outlined"
      margin="normal"
      fullWidth
      {...props}
    />
  );
};

export default CustomizedInput;