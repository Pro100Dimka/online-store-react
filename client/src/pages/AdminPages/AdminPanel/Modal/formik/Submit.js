const submit = async (
  values,
  apiService,
  enqueueSnackbar,
  closeModal,
  tableRef
) => {
  if (values.id) {
    apiService
      .updateItemById(values.id, values)
      .then(() => {
        enqueueSnackbar('Елемент успішно створено', { variant: 'success' });
        closeModal(false);
        tableRef.current.onQueryChange();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
  } else {
    apiService
      .createItem(values)
      .then(() => {
        enqueueSnackbar('Елемент успішно створено', { variant: 'success' });
        closeModal(false);
        tableRef.current.onQueryChange();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
  }
};
export default submit;
