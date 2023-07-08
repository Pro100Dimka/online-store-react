export const getTableDefault = (additionalOptions) => {
  return {
    title: '',
    options: {
      search: true,
      addRowPosition: 'first',
      searchFieldAlignment: 'right',
      emptyRowsWhenPaging: false,
      actionsColumnIndex: -1,
      selection: false,
      sorting: false,
      headerStyle: {
        borderRadius: 0,
        color: 'white',
        background: 'black',
        fontWeight: '600',
      },
      rowStyle: {
        lineHeight: '1.5',
        fontSize: '0.865rem',
        fontWeight: '400',
      },
      ...additionalOptions,
    },
    localization: {
      body: {
        emptyDataSourceMessage: 'Немає данних',
        editRow: {
          deleteText: 'Хочете видилити?',
          saveTooltip: 'Підтвердити',
          cancelTooltip: 'Відміна',
        },
        addTooltip: 'Додати',
        deleteTooltip: 'Прибрати',
        editTooltip: 'Змінити',
      },
      toolbar: {
        searchPlaceholder: 'Пошук',
        searchTooltip: 'Пошук',
      },
      pagination: {
        labelRowsPerPage: '',
        labelRowsSelect: ' на сторінці',
        labelDisplayedRows: `{from}-{to} з {count}`,
        firstAriaLabel: 'Перша сторінка',
        firstTooltip: 'Перша сторінка',
        previousAriaLabel: 'Попередня сторінка',
        previousTooltip: 'Попередня сторінка',
        nextAriaLabel: 'Наступна сторінка',
        nextTooltip: 'Наступна сторінка',
        lastAriaLabel: 'Остання сторінка',
        lastTooltip: 'Остання сторінка',
      },
      header: {
        actions: 'Дії',
      },
    },
  };
};
