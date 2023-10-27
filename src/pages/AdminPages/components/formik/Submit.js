const submit = async (values, apiService, enqueueSnackbar, closeModal, tableRef) => {
  if (values.id) {
    let data;
    if (values.img) {
      data = new FormData();
      data.append('name', values.name);
      data.append('typeId', values.typeId);
      data.append('brandId', values.brandId);
      data.append('price', values.price);
      data.append('img', values.img[0]);
    } else {
      data = values;
    }
    console.log(values.img);
    apiService
      .updateItemById(values.id, data)
      .then(() => {
        enqueueSnackbar('Елемент успішно створено', { variant: 'success' });
        closeModal(false);
        tableRef.current.onQueryChange();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
  } else {
    let data;
    if (values.img) {
      data = new FormData();
      data.append('name', values.name);
      data.append('typeId', values.typeId);
      data.append('brandId', values.brandId);
      data.append('price', values.price);
      data.append('img', values.img[0]);
    } else {
      data = values;
    }
    apiService
      .createItem(data)
      .then(() => {
        enqueueSnackbar('Елемент успішно створено', { variant: 'success' });
        closeModal(false);
        tableRef.current.onQueryChange();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
  }
};
export default submit;
