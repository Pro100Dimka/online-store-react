import { useSnackbar } from 'notistack';

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();
  return (
    <button
      type="button"
      onClick={() => closeSnackbar(snackbarKey)}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        color: 'pink',
        fontSize: '18px',
        paddingRight: '8px',
        cursor: 'pointer'
      }}
    >
      X
    </button>
  );
}

export default SnackbarCloseButton;
